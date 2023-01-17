# Another ToDo application

> :eyes: This repository was created for study purposes, it will never be production ready

## Requirements

The project needs Docker Desktop, WSL and VS Code with [according extensions].

## Get started

Clone repository and open folder with VS Code in WSL and open folder in [Devcontainer].

> The `.env` file is necessary to start the Devcontainer!

```bash
git clone https://github.com/nandordudas/build-todo-app
cd build-todo-app
cp .env.example .env
code . --remote wsl+Ubuntu
```

Start with [APP-1] task and continue the work.

[APP-1]: https://github.com/nandordudas/build-todo-app/issues/1

## Formatting

If the repository has been set up correctly, the format of the commit file and most of the files will be checked. Files with [ESLint] and commits with [Commitlint]. If you want to modify them, please create a pull request for the new configuration.

In VS Code, formatting is automatic and happens after the current file is saved. You must save the current file multiple times if there is more than one formatting error. If this doesn't work for you, change the related setting to `all` in your `.vscode/settings.json` file -  or run `eslint --fix .` in root.

```json
{
  "eslint.codeActionsOnSave.mode": "all"
}
```

Please use `#1` or `APP-1` references in commit and don't use `--no-verify` flag for commits - without a reference commit cannot be done.

## CI

Linting and type checking will be run for each pull request and main commits, so you can cheat locally but not on CI.

Pull requests need to be 2 reviews and sucessful CI steps.

[Commitlint]: https://github.com/nandordudas/build-todo-app/blob/main/config/commitlint/src/index.cjs
[ESLint]: https://github.com/nandordudas/build-todo-app/blob/main/config/eslint-config/src/index.cjs
[Devcontainer]: https://code.visualstudio.com/docs/devcontainers/containers
[according extensions]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
