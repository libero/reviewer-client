FROM testcafe/testcafe:1.15.2

WORKDIR /app

USER root
RUN npm install testcafe-react-selectors@4.1.5 testcafe@1.15.2
USER user


COPY tests tests
COPY test-utils test-utils

ENTRYPOINT [ "./tests/test-entry.sh" ]
