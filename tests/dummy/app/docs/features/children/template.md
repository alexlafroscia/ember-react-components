# Children

Basic support for block-style rendering is supported. The yielded content will be rendered to the `children` of the component.

{{docs/features/children/render-children}}

One thing to note, however, is that if any elements are dynamically rendered, that _must_ be done within a "stable" element. Something like this _will not_ work.

```handlebars
{{#yield-to-children}}
  {{#if someCondition}}
    <p>The thing is true</p>
  {{else}}
    <p>The thing is not true</p>
  {{/if}}
{{/yield-to-children}}
```

This is because the Glimmer engine can get confused due to the way we have to re-located some of the DOM nodes to make this feature work. The conditional must have a parent element that Glimmer knows about.

```handlebars
{{#yield-to-children}}
  <div id="stable-parent-element">
    {{#if someCondition}}
      <p>The thing is true</p>
    {{else}}
      <p>The thing is not true</p>
    {{/if}}
  </div>
{{/yield-to-children}}
```
