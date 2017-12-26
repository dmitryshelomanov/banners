import test from 'ava'
import { stub } from 'sinon'
import { Ctx } from '../../../../__TESTS__/koa-ctx'
import maxSizeFile from './max-size-file'

/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.ctx = new Ctx()
  t.context.nextReturns = Math.random()
  t.context.next = stub().returns(t.context.nextReturns)
})

test('test max-size-file util with size > 150kb', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const files = {
    archive: {
      size: 160 * 1024,
    },
  }

  ctx.setRequest('files', files)
  const sizeInit = maxSizeFile(150)

  await sizeInit(ctx, next)
  t.false(next.called)
  t.is(ctx.body, 'file weight more 150kb')
  t.is(ctx.status, 201)
})

test('test max-size-file util with size < 150kb', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const files = {
    archive: {
      size: 50 * 1024,
    },
  }

  ctx.setRequest('files', files)
  const sizeInit = maxSizeFile(150)
  const rs = await sizeInit(ctx, next)

  t.true(next.called)
  t.is(rs, nextReturns)
})
