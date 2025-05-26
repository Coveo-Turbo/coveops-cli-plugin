import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:commerce:listings:get', () => {
  it('gets a specific listing configuration', async () => {
    const {stdout} = await runCommand(['org:commerce:listings:get', 'electronics', '--catalogId', 'default'])
    expect(stdout).to.include('name')
    expect(stdout).to.include('displayName')
    expect(stdout).to.include('filter')
    expect(stdout).to.include('resultTemplates')
    expect(stdout).to.include('sorts')
    expect(stdout).to.include('facets')
  })
})