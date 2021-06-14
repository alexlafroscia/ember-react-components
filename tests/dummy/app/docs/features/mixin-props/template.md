# Optional Mixin Props

If you want to modify the Ember component wrapper, you can provide the `WithEmberSupport` decorator/higher-order function with mixin props.

For example, this can be used when you have a simple `inline-block` element (e.g., a `<button/>`) as your React component, and you want to change the `tagName` prop of the Ember component wrapper so it, too, is an inline block. For this case, the need to compose complicated CSS around such components is mitigated, which ensures that simple components rendered as expected.

{{docs/features/mixin-props/demo-mixin-props}}
