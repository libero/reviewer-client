FROM testcafe/testcafe

WORKDIR /app
RUN mkdir /home/user/screenshots
RUN chown -R user:user /home/user/screenshots

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "testcafe", "chromium:headless  --no-sandbox --disable-dev-shm-usage", "tests/**/*.browser.ts" ]