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
      loader: require.resolve('md-react-loader')
    }
  ]
}
```

I must remind you that, you need babel loader to compile the target file as a common js file

```js
{
  test: /\.(js|jsx|md)$/,
  use: [
    {
      loader: require.resolve('babel-loader'),
    }
  ]
}
```

If you got some error, may be you shold check you babelrc config, have you write your babel config correctly?

```js
{
  "presets":[
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

if there if a warning: Unknown DOM property class. Did you mean className?

Im sorry for that, you need this lib:

```js
npm install --save-dev babel-plugin-react-html-attrs
```

and rewrite your babelrc file:

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

At the end, you just need to import the file directly, and treat it as a react component

```js
import MdComponent from './MyTest.md'

const MyComponent = () => <MdComponent />
export default MyComponent
```

Besides, if your markdown file contains some code and you are going to highlight them, you just need to download prismjs on npm and import css file in this library

```js
import MdComponent from './MyTest.md'
import 'prismjs'
import 'md-react-loader/lib/index.css'

const MyComponent = () => <MdComponent />
export default MyComponent
```

now you just did a good job!
