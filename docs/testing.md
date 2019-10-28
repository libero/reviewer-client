# Unit Testing

Unit tests make use of the `jest` testing framework and can be identified by the `.test.tsx` or `.test.ts` file extension. `jest` is configured through the `jest.config.js` file to locate any test appended files under the `/src` directory.

We make use of `@testing-library/react` to render react components to a virtual dom environment as well as performing interactions with them. We also extend jests `expect` assertion object with `@testing-library/jest-dom` to give some dom specific assertions (ie: `toBeInTheDocument`).


## Configuration

`jest` is configured through the `jest.config.js` which makes use of a number of scripts found under `/test-utils`.

## Util functions

`/test-utils` holds a number of wrapper and helper functions speficially for testing purposes. Some of these are generic helper functions like `flushPromises` and others are wrappers to provide a component context for testing like `apolloWrapper`. 