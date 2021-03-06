/* eslint-disable no-console */
import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addPropsOnChange} from '..'

const Comp = flow(
  addPropsOnChange(['x'], ({x}) => {
    console.log('recomputing y')
    return {y: x * 2}
  }),
  ({y, testId}) => <div data-testid={testId}>{y}</div>
)

const CompCallback = flow(
  addPropsOnChange(
    (prevProps, props) => prevProps.x[0] !== props.x[0],
    ({x}) => {
      console.log('recomputing y')
      return {y: x[0] * 2}
    }
  ),
  ({y, testId}) => <div data-testid={testId}>{y}</div>
)

describe('addPropsOnChange', () => {
  test('works with dependencies list', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'basic'
    const {getByTestId, rerender} = render(<Comp x={2} z={3} testId={testId} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('4')

    rerender(<Comp x={2} z={5} testId={testId} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    rerender(<Comp x={4} z={5} testId={testId} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('8')
  })

  test('works with change callback', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    const testId = 'callback'
    const {getByTestId, rerender} = render(
      <CompCallback x={[2]} z={3} testId={testId} />
    )
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('4')

    rerender(<CompCallback x={[2]} z={5} testId={testId} />)
    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()

    rerender(<CompCallback x={[4]} z={5} testId={testId} />)
    expect(console.log).toHaveBeenCalledTimes(1)
    console.log.mockClear()
    expect(getByTestId(testId)).toHaveTextContent('8')
  })
})
