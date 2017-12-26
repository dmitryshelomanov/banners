import { stub } from 'sinon'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import nextDispatch from './next-dispatch'
/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

const mockStore = configureStore([thunk])

function mw(fetch, { store, next, action }) {
  return fetch(store)(next)(action)
}

describe('test mw next-dispatch', () => {
  it('test', () => {
    const store = mockStore({})
    const next = stub()
    const nextAction = stub().returns({
      type: 'TEST/next',
      payload: 2,
    })
    const action = {
      type: 'TEST',
      payload: 1,
      nextDispatch: nextAction,
    }

    mw(nextDispatch, { store, next, action })

    expect(nextAction.called).toBeTruthy()
    expect(next.called).toBeTruthy()
    expect(store.getActions()[0]).toEqual({
      type: 'TEST/next',
      payload: 2,
    })
  })
})
