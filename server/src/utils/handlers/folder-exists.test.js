import test from 'ava'
import { stub } from 'sinon'
import fs from 'fs-extra'
import { Ctx } from '../../../__TESTS__/koa-ctx'
import { types, tempPathGenerated } from '../temp-path'
import folderExists from './folder-exists'

/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.ctx = new Ctx()
  t.context.nextReturns = Math.random()
  t.context.next = stub().returns(t.context.nextReturns)
})


test('test `file-exists` util with realy path', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const testFn = folderExists(types.PROCESS)

  ctx.setRequest('body', {
    nameFolder: '5dc3ac4101129179d473a7c71556b402--240x400v3.zip',
  })

  const rs = await testFn(ctx, next)

  t.true(next.called)
  t.is(rs, nextReturns)
})

test('test `file-exists` util without realy path', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const tmpPath = tempPathGenerated()
  const testFn = folderExists(types.PROCESS)
  const nameFolder = '5dc3ac4101129179d473a7c71556b402--240x400v3.zip--test'
  const folderPath = tmpPath(types.PROCESS, nameFolder)

  ctx.setRequest('body', {
    nameFolder,
  })

  const rs = await testFn(ctx, next)

  t.true(next.called)
  t.is(rs, nextReturns)
  t.true(await fs.exists(folderPath))
  await fs.rmdir(folderPath)
})
