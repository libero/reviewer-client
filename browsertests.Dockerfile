FROM testcafe/testcafe:1.16.1

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
