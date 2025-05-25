import {AfterAll, BeforeAll, Given} from '@cucumber/cucumber';
import any from '@travi/any';
import deepEqual from 'deep-equal';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {StatusCodes} from 'http-status-codes';

export const githubToken = any.word();

const server = setupServer();

server.events.on('request:start', ({request}) => {
  // eslint-disable-next-line no-console
  console.log('Outgoing:', request.method, request.url);
});

function authorizationHeaderIncludesToken(request) {
  return request.headers.get('authorization') === `token ${githubToken}`;
}

BeforeAll(async () => {
  server.listen();
});

AfterAll(() => {
  server.close();
});

Given(/^the GitHub token is valid$/, async function () {
  this.repoSshUrl = any.url();
  this.nextStepsFiledOnGithub = [];

  server.use(
    http.get(`https://api.github.com/repos/pragmatic-divops/${this.projectName}`, ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        return new HttpResponse(null, {status: StatusCodes.NOT_FOUND});
      }

      return new HttpResponse(null, {status: StatusCodes.UNAUTHORIZED});
    }),
    http.post('https://api.github.com/orgs/pragmatic-divops/repos', async ({request}) => {
      if (
        authorizationHeaderIncludesToken(request)
        && deepEqual(await request.json(), {name: this.projectName, private: 'Private' === this.visibility})
      ) {
        return HttpResponse.json({
          ssh_url: this.repoSshUrl,
          html_url: any.url()
        });
      }

      return new HttpResponse(null, {status: StatusCodes.UNAUTHORIZED});
    }),
    http.get('https://api.github.com/search/issues', ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        return HttpResponse.json({items: []});
      }

      return undefined;
    }),
    http.post(`https://api.github.com/repos/pragmatic-divops/${this.projectName}/issues`, async ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        this.nextStepsFiledOnGithub.push(await request.json());

        return HttpResponse.json({
          ssh_url: any.url(),
          html_url: any.url()
        });
      }

      return new HttpResponse(null, {status: StatusCodes.UNAUTHORIZED});
    }),
    http.get('https://api.github.com/user', ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        return HttpResponse.json({login: this.githubUser});
      }

      return new HttpResponse(null, {status: StatusCodes.UNAUTHORIZED});
    }),
    http.get('https://api.github.com/user/orgs', ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        return HttpResponse.json([{login: 'pragmatic-divops'}]);
      }

      return new HttpResponse(null, {status: StatusCodes.UNAUTHORIZED});
    }),
    http.get('https://api.github.com/orgs/pragmatic-divops/teams', ({request}) => {
      if (authorizationHeaderIncludesToken(request)) {
        return HttpResponse.json([{name: 'maintainers', slug: 'maintainers', id: 3208999}]);
      }

      return undefined;
    })
  );
});
