# reviewer-client

The client for "libero reviewer".

<details>

<summary>Requirements</summary>

- [Docker]
- [GNU Make]
- [Node.js]
- [timeout] (on MacOSX this can be obtained with `brew install coreutils`)
</details>

The project contains a [Makefile] which uses [Docker] for development.

[![Browsertest Results](https://app.eu-central-1.saucelabs.com/browser-matrix/libero_reviewer.svg "Browsertest Results")](https://app.eu-central-1.saucelabs.com/open_sauce/user/libero_reviewer/builds)

[![Testing Powered By SauceLabs](https://saucelabs.github.io/images/opensauce/powered-by-saucelabs-badge-gray.png "Testing Powered By SauceLabs")](https://app.saucelabs.com/open_sauce/user/libero_reviewer/builds)

## Development

1. `make setup`
2. Run client options:  
   __Test:__ mock everything with _reviewer-mocks_  
   ```sh
   make start_test
   ```

   __Dev:__ run against local _reviewer-submission_ and _continuum-adaptor_, only mock _continuum_
   ```sh
   # start local instances of submission and adaptor
   cd ../reviewer-submission ; make setup ; make start_dev
   cd ../continuum-adaptor ; make setup ; make start

   cd ../reviewer-client
   make start_dev
   ```

   __CI:__ lint, test and browsertest akin to pipeline
   ```sh
   make run_ci
   ```

   __CI-localhost:__ same as __CI__ but exposed on localhost
   ```sh
   make build_prod
   make start_ci_localhost
   ```

3. Run tests:
   - `make lint`: lint code
   - `make test`: unittests
   - `make test_browser`: locally executed browsertests, use with `start_test`, `start_dev` or `start_ci_localhost`
   - `make test_browser_containerized`: use with `build_prod ; start_ci`
   - `make test_browser_saucelabs`: browsertests run against saucelabs, use with `start_test`, `start_dev` or `start_ci_localhost`

  To use [saucelabs](https://saucelabs.com) you need an account and have to set `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` env vars.

3. `make stop` to teardown

## Adding Browsertests

Browsertests will be run against SauceLabs for a variety of browsers but we also create a container that runs them against Chrome. Having containerized browsertests lets us run them easily in the umbrella repo or as part of a helm release.

SauceLabs kindly grants us test capacity as part of their [OpenSauce](https://saucelabs.com/solutions/open-source) program.

- disable saucelabs on a PR by adding `[skip-saucelabs]` to your PR description 
  - can't disable per commit because github [doesn't expose the commit message in its context](https://github.community/t/accessing-commit-message-in-pull-request-event/17158/2)
  - saucelabs job will always be run on commit/merge to master
- browsers to run are set in `.github/workflows/ci.yml`
- all test results are publically available
- testcafe prints link to saucelabs test result to stdout
- to allow browsertest containerization we need to inject a `BASE_URL` from an environment variable

Make sure to include something like this for all browsertests:

```js
import { DashboardPage, FilesPage, LoginPage, AuthorDetailsPage, DetailsPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Getting Started`.page`${BASE_URL}`;

test('assert nav bar', async() => {
  ...
```

## Use of `reviewer-mocks`

The compose files use `liberoadmin/reviewer-mocks:latest`.

- make sure you have the current image with:  
  ```sh
  docker pull liberoadmin/reviewer-mocks:latest
  ```
- when changing mocks locally, tag it accordingly:  
  ```sh
  cd ../reviewer-mocks
  make build
  docker tag \
    libero/reviewer-mocks:local \
    liberoadmin/reviewer-mocks:latest
  ```

[Docker]: https://www.docker.com/
[GNU Make]: https://www.gnu.org/software/make/
[Makefile]: Makefile
[Node.js]: https://nodejs.org/
[timeout]: http://man7.org/linux/man-pages/man1/timeout.1.html

