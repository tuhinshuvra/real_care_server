// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
    files: ['**/*.{js,ts}'],
    extends: [
        eslint.configs.recommended,
        tseslint.configs.recommended
    ],
});