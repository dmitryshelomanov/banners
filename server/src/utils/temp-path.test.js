import test from 'ava'
import { stub } from 'sinon'
import { resolve } from 'path'
import { tempPathGenerated, types } from './temp-path'

/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.uuidReturns = Math.random()
  t.context.uuid = stub().returns(t.context.uuidReturns)
})

test('test folder(any folder) path with name', (t) => {
  const { uuid, uuidReturns } = t.context
  const path = tempPathGenerated('test.zip', uuid)(types.ARCHIVE)

  t.is(path, resolve(__dirname, '..', '..', `tmp/archive/${uuidReturns}--test.zip`))
})

test('test folder(any folder) path with folder name', (t) => {
  const path = tempPathGenerated()(types.ARCHIVE, 'main-folder')

  t.is(path, resolve(__dirname, '..', '..', 'tmp/archive/main-folder'))
})

test('test folder with area name', (t) => {
  const path = tempPathGenerated()(types.FIRMWARE, 'main-folder', 'mail')

  t.is(path, resolve(__dirname, '..', '..', 'tmp/firmware/main-folder/mail'))
})
