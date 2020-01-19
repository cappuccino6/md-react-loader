## this is a markdown file loader

### why this?

This loader will help you directly import a markdown file as a common react component, is that amazing?

Previously when we want to load a markdown file, we may need to do some extra work to load the file, and unfortunetly, babel will throw some error while you do these jobs.

will use this loader, you need to download it first

```
npm i md-react-loader -s-dev
```

Secondly, write an item of config of your webpack module rule

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

But i must remind you that, you need babel loader to compile the target file as a common js file

```
{
  test: /\.(js|jsx|md)$/,
  use: [
    {
      loader: require.resolve('babel-loader'),
    }
  ]
}
```

And if you got some error, may be you shold check you babelrc config, have you write your babel config correctly?

```
{
  "presets":[
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

At the end, you just need to import the file directly, and treat it as a react component, use the 'Component' property of the file directly

```js
import MyTest from './MyTest.md'

const MyComponent = () => <MyTest.Component />
export default MyComponent
```

now you just did a good job!
