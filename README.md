# bunfile

`Bunfile.toml`

```toml
[default]
entrypoints = ["src/index.ts"]
outdir = "dist"
outfile = "bunfile.js"

[browser]
# more config 🧅
```

`$ bun x bunfile`
`$ bun x bunfile [config]` (e.g. `bun x bunfile browser`)

Docs to be written
