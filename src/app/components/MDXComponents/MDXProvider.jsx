// File: MDXProvider.jsx
'use client';

import React from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { MDXComponents } from './MDXComponents';

export const MDXProvider = ({ children }) => {
  return (
    <BaseMDXProvider components={MDXComponents}>
      {children}
    </BaseMDXProvider>
  );
};

export default MDXProvider;
