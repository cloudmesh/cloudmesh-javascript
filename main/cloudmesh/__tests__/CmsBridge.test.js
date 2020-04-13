import CmsBridge from '../CmsBridge'

describe('CmsBridge Class', () => {
  /**
   * Testing basic CmsBridge constructor.
   */
  test('constructor', () => {
    const cms = new CmsBridge({
      scriptPath: 'main/cloudmesh/__tests__/test.py',
    })
    expect(cms).toBeDefined()
    expect(cms).toBeInstanceOf(CmsBridge)
  })

  /**
   * Testing passing a bad filename to constructor.
   */
  test('constructor error', () => {
    let cms
    expect(() => {
      cms = new CmsBridge({ scriptPath: 'blah.py' })
    }).toThrow()
  })

  /**
   * Basic test of sending a command to CmsBridge.
   *
   */
  test('test send', async () => {
    const cms = new CmsBridge({
      scriptPath: 'main/cloudmesh/__tests__/test.py',
    })
    const { output } = await cms.send({}).catch((error) => console.log(error))
    expect(output).toEqual('Hi there')
  })

  /**
   * This test should timeout and throw an error.
   */
  test('test send timeout', async () => {
    const cms = new CmsBridge({
      scriptPath: 'main/cloudmesh/__tests__/test_timeout.py',
      options: { jobTimeout: 0 },
    })
    await expect(cms.send({})).rejects.toThrow()
  })
})
