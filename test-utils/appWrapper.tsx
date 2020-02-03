import React, { ReactNode } from 'react';

export default () => ({children }: {children: ReactNode}): JSX.Element => (
  <div id="app">{ children }</div>
)