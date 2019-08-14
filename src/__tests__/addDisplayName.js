import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'

import {addDisplayName, flowMax, addProps} from '..'

const InitialDisplayName = flowMax(
  addDisplayName('Initial'),
  addProps({a: 3}),
  ({a, testId}) => <div data-testid={testId}>{a}</div>
)

const NonInitialDisplayName = flowMax(
  addProps({a: 4}),
  addDisplayName('NonInitial'),
  ({a, testId}) => <div data-testid={testId}>{a}</div>
)

describe('addDisplayName', () => {
  test('works as initial step', () => {
    expect(InitialDisplayName.displayName).toBe('Initial')
    const testId = 'initial-step'
    const {getByTestId} = render(<InitialDisplayName testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('3')
  })

  test('works as non-initial step', () => {
    expect(NonInitialDisplayName.displayName).toBe('NonInitial')
    const testId = 'non-initial-step'
    const {getByTestId} = render(<NonInitialDisplayName testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('4')
  })
})
