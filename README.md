
![license](https://img.shields.io/npm/l/md-react-loader)
![version](https://img.shields.io/npm/v/md-react-loader)
![downloads](https://img.shields.io/npm/dt/md-react-loader)

## This is a markdown file loader

### Why this?

This loader will help you directly import a markdown file as a common react component, is that amazing?

Previously when we want to load a markdown file, we may need to do some extra work to load the file, or babel will throw some error while you do these jobs.


### How to use?

While using this loader, you need to download it first

```
npm i md-react-loader
```

Secondly, write the config of your webpack module rule for md file

```js
{
  test: /\.(md)$/,
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        presets":[
          "@babel/preset-env",
          "@babel/preset-react"
        ]
      }
    },
    {
      loader: require.resolve('md-react-loader')
    }
  ]
}
```

if there if a warning: Unknown DOM property class. Did you mean className?

Im sorry for that, you need this lib:

```js
npm install --save-dev babel-plugin-react-html-attrs
```

and rewrite your babel loader config:

```js
{
  "presets":[
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "react-html-attrs"
  ]
}
```

At the end, you just need to import the file directly, then you will get a object like this

```js
{
  html: 'your html',
  Component: a react component
}
```

so you can whatever use the Component directly, or render html in your own way

```js
import Md from './MyTest.md'
const MyComponent = () => <Md.Component />
export default MyComponent

or

import Md from './MyTest.md'
const MyComponent = () => (
  <div
    dangerouslySetInnerHTML={{ __html: Md.html }}
  />
)
export default MyComponent
```

Besides, if your markdown file contains some code and you are going to highlight them, you just need to download prismjs on npm and import css file in this library

```js
import Md from './MyTest.md'
import 'prismjs'
import 'md-react-loader/lib/index.css'

const MyComponent = () => <Md.Component />
export default MyComponent
```

now you just did a good job!
