import {flowMax, returns, branchPure} from '..'

describe('returns', () => {
  test('works as initial step', () => {
    const ret = flowMax(returns(val => val + 2), () => 4)(1)

    expect(ret).toBe(3)
  })

  test('works as non-initial step', () => {
    const ret = flowMax(() => 2, returns(val => val + 1), () => 4)(1)

    expect(ret).toBe(3)
  })

  test('works with branchPure()', () => {
    const returnThreeIfGreaterThanOne = flowMax(
      branchPure(x => x > 1, returns(val => val + 1)),
      () => 4
    )

    let ret = returnThreeIfGreaterThanOne(2)
    expect(ret).toBe(3)

    ret = returnThreeIfGreaterThanOne(1)
    expect(ret).toBe(4)
  })
})
