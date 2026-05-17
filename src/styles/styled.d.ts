// src/styles/styled.d.ts
// Extends styled-components' DefaultTheme with our AppTheme.
// This file is a TypeScript declaration — it ships no runtime code.
// Once this exists, every SC wrapper gets full autocomplete on `theme`.

import type { AppTheme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}