const RuleConfigSeverity = Object.freeze({
  Off: 0,
  Waring: 1,
  Error: 2,
})

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    '@antfu',
  ],
  plugins: [
    'unused-imports',
  ],
  rules: {
    'complexity': [
      RuleConfigSeverity.Error,
      5,
    ],
    'max-len': [
      RuleConfigSeverity.Error,
      /**
       *
       * VS Code settings are available in
       * /workspace/.devcontanier/devcontainer.json file under the following
       * settings proprties:
       *
       * customizations.vscode.settings.editor.rulers
       * customizations.vscode.settings.editor.wordWrapColumn
       */
      120,
    ],
    //
    'unused-imports/no-unused-imports': RuleConfigSeverity.Error,
    //
    'import/order': [
      RuleConfigSeverity.Error,
      {
        'alphabetize': {
          caseInsensitive: true,
          order: 'asc',
        },
        'newlines-between': 'always',
        'groups': [
          'external',
          'builtin',
          [
            'sibling',
            'parent',
          ],
          'index',
          'object',
        ],
        'pathGroups': [
          {
            group: 'external',
            pattern: '~/**',
            position: 'after',
          },
        ],
      },
    ],
  },
}
