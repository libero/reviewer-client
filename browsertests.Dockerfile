FROM testcafe/testcafe

USER root

ENV NODE_PATH=/opt:/usr/lib/node_modules:/opt/testcafe/node_modules

RUN cd /opt/testcafe && npm install \
  tsyringe@3.2.0 testcafe-reporter-html@1.4.4

USER user

WORKDIR /app

COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
