FROM testcafe/testcafe

WORKDIR /app

COPY tests tests

ENTRYPOINT [ "testcafe", "chromium:headless", "tests/**/*.browser.ts" ]