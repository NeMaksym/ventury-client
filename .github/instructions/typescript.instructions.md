---
applyTo: 'src/**/*.{ts,tsx}'
---

# TypeScript Usage Guidelines

## Typing

-   Always use TypeScript and provide explicit type definitions for all new code, props, and state.
-   Never use `any` as a type unless absolutely unavoidable and explicitly justified.
-   Generate TypeScript types, interfaces, and enums as needed, placing them in the `src/types/` directory or co-located if highly specific and not broadly reusable.

## Naming Conventions

-   Follow `PascalCase` for types, interfaces, and React components.
-   Use `camelCase` for variables, functions, and non-component `.ts` filenames.
-   React component files (`.tsx`) should use `PascalCase`.
