## Installation

To start out, install the following packages

```bash
ember install ember-react-components @ember-decorators/babel-transforms
```

One thing to note is that, since this addon uses [decorators][decorators], ESLint might fail to parse your files. By setting [`babel-eslint`][babel-eslint] as the parser, this can be fixed.

[decorators]: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
[babel-eslint]: https://github.com/babel/babel-eslint
