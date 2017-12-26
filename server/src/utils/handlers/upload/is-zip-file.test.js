import test from 'ava'
import { stub } from 'sinon'
import { Ctx } from '../../../../__TESTS__/koa-ctx'
import isZipFile from './is-zip-file'

/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.ctx = new Ctx()
  t.context.nextReturns = Math.random()
  t.context.next = stub().returns(t.context.nextReturns)
})

test('test is-sip-file util with zip file', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const files = {
    archive: {
      type: 'application/zip',
    },
  }

  ctx.setRequest('files', files)
  const rs = await isZipFile(ctx, next)

  t.is(rs, nextReturns)
  t.true(next.called)
})

test('test is-sip-file util with image file', async (t) => {
  const ctx = t.context.ctx
  const { next } = t.context
  const files = {
    archive: {
      type: 'application/image',
    },
  }

  ctx.setRequest('files', files)
  await isZipFile(ctx, next)
  t.false(next.called)
  t.is(ctx.body, 'file size mus be type (zip)')
  t.is(ctx.status, 201)
})
