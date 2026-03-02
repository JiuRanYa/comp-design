import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      '**/common/icons/**/*',
      './dist/*',
      '**/*.md',
      '**/docs/demos/**/*',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/no-use-before-define': 'off',
      'vue/no-reserved-component-names': 'off',
      'ts/no-unused-expressions': 'off',
    },
  },
  {
    rules: {
      'style/no-tabs': 'off',
    },
    files: ['**/scripts/**/*'],
  },
)
