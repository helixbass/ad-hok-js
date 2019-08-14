import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addState} from '..'

const Comp = flow(
  addState('x', 'setX', 'abcd'),
  ({x, setX}) => (
    <div>
      <div data-testid="a">{x}</div>
      <button
        onClick={() => {
          setX('efg')
        }}
      >
        update
      </button>
    </div>
  )
)

const Comp2 = flow(
  addState('x', 'setX', ({initial}) => initial),
  ({x}) => (
    <div>
      <div data-testid="b">{x}</div>
    </div>
  )
)

describe('addState', () => {
  test('initial state', () => {
    const {getByTestId} = render(<Comp />)
    expect(getByTestId('a')).toHaveTextContent('abcd')
  })

  test('setter', () => {
    const {getByText, getByTestId} = render(<Comp />)
    fireEvent.click(getByText(/update/))
    expect(getByTestId('a')).toHaveTextContent('efg')
  })

  test('initial state from props', () => {
    const {getByTestId} = render(<Comp2 initial="aaa" />)
    expect(getByTestId('b')).toHaveTextContent('aaa')
  })
})
