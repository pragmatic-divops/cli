Feature: ESLint Config

  @wip
  Scenario: High-level Scaffold
    Given the project should be versioned in git
    And the GitHub token is valid
    And the project language should be JavaScript
    And nvm is properly configured
    When the high-level eslint-config scaffolder is executed
    Then the core JavaScript files are present
    And core ignores are defined
    And the base git files should be present
    And the proper form8ion config is extended
