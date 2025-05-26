import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('org:commerce:listings:delete', () => {
  it('deletes a listing configuration', async () => {
    const {stdout} = await runCommand(['org:commerce:listings:delete', 'electronics', '--catalogId', 'default'])
    expect(stdout).to.contain('Listing configuration "electronics" deleted successfully')
  })
})