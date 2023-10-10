import type { ParsedArgs } from 'minimist'
import type { BuildConfig } from 'bun'
import { build, prepareConfig } from '../lib/build'

export const runCommand = async (argv: ParsedArgs) => {
  const cwd = process.cwd()

  const bunfile = (await import(cwd + '/' + 'Bunfile.toml').then(
    mod => mod.default
  )) as Record<string, BuildConfig>

  const buildTarget = argv._.shift() ?? 'default'

  const buildConfig = await prepareConfig(bunfile[buildTarget])

  if (!buildConfig) {
    throw new Error(`Build target '${buildTarget}' not found`)
  }

  const promise = Bun.build({
    external: ['path'],
    ...buildConfig,
  })

  await build(promise)
}
