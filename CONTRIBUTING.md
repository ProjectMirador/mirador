This document serves as a reference for the Mirador community and others interested in the project. It aims to outline agreed upon practices that are used in the development and maintenance of the Mirador software.

## Contributing to Mirador
Contributions to Mirador are always welcome, however, it will always be helpful to begin any large change by submitting an issue or engaging with the Mirador community. For more on this, see [plugin architecture](#plugin-architecture). Mirador 3.0 and beyond adheres to [semantic versioning](https://semver.org/) providing adopters and contributors to better rely on what changes can be expected in released versions of the software.

All contributions should be submitted as a [GitHub pull request](https://help.github.com/articles/about-pull-requests/) to the `master` branch. Pull requests must be reviewed and accepted by another Mirador maintainer and pass all continuous integration checks. Contributions should have tests for the feature or bug fix, documentation and should conform to the Mirador agreed upon coding style. Contributions should not include a “built” version of Mirador, this will help in reducing merge conflicts.

### Adding dependencies
Careful consideration should be given when adding software dependencies to Mirador. Considerations should be given to: added size of the dependency, whether or not that dependency is maintained and tested, how the dependency may interact with Mirador embedded in other environments.

As a general rule, any dependencies added should not be committed directly, but should use a package manager to require the dependency.

Dependencies should also be scoped (both for style and script) so that they do not interact with a containing application.

### Coding style
Mirador has adopted the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) as its agreed upon coding style for all contributions. This helps us ensure a consistent codebase with higher readability. 
### Testing
Mirador should be well tested at several different levels. A component or class should be tested individually (unit tests) and the interaction of that component or class with other parts should also be tested (integration tests).
### Documentation
Added or modified code should be appropriately documented using JSDoc comments and established project conventions.

### Plugin architecture
Mirador 3 shifted to a plugin architecture to better support the wide array of uses of Mirador. This allows for the design to accomodate plugins in more focused way. It also allows the community to maintain the core components while giving developers the freedom to develop new and innovative plugins. Your contribution might fit nicely as a Mirador plugin.
