# Copilot Instructions for ventury-lite

This document provides guidelines for AI assistance when working with this codebase.

## Project Overview

This is a React TypeScript application built with:
- Parcel as the bundler
- Material-UI (MUI) for UI components
- React Router for navigation
- Emotion for styling

## Code Structure

- `src/` - Main source code directory
  - `components/` - Reusable UI components
  - `pages/` - Page components and routing configuration
  - `App.tsx` - Root application component

## Coding Standards

1. **TypeScript**
   - Use TypeScript for all new files
   - Maintain strict type safety
   - Avoid using `any` type

2. **React Components**
   - Use functional components with hooks
   - Props interfaces should be defined for all components
   - Use proper type annotations for state and props

3. **Routing**
   - New routes should be added to `src/pages/routes.tsx`
   - Route paths should be defined in `src/pages/constants.ts`
   - Follow the existing pattern for page components

4. **Material-UI (MUI)**
   - Use MUI components for consistent UI
   - Follow MUI's `sx` prop pattern for styling
   - Maintain the existing theme structure

5. **File Organization**
   - New components go in `src/components`
   - New pages go in `src/pages`
   - Maintain index files for clean exports

## Common Tasks

### Adding a New Page
1. Create a new directory under `src/pages`
2. Add the page path to `src/pages/constants.ts`
3. Add the route configuration to `src/pages/routes.tsx`
4. Create the page component following existing patterns

### Adding a New Component
1. Create a new directory under `src/components`
2. Export the component through `src/components/index.ts`
3. Follow existing component patterns with proper TypeScript types

### Styling Guidelines
1. Use MUI's `sx` prop for component styling
2. Follow the flexbox layout patterns established in the app
3. Maintain consistent spacing using MUI's spacing units

## Dependencies

When suggesting new dependencies:
1. Ensure compatibility with React 19
2. Prefer official MUI components when available
3. Consider bundle size impact

## Best Practices

1. **State Management**
   - Use React hooks for local state
   - Follow existing patterns for state management

2. **Performance**
   - Implement proper memoization where needed
   - Follow React best practices for rendering optimization

3. **Code Organization**
   - Keep components focused and single-responsibility
   - Maintain consistent file naming conventions
   - Follow established project structure

4. **Type Safety**
   - Create proper interfaces for all data structures
   - Use strict TypeScript configurations
   - Avoid type assertions unless absolutely necessary
