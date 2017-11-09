## Getting Started

Mirador uses [node.js](http://nodejs.org/) and a build system to assemble, test, and manage the development resources. If you have never used these tools before, you may need to install them.

 1. Install Node, if you haven't already (available at the link above)  
 1. Clone the mirador repository (if you haven't already done so above); `git clone https://github.com/ProjectMirador/mirador.git`
 1. On the command line, go into the mirador folder
 1. Install all dependencies with `npm install`. Run `npm start`

`npm start` will run a local server that is available at `localhost:8000`.

## How to Contribute
### Making Changes
Contributions are always welcome, however, it will always be helpful to begin any large change by submitting an issue, or reviewing an existing issue. This will give the developer community a chance to point you in the right direction, let you know of any connected issues that may not be obvious, and provide feedback about how the feature might fit into the current roadmap. Contributions that involve major changes to the UI will need to have a design audit completed before they can be fully integrated. See the Design section below for information about the design review process.

To make a contribution, update the master and develop branches. The master branch is the current stable version, though each release also has a tag. The develop branch is the current working branch into which pull requests will be merged for upcoming releases.  After creating a new branch off of develop, make a discrete change representing a bite-sized chunk of work, and write an informative commit message. We do not enforce any rebasing strategy, but we may ask you to rebase if you have many small and intermediate commits with unhelpful messages. "One commit per PR" is a worthy goal.
### Making Small Changes
Even small changes should follow the branching strategy outlined above, though they may not need a long discussion. It may still be helpful to create an issue for them, though it is not strictly necessary.
### Updating Documentation
Mirador currently uses [gitbook](https://github.com/GitbookIO/gitbook) for its documentation. You can find the current documentation in the `docs` folder on any branch. The docs will be re-generated for the website when submitted, and kept up to date with the current master.
Documentation updates are always welcome, and should be included with any fundamentally new changes. For general documentation submission, checkout the master branch and branch from it into a documentation branch. Add to the gitbook files stored in the `docs` directory.
### Updating and Running the Project
Install all dependencies with `npm install`. Run `npm start`. This ensures that any new changes from the remote are picked up in your development build.

Create a branch for your work:
e.g.: `git checkout -b my-feature-branch` or `git checkout -b my-bug-fix`

### Usual Development
Once you have built the necessary files and created a branch for your feature or bug fix work, you are ready to code.

Live interactive reloading of the browser each time a file is saved is enabled and used in the `npm start` command. Note that this will require middleware or a [livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).
### Submitting Your Contribution
### Publishing a New Release

#### 1. Ensure all Tests Pass
All development occurs on the pinned development branch. Ensure that all tests with merged features are passing in travis before moving on to the release process. The release consists of merging the main development branch with master, therefore all changes must be fully integrated and functioning in the development branch. Do not create any new release branches until the current release has been merged into master.

#### 2. Change version number in package.json
If the version number included in the `package.json` does not already accurately reflect the version to be released, be sure to increment the number according to [SemVer](http://semver.org/) conventions. Bump the third number for a small patch that does not change or add any new functionality; bump the second number if the branch includes any new features that do not interfere with or change existing features; and bump the first ("major") version number if the changes to be released break or change the API for existing functionality.  

#### 3. Merge Develop into Master
For example, ensure that all feature branches (such as "fix_annotation_bug#1234") have been merged into the develop branch as Github Pull Requests, and then merge the develop branch (which will be the default branch) into master through the Github interface (through a PR).

#### 4. Create a New Local Tag
After all new changes have been merged into master, checkout master locally, and create a git tag for the new version:
 `git checkout master`
 `git tag v[VERSION_NUMBER]`
 This will give the current state of the project a name and freeze it in time.

#### 5. Push Tag to Github
Now push the tagged version to github (from master):
 `git push --tags`

 This will cause the new version to appear under the "releases" section of the github project page, and will allow npm to access it in  the next step.
#### 6. Create Build and Add it to the New Release
#### 7. Update the gh-pages Demo Instance to Show Off the Latest Features
#### 8. Update Release Notes
Using the github commit log, compile a bulleted list of the features and changes added to the new release.

#### 9. Publish to NPM
Assuming the commiter has access to the project's package management account on npm, publishing the most recent version requires logging into npm on the command line.
Then simply type `npm publish` to post the new package version to the registry.
To configure your npm user locally, refer to the npm-adduser [documentation](https://docs.npmjs.com/cli/adduser).

#### 10. Announce New Release on the Mailing Lists and Slack

### Design Review
Design review can happen in one of two ways, though both ways start with an issue or issues describing the interaction requirements. Once an issue has been created for a new UI-heavy feature, whether or not a prototype is complete, the feature goes up for design review. This is generally a three-step process:
1. An announcement about the proposed feature is put out to the Mirador-tech mailing list or on one of the bi-weekly calls with a link to the issue that documents the proposed UI feature, with links to any prototype examples or design references.
2. The community discusses the design and requirements, and produces a set of annotated mock-ups of the interaction, which the community reviews on the mailing list or on calls.
3. If the community finds major problems with the design, the feedback is incorporated into a new set of mock-ups until a relative consensus about the feature's mock-ups is complete.

From here, any existing work must be adjusted to reflect the mock-ups produced by the community before it will be accepted as a pull request. This is why it is so important to document a major UI change in issues before putting in too much work. Often, major feature work will have been the result of local changes to Mirador for an independent project. In this case, often a Pull Request will be encouraged simply so that the code is easily referenced in a later redesign of a completed locally-implemented feature.
## Background Information (Tooling)
### Javascript and Node
Mirador uses the node.js runtime for its development environment, and to bundle resources. As the project is designed to run in a browser, it is written primarily in Javascript, with some CSS. The application is currently written in ES5, however we have been discussing practical ways to move to ES6.
#### The NPM package manager
Dependencies are managed primarily with the NPM package manager, and releases are primarily distributed over npm. It is recommended that any new dependencies being added are tracked with a specific version in the `package.json` and installed with npm. The final build dependency is then copied into the `js/lib` directory for inclusion into Mirador. Only this copied final version of the dependency should be versioned (added to git).
#### Javascript Resources
### Project Management with Grunt
[Grunt](http://gruntjs.com/) is a utility for managing repetitive tasks involved in the development process, such as building, linting, format-checking, and compressing files, running tests and generating coverage reports, and reloading the browser on file changes (for interactive feedback during feature development). A variety of tasks have been automated for developer convenience.
#### Building and Compressing
#### Source Maps
#### Livereload
#### Tasks
### Testing and Coverage
### Version Control
### JavaScript Style
Contributors use a variety of text editors according to circumstance and preference. This can introduce inconsistencies in the source text files, such as spaces being replaced with tabs, indentation spans being shortened, and whitespace being added or subtracted from the end of lines. Using your editor's [EditorConfig](http://editorconfig.org/) plugin resolves these inconsistencies while allowing each developer to use her own preferences while developing.

DEPRECATED [NON-FUNCTIONAL]. [JSHint](http://jshint.com) will notify you of inconsistencies in the style of the code. Mirador uses the AirBnB [styleguide](https://github.com/airbnb/javascript/tree/es5-deprecated/es5) for ES5.

[eslint](http://eslint.org/). Mirador uses the AirBnb Javascript styleguide for ES5 as codified by AirBnb in [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base#eslint-config-airbnb-baselegacy). Make sure any changes you make conform to this style. You can check this by running the `npm run lint`. Error checking for this is not turned on in the continuous integration build at the moment, but will be in the future.
