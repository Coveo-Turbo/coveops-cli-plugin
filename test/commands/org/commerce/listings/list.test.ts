import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:commerce:listings:list', () => {
  it('lists all listing configurations', async () => {
    const {stdout} = await runCommand(['org:commerce:listings:list', '--catalogId', 'default'])
    expect(stdout).to.include('name')
    expect(stdout).to.include('displayName')
    expect(stdout).to.include('filter')
    expect(stdout).to.include('isActive')
  })
})