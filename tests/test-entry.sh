#!/bin/sh
set -xe

TEST="testcafe --sf chromium:headless  --no-sandbox --disable-dev-shm-usage "
TEST_FIXTURE=${TEST_FIXTURE:-all}

echo "Starting Test Suite: ${TEST_FIXTURE}"

if [ ${TEST_FIXTURE} == "all" ]
then
  ${TEST} 'tests/**/*.browser.ts'
else
  ${TEST} tests -fixture-meta fixtureID=${TEST_FIXTURE}
fi

