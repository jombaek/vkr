import React from 'react';
import { AuthUserProvider } from './AuthUserProvider';
import Routes from './Routers';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}