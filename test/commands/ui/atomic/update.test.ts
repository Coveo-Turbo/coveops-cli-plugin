import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('ui/atomic/update', () => {
  it('runs ui/atomic/update cmd', async () => {
    const {stdout} = await runCommand('ui/atomic/update')
    expect(stdout).to.contain('hello world')
  })

  it('runs ui/atomic/update --name oclif', async () => {
    const {stdout} = await runCommand('ui/atomic/update --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
