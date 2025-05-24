---
applyTo: 'src/**/*.tsx'
---

# Styling Guidelines

## General Styling

-   Utilize `@emotion/react` and `@emotion/styled` for custom styling.
-   Ensure styles are modular and co-located with components where appropriate, or organized in a dedicated styling directory if a global styling system is in place.
-   Follow established naming conventions for styled components or CSS classes.

## Material UI (MUI)

-   When using Material UI, implement components and styling following established patterns in the project.
-   Leverage MUI's theme capabilities for consistent look and feel.
-   Prefer using MUI's utility props for common styling adjustments (e.g., `sx` prop) before resorting to extensive custom Emotion styles for MUI components.
