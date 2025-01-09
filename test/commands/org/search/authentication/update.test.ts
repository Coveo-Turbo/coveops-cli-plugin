import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:search:authentication:update', () => {
  it('runs org:search:authentication:update cmd', async () => {
    const {stdout} = await runCommand('org:search:authentication:update')
    expect(stdout).to.contain('hello world')
  })

  it('runs org:search:authentication:update --name oclif', async () => {
    const {stdout} = await runCommand('org:search:authentication:update --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
