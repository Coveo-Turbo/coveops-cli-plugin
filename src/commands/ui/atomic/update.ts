import {Command, Flags} from '@oclif/core'
import {satisfies} from 'semver'

export default class UiAtomicUpdate extends Command {
  static override args = {}

  static override description = 'Updates the cli created Atomic project to a higher version of the Atomic and Headless package'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    version: Flags.string({
      char: 'v',
      description: 'the atomic package version to update to'
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(UiAtomicUpdate)

    if(!satisfies(process.version, this.config.pjson.engines.node)){
      this.error(`NodeJS ${process.version} is not supported with this command please use LTS 20 or higher.`)
    }

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Users/josephantoun/Dev/PS-Tooling/coveops-cli-plugin/src/commands/ui/atomic/update.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
