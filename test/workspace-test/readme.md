## create workspaces

`npm init --workspace w1`
Or

`npm init -w w1 -w w2`

package.json will be updated accordingly, so as node_modules(created symbolic links)

```json
{
  "workspaces": ["w1", "w2"]
}
```

## install deps

`npm i react -w w1`(react package will be added as dependency to w1, but will be managed under workspace-test)

`npm i w1 -w w2`(install w1 for w2)

## update deps

After change of package.json
`npm i --workspaces`
Or
`npm i -ws`
Will update deps for all workspaces

## publish

package.json:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

`npm publish -w w1` (publish w1)
`npm publish -w` (publish all workspaces)
