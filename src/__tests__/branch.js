import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {branch, flowMax, renderNothing, addStateHandlers, addState} from '..'

const Comp = flowMax(
  branch(
    ({a}) => a > 2,
    props => ({...props, a: 999}),
    props => ({...props, a: -888})
  ),
  ({a, testId}) => <div data-testid={testId}>{a}</div>
)

const Brancher = flowMax(
  addStateHandlers(
    {abort: false},
    {toggleAbort: ({abort}) => () => ({abort: !abort})}
  ),
  branch(({abort}) => abort, renderNothing()),
  addState('unused', 'setUnused'),
  ({a, testId, toggleAbort}) => (
    <div>
      <div data-testid={testId}>{a}</div>
      <button onClick={toggleAbort}>toggle abort</button>
    </div>
  )
)

const Brancher2 = flowMax(
  branch(({abort}) => abort, renderNothing()),
  addState('unused', 'setUnused'),
  ({a, testId, toggleAbort}) => (
    <div>
      <div data-testid={testId}>{a}</div>
      <button onClick={toggleAbort}>toggle abort</button>
    </div>
  )
)

describe('branch', () => {
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

  test('works with renderNothing()', () => {
    const testId = 'renderNothing-branch'
    const {getByTestId, getByText, queryByTestId} = render(
      <Brancher a={1} testId={testId} />
    )
    expect(getByTestId(testId)).toHaveTextContent('1')
    fireEvent.click(getByText(/toggle abort/))
    expect(queryByTestId(testId)).toBeNull()
  })

  test('works with renderNothing() when initially rendering nothing', () => {
    const testId = 'renderNothing-branch-initial-abort'
    const OuterState = flow(
      addStateHandlers(
        {
          abort: true,
        },
        {
          toggleAbort: ({abort}) => () => ({abort: !abort}),
        }
      ),
      ({abort, toggleAbort}) => (
        <div>
          <Brancher2 abort={abort} a={2} testId={testId} />
          <button onClick={toggleAbort}>toggle abort</button>
        </div>
      )
    )
    const {getByTestId, getByText, queryByTestId} = render(<OuterState />)
    expect(queryByTestId(testId)).toBeNull()
    fireEvent.click(getByText(/toggle abort/))
    expect(getByTestId(testId)).toHaveTextContent('2')
  })
})
