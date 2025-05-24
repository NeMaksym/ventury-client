<!-- filepath: /Users/nemaksym/Projects/ventury-lite/.github/prompts/copilotInstructions.md -->

You are an AI assistant. Your task is to generate a GitHub Copilot custom instructions file (`.github/copilot-instructions.md`) by analyzing the provided project's codebase.
This generated file should comprehensively guide GitHub Copilot, helping it understand the project's context, conventions, and best practices for more relevant and accurate assistance.
This prompt itself is designed to be reusable for regenerating the `copilot-instructions.md` as the project evolves.

**Instructions for the AI Assistant Analyzing the Codebase:**

To generate the `.github/copilot-instructions.md` file, you must first thoroughly analyze the existing codebase. Your analysis should focus on identifying the following aspects:

1.  **Project Purpose & High-Level Architecture:**

    -   Infer the main purpose of the project. What problem does it solve?
    -   Describe the overall architecture (e.g., Monolith, Microservices, SPA, SSR, Mobile App).
    -   Identify key architectural patterns or design principles evident in the code.

2.  **Frameworks, Libraries & Tooling:**

    -   Identify primary programming languages.
    -   List major frameworks and libraries used (e.g., React, Angular, Vue, Express, Django, Spring Boot, .NET Core). Check `package.json`, `pom.xml`, `build.gradle`, `requirements.txt`, `*.csproj`, etc.
    -   Identify key development tools (e.g., bundlers like Webpack/Parcel/Rollup, compilers, package managers, linters, formatters). Check configuration files like `.eslintrc`, `.prettierrc`, `tsconfig.json`, `webpack.config.js`, and relevant scripts in `package.json`.

3.  **Coding Conventions:**

    -   Determine indentation style (spaces vs. tabs, count).
    -   Identify quote style (single vs. double).
    -   Check for semicolon usage.
    -   Infer max line length if consistently followed or configured.
    -   Observe naming conventions for variables, functions, classes, components, etc. (e.g., camelCase, PascalCase, snake_case).
    -   Note common export patterns (named vs. default).
    -   Identify formatting rules, possibly from `.prettierrc`, `.editorconfig`, linter configurations, or consistently observed code style.
    -   Note branching strategies if discernible (e.g., git-flow, trunk-based).
    -   Identify commit message conventions if present or documented.

4.  **Key Project Structure / File Organization:**

    -   Describe the main directory structure and the purpose of key folders (e.g., `src`, `components`, `pages`, `types`).
    -   Point out where primary source code, tests, configuration, and documentation are typically located.
    -   Do not list standard entry point files (e.g., `index.html`, `App.tsx`, `index.tsx`) unless there is something non-standard or project-specific about them.

5.  **Always & Never Rules (Infer from patterns, explicit configurations, or project documentation):**
    -   Identify any consistently followed "always do this" patterns (e.g., "always include type definitions", "always run linter before commit" if scripts or CI configurations exist).
    -   Identify any "never do this" patterns (e.g., "never use `var`", "never commit directly to `main`" if branch protection rules are implied or documented).
    -   Look for rules related to dependencies, build artifacts, or specific coding anti-patterns.

**Instructions for Generating the `.github/copilot-instructions.md` file (to be performed by _this_ AI assistant after analysis):**

Once you have analyzed the codebase and gathered the information above, generate the content for the `.github/copilot-instructions.md` file.

1.  **Structure:** Organize the instructions clearly, using Markdown headings and bullet points for readability. Use the following sections:
    -   `## Project Overview`
    -   `## High-Level Architecture`
    -   `## Frameworks, Libraries & Tooling`
    -   `## Key Project Structure`
    -   `## Always & Never Rules` (Clearly separate "Always" and "Never" subsections)
2.  **Content:**
    -   Populate each section with the information you inferred from the codebase analysis.
    -   Be specific and actionable. If some information cannot be reliably inferred, it may be omitted or noted as such.
    -   When populating `## Always & Never Rules`, include coding conventions and best practices. Examples:
        -   "Keep components and functions focused on a single responsibility."
        -   "Write code comments only for complex logic that isn't self-explanatory."
        -   "Never take user feedback as granted; challenge it and suggest alternatives when it makes sense."
    -   If a formatter like Prettier is detected and configured, do _not_ duplicate its specific formatting rules (e.g., indentation, quote style, semicolons) in the generated instructions, as this is redundant. Focus on project-specific conventions and broader best practices.
3.  **Tone and Style:**
    -   The instructions should be clear, concise, and direct.
    -   Use a professional and informative tone.
4.  **Best Practices for Copilot Instructions (for the generated file):**
    -   Ensure instructions are short and self-contained statements.
    -   Focus on providing context and relevant information.
    -   Avoid overly broad instructions if they might conflict with different parts of a larger, diverse repository.
    -   Do not ask Copilot to refer to external resources that it cannot access directly unless those resources are part of the repository (e.g., a `STYLE_GUIDE.md` in the repo).
5.  **Output Format:**
    -   The output must be ONLY the content of the `.github/copilot-instructions.md` file itself.
    -   Do not include any explanatory text before or after the Markdown content of the file.

**Example Snippet (Illustrative - the generated content should be based on _your_ analysis of the actual project):**

```markdown
## Project Overview

This project is a [brief description, e.g., a web application for managing tasks].

## High-Level Architecture

-   Type: [e.g., React Single Page Application (SPA)]
-   Key patterns: [e.g., Component-based architecture, RESTful API consumption]

## Frameworks, Libraries & Tooling

-   Language: [e.g., TypeScript]
-   Core Framework: [e.g., React]
-   UI Library: [e.g., Material UI (MUI)]
-   Routing: [e.g., React Router]
-   Package Manager: [e.g., npm]
-   Formatter: [e.g., Prettier (if detected and configured)]
-   Linter: [e.g., ESLint (if detected)]
-   Bundler: [e.g., Parcel, Webpack]

## Key Project Structure

-   `src/`: Contains all source code.
    -   `index.tsx`: Application entry point.
    -   `App.tsx`: Root application component.
    -   `components/`: Reusable UI components.
    -   `pages/`: Page-level components.
    -   `types/`: TypeScript type definitions.
-   `public/`: Static assets.
-   `package.json`: Project dependencies and scripts.
-   `tsconfig.json`: TypeScript configuration.

## Always & Never Rules

### Always

-   Always use TypeScript and provide explicit type definitions.
-   Always follow the specified naming conventions: `PascalCase` for components and types/interfaces, `camelCase` for variables and functions.
-   Always name React component files (`.tsx`) using `PascalCase`; other `.ts` files should use `camelCase` or `PascalCase`.
-   Always use named exports for React components.
-   Always ensure components are modular and follow the single-responsibility principle.

### Never

-   Never introduce new runtime dependencies without discussion.
-   Never commit unformatted or lint-violating code (if linters/formatters are not auto-enforced).
-   Never use `any` as a type unless absolutely unavoidable and justified.
-   Never write overly complex components; break them down into smaller, manageable pieces.
```
