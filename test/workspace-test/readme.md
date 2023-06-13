`npm init -w w1 -w w2`
`npm i react -w w1` (react package will be added as dependency to w1, but will be managed under workspace-test)
`npm i w1 -w w2` (install w1 for w2)
`npm i -ws` (update workspaces)

package.json:
"publishConfig": {
"access": "public"
}
`npm publish -w w1` (publish w1)
`npm publish -w` (publish all workspaces)
