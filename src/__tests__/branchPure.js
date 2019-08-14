import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'

import {branchPure, flowMax} from '..'

const Comp = flowMax(
  branchPure(
    ({a}) => a > 2,
    props => ({...props, a: 999}),
    props => ({...props, a: -888})
  ),
  ({a, testId}) => <div data-testid={testId}>{a}</div>
)

describe('branchPure', () => {
  test('works when test passes', () => {
    const testId = 'pass'
    const {getByTestId} = render(<Comp a={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('999')
  })

  test('works when test fails', () => {
    const testId = 'fail'
    const {getByTestId} = render(<Comp a={1} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('-888')
  })
})
