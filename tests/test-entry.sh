#!/bin/sh
set -xe

TEST="testcafe --sf --assertion-timeout 15000 --skip-js-errors chromium:headless --no-sandbox --disable-dev-shm-usage"
TEST_ARGS=${TEST_ARGS:-all}

echo "Starting Test Suite: ${TEST_ARGS}"

if [ ${TEST_ARGS} == "all" ]
then
  ${TEST} 'tests/**/*.browser.ts'
else
  ${TEST} tests ${TEST_ARGS}
fi

