import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:search:authentication:create', () => {
  it('runs org:search:authentication:create cmd', async () => {
    const {stdout} = await runCommand('org:search:authentication:create')
    expect(stdout).to.contain('hello world')
  })

  it('runs org:search:authentication:create --name oclif', async () => {
    const {stdout} = await runCommand('org:search:authentication:create --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
