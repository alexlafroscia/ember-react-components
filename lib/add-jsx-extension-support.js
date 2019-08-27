module.exports = function addJsxExtensionSupport(parent) {
  if (parent.options['ember-cli-babel']['extensions']) {
    if (!parent.options['ember-cli-babel']['extensions'].includes('js')) {
      parent.options['ember-cli-babel']['extensions'].push('js');
    }
    if (!parent.options['ember-cli-babel']['extensions'].includes('jsx')) {
      parent.options['ember-cli-babel']['extensions'].push('jsx');
    }
  } else {
    parent.options['ember-cli-babel']['extensions'] = ['js', 'jsx'];
  }
};
