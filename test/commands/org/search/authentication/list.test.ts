import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:search:authentication:list', () => {
  it('runs org:search:authentication:list cmd', async () => {
    const {stdout} = await runCommand('org:search:authentication:list')
    expect(stdout).to.contain('hello world')
  })

  it('runs org:search:authentication:list --name oclif', async () => {
    const {stdout} = await runCommand('org:search:authentication:list --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
