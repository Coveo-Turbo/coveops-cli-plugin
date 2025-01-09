import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:search:authentication:delete', () => {
  it('runs org:search:authentication:delete cmd', async () => {
    const {stdout} = await runCommand('org:search:authentication:delete')
    expect(stdout).to.contain('hello world')
  })

  it('runs org:search:authentication:delete --name oclif', async () => {
    const {stdout} = await runCommand('org:search:authentication:delete --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
