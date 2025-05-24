# GitHub Copilot Instructions for Ventury Lite

## Project Overview

This project, Ventury Lite, is a web-based tool for uploading, parsing, and analyzing bank transaction data from different banks. It provides a simple UI for users to select their bank, upload transaction data, and view or process the results.

## High-Level Architecture

-   Type: React + TypeScript Single Page Application (SPA).
-   UI: Built with Material UI (MUI).
-   Routing: Handled by React Router.
-   Structure: Modular component structure, promoting reusability and separation of concerns.

## Frameworks, Libraries & Tooling

-   UI Styling: `@emotion/react` and `@emotion/styled`.
-   Routing: `react-router-dom`.
-   Fonts: `@fontsource/roboto` (for MUI).
-   Bundler: Parcel.
-   Package Manager: npm.
-   Type Checking: TypeScript (via `tsconfig.json`).
-   Code Formatter: Prettier (configured via `.prettierrc`).

## Key Project Structure

-   `src/`: Contains all source code.
    -   `components/`: Contains reusable UI components.
        -   `index.ts`: Barrel file for exporting components.
        -   Specific component directories/files (e.g., `AppBar.tsx`, `UploadStepper/`).
    -   `pages/`: Contains page-level components, mapped to application routes.
        -   `routes.tsx`: Defines application routing configuration.
        -   Specific page files (e.g., `UploadPage.tsx`).
    -   `types/`: Contains TypeScript type definitions and interfaces.
        -   `index.ts`: Barrel file for exporting types.
        -   Specific type files (e.g., `transaction.ts`).

## Always & Never Rules

### Always

-   Keep components and functions focused on a single responsibility.
-   Write code comments only for complex logic that isn't self-explanatory.

### Never

-   Never introduce new runtime dependencies without prior discussion and approval.
-   Never generate code or place files inside `dist/` or `build/` (or similar build output) directories.
-   Avoid overly complex logic; strive for clarity and simplicity.
-   Do not disable or bypass linting or type-checking rules.
-   Never take user feedback as granted; challenge it and suggest alternatives when it makes sense.
