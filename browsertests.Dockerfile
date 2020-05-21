FROM testcafe/testcafe

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "testcafe", "chromium:headless", "tests/**/*.browser.ts" ]