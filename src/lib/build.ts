import { BuildOutput } from 'bun'

import chalk from 'chalk'

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
