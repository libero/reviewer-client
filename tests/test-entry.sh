#!/bin/sh
set -xe

TEST="testcafe --sf -e -u --disable-http2 chromium:headless --no-sandbox --disable-dev-shm-usage"
TEST_ARGS=${TEST_ARGS:-all}

echo "Starting Test Suite: ${TEST_ARGS}"

if [ ${TEST_ARGS} == "all" ]
then
  find ./tests -name *.browser.ts -type f | sort | xargs -I % sh -c "${TEST} % -q || exit 255"
else
  ${TEST} 'tests/**/*.browser.ts' -f ${TEST_ARGS} -q
fi

