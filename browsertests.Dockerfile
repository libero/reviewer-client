FROM testcafe/testcafe:1.14.1

WORKDIR /app

USER root
RUN npm install testcafe-react-selectors testcafe
USER user


COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
