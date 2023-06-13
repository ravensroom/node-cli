## initialize

`npx lerna init`

## new package

`npx lerna create a`
`npx lerna create cli --access public --bin --es-module`

/packages/a
in package.json

```json
{
  "main": "lib/index.js" //specify the entry file
}
```

execution:
`node packages/a`

## add deps

`npx lerna add chalk packages/a`

## add as deps to root node_modules

`npx lerna link`

## testing

`npx lerna test`

## publish

`npx lerna publish`
