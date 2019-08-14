import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'
import {flow} from 'lodash/fp'

import {addContext} from '..'

const NumberContext = React.createContext()

const Comp = flow(
  addContext(NumberContext, 'number'),
  ({number}) => <div data-testid="a">{number}</div>
)

describe('addContext', () =>
  test('works', () => {
    const {getByTestId} = render(
      <NumberContext.Provider value={3}>
        <Comp />
      </NumberContext.Provider>
    )
    expect(getByTestId('a')).toHaveTextContent('3')
  }))
