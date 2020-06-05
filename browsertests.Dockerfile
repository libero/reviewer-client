FROM testcafe/testcafe

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "testcafe", "chromium:headless  --no-sandbox --disable-dev-shm-usage", "tests/**/*.browser.ts" ]