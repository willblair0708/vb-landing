# Configuration Folder Documentation

Welcome to the `config` directory of the Aaru Sponsor Website. This directory is the backbone of our project, containing all the essential configuration files that streamline our development process, enforce coding standards, and facilitate a seamless setup for linting, formatting, and testing.

## Purpose and Importance

The `config` directory is meticulously organized to support the project's infrastructure, ensuring a harmonious integration of various tools and frameworks. It plays a pivotal role in maintaining code quality and consistency across the development lifecycle. The configurations for ESLint, Prettier, Jest, and Tailwind CSS are all housed here, alongside setup scripts and ignore files that optimize tool performance and behavior.

## Directory Structure

```sh
config/
├── .eslintignore # Defines file and directory patterns to be ignored by ESLint
├── .prettierrc # Establishes formatting guidelines as per Prettier standards
├── eslintrc.json # Contains ESLint configurations for code quality and pattern identification
├── jest.setup.js # Initializes settings and configurations for Jest testing framework
├── tsconfig.test.json # TypeScript configuration for Jest, specifying compiler options for tests
└── tailwind.config.ts # Tailwind CSS setup file for customizing design tokens and theme
```
### Key Configuration Files

- **.eslintignore**: Lists the files and directories that ESLint should ignore.
- **.prettierrc**: Defines the formatting rules for Prettier.
- **eslintrc.json**: Contains ESLint rules for identifying and reporting on patterns in JavaScript/TypeScript.
- **jest.setup.js**: Provides global configurations and setup for Jest tests, including environment setup and global mocks.
- **tsconfig.test.json**: TypeScript configuration for Jest, specifying compiler options for tests.
- **tailwind.config.ts**: Tailwind CSS configuration file for customizing the framework to fit the project's design system.

## Guidelines for Modifying Configuration

When modifying any configuration file within this directory, ensure that the changes are consistent with the project's coding standards and do not introduce any conflicts with existing setups. It is recommended to discuss significant changes with the development team to ensure alignment and avoid potential issues during development or deployment.

For detailed information on each configuration file and its purpose, refer to the respective documentation of the tools and frameworks.
