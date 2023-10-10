import Argv from 'minimist'
import chalk from 'chalk'
import { runCommand } from './commands/run'

const argv = Argv(process.argv.slice(2))

const commandMap = {
  run: runCommand,
  //   help: runCommand,
} as const

const command: keyof typeof commandMap = (argv._[0] ?? 'run') as any

argv._.shift()

await commandMap[command](argv)
