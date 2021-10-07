FROM testcafe/testcafe:1.15.2

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
