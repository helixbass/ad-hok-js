/* eslint-disable no-console, react/prop-types */
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addStateHandlers} from '..'

const Comp = flow(
  addStateHandlers(
    {
      x: 2,
    },
    {
      incrementX: ({x}) => ({by: amount = 1} = {}) => ({x: x + amount}),
    }
  ),
  ({x, incrementX}) => (
    <div>
      <div data-testid="a">{x}</div>
      <button onClick={incrementX}>increment</button>
      <button
        onClick={() => {
          incrementX({by: 2})
        }}
      >
        two
      </button>
    </div>
  )
)

const Comp2 = flow(
  addStateHandlers(
    {
      x: 12,
    },
    {
      incrementX: ({x}, {y = 0}) => ({by: amount = 1} = {}) => ({
        x: x + amount + y,
      }),
    }
  ),
  ({x, incrementX}) => (
    <div>
      <div data-testid="b">{x}</div>
      <button onClick={incrementX}>incremental</button>
      <button
        onClick={() => {
          incrementX({by: 2})
        }}
      >
        two more
      </button>
    </div>
  )
)

const Comp3 = flow(
  addStateHandlers(({initialX}) => ({x: initialX}), {
    incrementX: ({x}) => ({by: amount = 1} = {}) => ({x: x + amount}),
  }),
  ({x, incrementX}) => (
    <div>
      <div data-testid="c">{x}</div>
      <button onClick={incrementX}>increment</button>
      <button
        onClick={() => {
          incrementX({by: 2})
        }}
      >
        two
      </button>
    </div>
  )
)

const EmptyDeps = flow(
  addStateHandlers({x: 1}, {incrementX: ({x}) => () => ({x: x + 1})}, []),
  ({incrementX, x, testId}) => (
    <div>
      <EmptyPure onClick={incrementX} />
      <div data-testid={testId}>{x}</div>
    </div>
  )
)

const EmptyPure = React.memo(({onClick}) => {
  console.log('Pure rerendered')
  return (
    <div>
      <button onClick={onClick}>empty pure button</button>
    </div>
  )
})

const PropDeps = flow(
  addStateHandlers({x: 1}, {incrementXByY: ({x}, {y}) => () => ({x: x + y})}, [
    'y',
  ]),
  ({incrementXByY, x, testId}) => (
    <div>
      <PropPure onClick={incrementXByY} />
      <div data-testid={testId}>{x}</div>
    </div>
  )
)

const PropPure = React.memo(({onClick}) => {
  console.log('PropPure rerendered')
  return (
    <div>
      <button onClick={onClick}>prop pure button</button>
    </div>
  )
})

describe('addStateHandlers', () => {
  test('initial state', () => {
    const {getByTestId} = render(<Comp />)
    expect(getByTestId('a')).toHaveTextContent('2')
  })

  test('handler', () => {
    const {getByText, getByTestId} = render(<Comp />)
    fireEvent.click(getByText(/increment/))
    expect(getByTestId('a')).toHaveTextContent('3')

    fireEvent.click(getByText(/two/))
    expect(getByTestId('a')).toHaveTextContent('5')
  })

  test('handler passes props', () => {
    const {getByText, getByTestId} = render(<Comp2 y={1} />)
    fireEvent.click(getByText(/incremental/))
    expect(getByTestId('b')).toHaveTextContent('14')

    fireEvent.click(getByText(/two more/))
    expect(getByTestId('b')).toHaveTextContent('17')
  })

  test('initial state based on props', () => {
    const {getByTestId} = render(<Comp3 initialX={9} />)
    expect(getByTestId('c')).toHaveTextContent('9')
  })

  test('allows specifying empty dependencies', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'empty-deps'
    const {rerender, getByText, getByTestId} = render(
      <EmptyDeps randomProp={1} testId={testId} />
    )
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<EmptyDeps randomProp={2} testId={testId} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    fireEvent.click(getByText(/empty pure button/))
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('2')
  })

  test('allows specifying prop dependencies', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'prop-deps'
    const {rerender, getByText, getByTestId} = render(
      <PropDeps y={1} testId={testId} />
    )
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<PropDeps y={2} testId={testId} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()

    fireEvent.click(getByText(/prop pure button/))
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('3')
  })
})
