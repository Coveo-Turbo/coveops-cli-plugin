import {Config} from '@coveo/cli-commons/config/config'
import { Command, Flags} from '@oclif/core'
import {satisfies} from 'semver'

import { AtomicVersionIdentifier } from '../../../utils/ui-atomic-update-utils.js'

export default class UiAtomicProjectUpdate extends Command {

    static override args = {}

      public static override description = 'Updates the cli created Atomic project to a higher version of the Atomic and Headless package'

      static override examples = ['<%= config.bin %> <%= command.id %>'];

       static override flags = {
          // flag with a value (-t, --type=VALUE)
          identifier: Flags.string({
            char: 'i',
            description: 'the atomic package indentifier to update to',
            options: [AtomicVersionIdentifier.Latest, AtomicVersionIdentifier.LatestV2, AtomicVersionIdentifier.LatestV3]
          }),

          version: Flags.string({
            char: 'v',
            description: 'the atomic package version to update to'
          }),
        }

    public async run(): Promise<Record<string, unknown>|undefined> {
        const {flags} = await this.parse(UiAtomicProjectUpdate);

        const {accessToken, organization} = this.configuration.get();

        if (!organization || !accessToken) {
            this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
          }

        if(!satisfies(process.version, this.config.pjson.engines.node)){
            this.error(`NodeJS ${process.version} is not supported with this command please use LTS 20 or higher.`)
        }

        if(!flags){
            // update Atomic to Latest + Stencilcore 
        }

        console.log(flags);
        throw new Error('Method not implemented.');
    }
    
    private get configuration() {
        return new Config(this.config.configDir);
        }
}