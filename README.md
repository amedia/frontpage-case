# TEMPLATE_APPNAME

An initial start point for node.js based applications.

## Creating a new repository

This is a template repository. Use this to create new repositories.

- Use [this self service repository](https://github.com/amedia/terraform-github)
- Read documentation in [Slite](https://amedia.slite.com/app/channels/hOlqx3Miez/notes/BvR9VuE7yg)
  - **Remember to add the template property to the repo definition:** template = "template-node-app"

## Creating a new app

0. Make sure your npm is correctly set up. Make sure you have a npmjs.com user with access to the amedia npm organization, and run `npm login`
1. Create a new Github repository based on this template
1. Set correct port in `src/config/config.js`
1. Run `npm install`
1. Start your server with `npm run dev-start`
1. Try to go to http://127.0.0.1:8080/api/TEMPLATE_APPNAME/v1/example
1. Edit the routes to your likings in `src/routes/router.js`
1. Create an awesome app

## Adding SiteConfig support

See module [documentation](https://github.com/amedia/node-site-config)

## Adding support for static files

1. Add the serve-static package to your project
   ```shell
   npm install serve-static
   ```
1. Create a `static` folder under `src`
   ```shell
   mkdir src/static
   ```
1. Add an example file in the folder. Eg: `foo.html`
1. Add the following import inside `router.js`
   ```js
   const serveStatic = require('serve-static');
   ```
1. Then add this in the same file.
   ```js
   router.use('/static', serveStatic(path.resolve(__dirname, `../../static`)));
   ```

## Node-build usage (github actions)

This repo gives you a starter `build.yaml`-file, so you can build and deploy the app. (see usage and inputs below)

```yaml
name: build-app

on:
  # Configurable to your own desires. See https://docs.github.com/en/actions/using-workflows/triggering-a-workflow
  pull_request:
    branches: [master]
  # Same as above
  push:
    branches: [master]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  build:
    uses: amedia/github-workflows/.github/workflows/node-build.yaml@node-build-workflow
    with:
      node-version: YOUR_PREFERRED_NODE_VERSION # (i.e. 16.14.0)
      image-name: YOUR_APP_NAME # (i.e. 'article')
      working-directory: packages #Optional. Defaults to root
      eik-publish: true # Optional. Defaults to false
      build: false # Optional. Defaults to true
    secrets:
      gcr-serviceaccount-key: ${{ secrets.GCR_SA_KEY }}
      npm-token: ${{ secrets.NPM_TOKEN_READONLY }}
      github-token: ${{ secrets.GITHUB_TOKEN }}
      slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
      eik-server-key: ${{ secrets.EIK_SERVER_KEY }} # Only needed if eik-publish is true
```

### Node-build inputs

| Name                | Description                                                   | Required | Default |
| ------------------- | ------------------------------------------------------------- | -------- | ------- |
| `image-name`        | Name of the image to be built                                 | `true`   |         |
| `node-version`      | Node version to be used for building the image                | `true`   |         |
| `working-directory` | Directory containing your package.json                        | `false`  | `.`     |
| `eik-publish`       | Whether to publish to Eik or not                              | `false`  | `false` |
| `build`             | Whether `npm run build` is required before building the image | `false`  | `true`  |

### Secrets

| Name                     | Description                          | Required                                            |
| ------------------------ | ------------------------------------ | --------------------------------------------------- |
| `gcr-serviceaccount-key` | Google Cloud Run Service Account Key | `true`                                              |
| `npm-token`              | NPM auth token                       | `true`                                              |
| `github-token`           | Github auth token                    | `true`                                              |
| `slack-bot-token`        | SlackBot token                       | `true`                                              |
| `eik-server-key`         | Eik server auth key                  | `true` only if input `eik-publish` is set to `true` |

## Docker

The container layout is based on best practices for Node dockerfiles.

Following are sources that motivate the standardization around this layout:

- [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Snyk Node Docker best practices](https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf)
- [Nodejs.org Creating a dockerfile](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile)
- [Node.js Docker best practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Adam Brodziak Dockerfile best practices](https://adambrodziak.pl/dockerfile-good-practices-for-node-and-npm)

### Dockerfile

The container layout contains the following:

- The `NODE_VERSION` is set by the `node-version` input to the Node-build workflow (see above [Node Build workflow inputs](#node-build-inputs))
- The `APPNAME` environment variable is set to the name of the application. This is used for logging purposes.
- The `NODE_ENV` environment variable is set to `production`. This is used to ensure that the correct dependencies are installed.
- The working directory is set to `/usr/src/app`. This is the standard working directory for Node applications.
- The user is set to `node`. This is the standard user for Node applications, and avoids running the container as root.
- The `COPY --chown=node:node . .` copies all files from the root context into the image. See the [`.dockerignore`-file](#ignore-file) for details on what is copied over.
- The `ENTRYPOINT` is set to `node`. This is a security measure that prevents illegal manual `docker run` commands.
- The `CMD` is configurable per container, and can be overridden with a custom `docker run`.

> **Warning** **If there is a build step required, this should be done in the CI/CD pipeline and the resulting build should be copied into the container if needed.**

### Ignore-file

The ignore-file is structured as an _opt-in_ solution to better manage the security of the app. With an opt-in solution the developer is forced to make a conscious decision about what is included in the container. This makes it more difficult for a developer to accidentally include sensitive files in the container.

The ignore-file opts-in `node_modules`. This is intentional because the `node-build`-workflow prunes the installed `node_modules` before building the docker image (see [Node Build Yaml](https://github.com/amedia/github-workflows/blob/cb2b6642e6b8f3a68e7a93c8831aa276dd2cc2ad/.github/workflows/node-build.yaml#L112))
