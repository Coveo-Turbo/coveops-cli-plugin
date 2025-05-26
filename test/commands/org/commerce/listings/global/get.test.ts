import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:commerce:listings:global:get', () => {
  it('gets the global listing configuration', async () => {
    const {stdout} = await runCommand(['org:commerce:listings:global:get', '--catalogId', 'default'])
    expect(stdout).to.include('resultTemplates')
    expect(stdout).to.include('sorts')
    expect(stdout).to.include('facets')
  })
})