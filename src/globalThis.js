/* eslint-disable */
(function(Object) {
  if (typeof globalThis === 'object') {
    return;
  }
  Object.defineProperty(Object.prototype, 'foobar', {
    get() {
      this.globalThis = this;
      delete Object.prototype.foobar;
    },
    configurable: true,
  }),
    foobar;
})(Object);
