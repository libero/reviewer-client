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

3. Run tests:  
   - `make lint`: lint code
   - `make test`: unittests
   - `make test_browser`: locally executed browsertests, use with `start_test` or `start_dev`
   - `make test_browser_containerized`: use with `build_prod ; start_ci`

3. `make stop` to teardown

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
