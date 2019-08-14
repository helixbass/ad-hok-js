/* eslint-disable react/prop-types */
import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'

import {addWrapper, flowMax} from '..'

const Wrapper = ({x, children}) => (
  <div data-testid="wrapper">
    <span data-testid="passed-x">{x}</span>
    {children}
  </div>
)

const Comp = flowMax(
  addWrapper(({render: _render, props}) => (
    <Wrapper x={props.x}>{_render({z: 3})}</Wrapper>
  )),
  ({y, z}) => (
    <div>
      <span data-testid="child-y">{y}</span>
      <span data-testid="child-z">{z}</span>
    </div>
  )
)

describe('addWrapper', () => {
  test('works', () => {
    const {getByTestId} = render(<Comp x="2" y="4" />)
    expect(getByTestId('child-y')).toHaveTextContent('4')
    expect(getByTestId('child-z')).toHaveTextContent('3')
    expect(getByTestId('passed-x')).toHaveTextContent('2')
  })
})
