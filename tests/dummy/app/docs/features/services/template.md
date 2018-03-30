# Using Services

Services can be used through the [`@ember-decorators`][ember-decorators] addon. Start off by installing it

```bash
ember install ember-decorators
```

With that set up, you can inject references to a service the same way you can with an Ember component

{{docs/features/services/demo-service-injection}}

Note that it's important to use `Ember.get` to access the service if you're working with an Ember version below `3.1`. Above that version, thanks to ES5 getters on computed properties, you should be able to access an injected service just like another other property (without `Ember.get`).

[ember-decorators]: https://github.com/ember-decorators/ember-decorators
