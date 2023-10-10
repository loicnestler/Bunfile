import { BuildConfig, BuildOutput, BunPlugin } from 'bun'

import chalk from 'chalk'

const ensureArray = (stringOrArray: string | string[]) =>
  Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]

const preparePlugins = (plugins: string[]) =>
  Promise.all(
    plugins.map(plugin =>
      import(plugin).then(mod => mod.default() as BunPlugin)
    )
  )

export const prepareConfig = async (config: BuildConfig) =>
  ({
    ...config,
    entrypoints: ensureArray(config.entrypoints ?? 'src/index.ts'),
    outdir: config.outdir ?? 'dist',
    plugins: await preparePlugins(
      ensureArray((config.plugins as unknown as string[]) ?? [])
    ),
  } as BuildConfig)

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
