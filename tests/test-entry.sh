#!/bin/sh
set -xe

TEST="testcafe --sf --config-file testcafe.json chromium:headless --no-sandbox --disable-dev-shm-usage"
TEST_ARGS=${TEST_ARGS:-all}

echo "Starting Test Suite: ${TEST_ARGS}"

if [ ${TEST_ARGS} == "all" ]
then
  ${TEST} 'tests/**/*.browser.ts'
else
  ${TEST} tests ${TEST_ARGS}
fi

