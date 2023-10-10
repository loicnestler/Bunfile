import { BuildConfig, BuildOutput, BunPlugin } from 'bun'

import chalk from 'chalk'
import { createRequire } from 'module'

const ensureArray = (stringOrArray: string | string[]) =>
  Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]

export const prepareConfig = async (config: BuildConfig) => {
  const requireFromCwd = createRequire(process.cwd() + '/noop.js')

  const plugins = ensureArray(
    (config.plugins as unknown as string[]) ?? []
  ).map(plugin => requireFromCwd(plugin).default()) as BunPlugin[]

  return {
    ...config,
    entrypoints: ensureArray(config.entrypoints ?? 'src/index.ts'),
    outdir: config.outdir ?? 'dist',
    plugins: plugins,
  } as BuildConfig
}

export const build = (promise: Promise<BuildOutput>) => {
  const start = Date.now()

  return promise
    .then(output => {
      if (output.success) {
        console.log(
          `Built in ${chalk.green.bold(Date.now() - start + 'ms')}! 🧅`
        )
      } else {
        console.error(
          chalk.red(`Build failed after ${Date.now() - start}ms! 💥`)
        )
        console.error(output.logs.join('\n\n'))
        process.exit(1)
      }
    })
    .catch(error => {
      console.error(chalk.red(`Build failed after ${Date.now() - start}ms! 💥`))
      console.error(error)
      process.exit(1)
    })
}
