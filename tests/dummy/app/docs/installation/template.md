Installation
------------------------------------------------------------------------------

To start out, install the package (from Github, since the `npm` package is already taken) and run the generator to add React to your project.

```bash
ember install ember-react-components
```

One thing to note is that, since this addon uses [decorators][decorators], ESLint might fail to parse your files. By setting [`babel-eslint`][babel-eslint] as the parser, this can be fixed.

[decorators]: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
[babel-eslint]: https://github.com/babel/babel-eslint
