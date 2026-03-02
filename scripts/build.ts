import minimist from 'minimist'
import { logger, run } from './utils'

const args = minimist(process.argv.slice(2))

const devOnly = args.dev || args.d

const env = devOnly ? 'development' : 'production'

async function main() {
  logger.withBothLn(() => logger.successText('Start building lib...'))

  await run('pnpm', ['bootstrap'])
  await run('vite', ['build', '--config', 'vite.config.ts'], {
    env: {
      NODE_ENV: env,
    },
  })
  await run('pnpm', ['build:style'])
  await run('pnpm', ['build:meta'])

  if (!process.exitCode)
    logger.withEndLn(() => logger.success('All builds completed successfully'))
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
