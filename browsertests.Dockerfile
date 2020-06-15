FROM testcafe/testcafe

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
