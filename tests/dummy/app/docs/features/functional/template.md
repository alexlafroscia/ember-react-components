# Stateless, Functional Components 

If you don't want to create a normal, `Class`-based component, `ember-react-components` also supports functional components.

Instead of applying `WithEmberSupport` as a decorator, you pass a function directly into it and export the returned value.

{{docs/features/functional/demo-functional-component}}

Note that if you need service injection, you'll need to use a `Class`-based component instead.
