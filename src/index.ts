import Argv from 'minimist'
import { buildCommand } from './commands/build'

const argv = Argv(process.argv.slice(2))

const commandMap = {
  build: buildCommand,
} as const

const command: keyof typeof commandMap = (argv._.shift() ?? 'build') as any

await commandMap[command](argv)
