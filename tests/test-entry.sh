#!/bin/sh
set -xe

TEST="testcafe --sf -e -u --disable-http2 --assertion-timeout 15000 chromium:headless --no-sandbox --disable-dev-shm-usage"
TEST_ARGS=${TEST_ARGS:-all}

echo "Starting Test Suite: ${TEST_ARGS}"

if [ ${TEST_ARGS} == "all" ]
then
  ${TEST} 'tests/**/*.browser.ts'
else
  ${TEST} 'tests/**/*.browser.ts' -f ${TEST_ARGS}
fi

