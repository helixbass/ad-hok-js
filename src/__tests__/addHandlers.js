/* eslint-disable no-console */
import React, {useRef} from 'react'
import {render, fireEvent} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addHandlers, addState} from '..'

const Comp = flow(
  addHandlers({
    onClick: ({onClick}) => num => {
      onClick(num * 2)
    },
  }),
  ({onClick}) => (
    <div>
      <button onClick={() => onClick(3)}>update</button>
    </div>
  )
)

const Outer = () => {
  const inputRef = useRef()
  return (
    <div>
      <input data-testid="input" ref={inputRef} />
      <Comp
        onClick={val => {
          inputRef.current.value = val
        }}
      />
    </div>
  )
}

const Deps = flow(
  addState('y', 'setY', 2),
  addHandlers(
    {
      onClick: ({x, setY}) => () => {
        setY(x + 1)
      },
    },
    ['x', 'setY', 'user.id']
  ),
  ({onClick, y, testId}) => (
    <div>
      <Pure onClick={onClick} />
      <div data-testid={testId}>{y}</div>
    </div>
  )
)

const DepsCallback = flow(
  addState('y', 'setY', 2),
  addHandlers(
    {
      onClick: ({x, setY}) => () => {
        setY(x + 1)
      },
    },
    (prevProps, props) => prevProps.x < props.x
  ),
  ({onClick, y, testId}) => (
    <div>
      <Pure onClick={onClick} label="pure button DepsCallback" />
      <div data-testid={testId}>{y}</div>
    </div>
  )
)

// eslint-disable-next-line react/prop-types
const Pure = React.memo(({onClick, label = 'pure button'}) => {
  console.log('Pure rerendered')
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  )
})

describe('addHandlers', () => {
  test('works', () => {
    const {getByText, getByTestId} = render(<Outer />)

    fireEvent.click(getByText(/update/))
    expect(getByTestId('input').value).toBe('6')
  })

  test('allows specifying dependencies for stable handler identities across rerenders', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'y'
    let x = 4
    const {rerender, getByText, getByTestId} = render(
      <Deps x={x} testId={testId} user={{id: 3}} />
    )
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()

    rerender(<Deps x={x} testId={testId} user={{id: 3}} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    fireEvent.click(getByText(/pure button/))
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('5')

    x = 6
    rerender(<Deps x={x} testId={testId} user={{id: 3}} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()

    fireEvent.click(getByText(/pure button/))
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('7')

    rerender(<Deps x={x} testId={testId} user={{id: 4}} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('7')
  })

  test('allows specifying dependencies as callback', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'dependencies-callback'
    let x = 5
    const {rerender, getByText, getByTestId} = render(
      <DepsCallback x={x} testId={testId} />
    )
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()

    rerender(<DepsCallback x={x} testId={testId} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    x = 4
    rerender(<DepsCallback x={x} testId={testId} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    fireEvent.click(getByText(/pure button DepsCallback/))
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('6')

    x = 6
    rerender(<DepsCallback x={x} testId={testId} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()

    fireEvent.click(getByText(/pure button DepsCallback/))
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('7')
  })
})
