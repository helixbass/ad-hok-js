import React, {createFactory} from 'react'
import {render, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addState, addLayoutEffect} from '..'

// eslint-disable-next-line react/prop-types
const DisplayComp = ({x}) => (
  <div>
    <div data-testid="a">{x}</div>
  </div>
)

const Comp = flow(
  addState('x', 'setX', 'aaa'),
  addLayoutEffect(({setX}) => () => {
    // axios.get.mockResolvedValueOnce data: greeting: 'ddd'
    // {data: {greeting}} = await axios.get 'SOME_URL'
    setX('ddd')
  }),
  createFactory(DisplayComp)
)

const Comp2 = flow(
  addState('x', 'setX', 0),
  addLayoutEffect(
    ({x, setX}) => () => {
      setX(x + 1)
    },
    []
  ),
  ({x, testId}) => <div data-testid={testId}>{x}</div>
)

const Comp3 = flow(
  addState('x', 'setX', 0),
  addLayoutEffect(
    ({x, setX}) => () => {
      setX(x + 1)
    },
    ['y']
  ),
  ({x, testId}) => <div data-testid={testId}>{x}</div>
)

const PathDependency = flow(
  addState('x', 'setX', 0),
  addLayoutEffect(
    ({x, setX}) => () => {
      setX(x + 1)
    },
    ['y', 'user.id']
  ),
  ({x, testId}) => <div data-testid={testId}>{x}</div>
)

const Comp4 = flow(
  addState('x', 'setX', 0),
  addLayoutEffect(
    ({x, setX}) => () => {
      setX(x + 1)
    },
    (prevProps, props) => prevProps.y < props.y
  ),
  ({x, testId}) => <div data-testid={testId}>{x}</div>
)

describe('addLayoutEffect', () => {
  test('fires', async () => {
    const {getByText, rerender} = render(<Comp />)
    rerender(<Comp />)
    const updatedEl = await waitForElement(() => getByText('ddd'))
    expect(updatedEl).toHaveTextContent('ddd')
  })

  test('passes changed-props arg to useLayoutEffect()', () => {
    const testId = 'comp2'
    const {rerender, getByTestId} = render(<Comp2 testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('1')
    rerender(<Comp2 testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('1')
  })

  test('accepts simple dependencies', () => {
    const testId = 'comp3'
    const {getByTestId, rerender} = render(
      <Comp3 y={1} z={2} testId={testId} />
    )
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<Comp3 y={1} z={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<Comp3 y={2} z={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('2')
  })

  test('accepts path dependencies', () => {
    const testId = 'path-dependency'
    const {getByTestId, rerender} = render(
      <PathDependency y={1} z={2} testId={testId} user={{id: 3}} />
    )
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<PathDependency y={1} z={3} testId={testId} user={{id: 3}} />)
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<PathDependency y={2} z={3} testId={testId} user={{id: 3}} />)
    expect(getByTestId(testId)).toHaveTextContent('2')

    rerender(<PathDependency y={2} z={3} testId={testId} user={{id: 4}} />)
    expect(getByTestId(testId)).toHaveTextContent('3')
  })

  test('accepts callback dependencies argument', () => {
    const testId = 'comp4'
    const {getByTestId, rerender} = render(
      <Comp4 y={1} z={2} testId={testId} />
    )
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<Comp4 y={1} z={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<Comp4 y={0} z={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('1')

    rerender(<Comp4 y={2} z={3} testId={testId} />)
    expect(getByTestId(testId)).toHaveTextContent('2')
  })
})
