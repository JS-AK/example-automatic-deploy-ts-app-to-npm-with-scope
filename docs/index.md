# Example: Automatic Deployment of TypeScript App to npm with Scope

## Overview
This guide outlines the steps to automatically deploy a TypeScript application to npm with a specific scope using GitHub Actions. By setting up this workflow, you can streamline the process of updating and publishing your package to npm, ensuring seamless integration with your development pipeline.

## Prerequisites
Before proceeding, make sure you have the following:

- Access to the GitHub repository containing your TypeScript project.
- An npm account with permissions to publish packages to the desired scope.
- GitHub Personal Access Token (GH_TOKEN) with the necessary permissions to push changes and trigger GitHub Actions.
- npm token (NPM_TOKEN) with permissions to publish packages.

## Workflow Setup
To automate the deployment process, follow these steps:

1. **Create Secrets**: In your GitHub repository, navigate to "Settings" > "Secrets" and add the following secrets:
    - `GH_TOKEN`: GitHub Personal Access Token.
    - `NPM_TOKEN`: npm token.

2. **Configure GitHub Actions Workflow**: Create or modify your GitHub Actions workflow file (e.g., `.github/workflows/deploy.yml`) to define the deployment steps. Below is a sample workflow file:

    ```yaml
    name: make-release

    on:
      push:
        branches:
          - master

    jobs:

      runner-job:
        runs-on: ubuntu-latest

        steps:
          - name: Check out repository code
            uses: actions/checkout@v4

          - name: Install dependencies
            run: npm ci

          - name: Run Tests
            run: npm test

      release:
        name: Release
        runs-on: ubuntu-latest
        steps:

          - name: Checkout
            uses: actions/checkout@v4
            with:
              fetch-depth: 0
              persist-credentials: false

          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              registry-url: 'https://registry.npmjs.org'

          - name: Install dependencies and build 🔧
            run: npm ci && npm run build

          - name: Make Release
            run: npx semantic-release
            env:
              GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
              NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    ```

    This workflow triggers on pushes to the `main` branch. It installs dependencies, builds the project, and then publishes it to npm.

3. **Commit and Push Changes**: Commit the workflow file changes to your repository and push them to GitHub. This action triggers the workflow defined in the YAML file.

4. **Monitor Deployment**: Once the workflow is triggered, monitor its progress in the "Actions" tab of your GitHub repository. You should see the workflow executing the defined steps.

5. **Verify Deployment**: After successful execution, verify that your TypeScript application has been deployed to npm with the specified scope.

## Conclusion
By implementing this GitHub Actions workflow, you've automated the process of deploying your TypeScript application to npm, saving time and ensuring consistency in your development workflow. With secrets management and continuous integration in place, you can confidently publish updates to your npm package with ease.

Happy coding!
