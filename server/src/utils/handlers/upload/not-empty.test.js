import test from 'ava'
import { stub } from 'sinon'
import { Ctx } from '../../../../__TESTS__/koa-ctx'
import notEmpty from './not-empty'

/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.ctx = new Ctx()
  t.context.nextReturns = Math.random()
  t.context.next = stub().returns(t.context.nextReturns)
})

test('test not-empty util without file', async (t) => {
  const ctx = t.context.ctx
  const { next } = t.context

  ctx.setRequest('files', {})
  await notEmpty(ctx, next)
  t.is(ctx.body, 'file not found')
  t.is(ctx.status, 404)
  t.false(next.called)
})

test('test not-empty util with file', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context

  ctx.setRequest('files', { archive: true })
  const rs = await notEmpty(ctx, next)

  t.is(rs, nextReturns)
  t.true(next.called)
})
