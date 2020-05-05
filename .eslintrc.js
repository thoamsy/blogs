module.exports = {
  root: true,
  extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  globals: {
    graphql: false,
    globalThis: true,
    __PATH_PREFIX__: false,
  },
};
