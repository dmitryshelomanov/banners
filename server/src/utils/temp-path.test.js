import test from 'ava'
import { stub } from 'sinon'
import { resolve } from 'path'
import tempPath from './temp-path'

/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.path = {
    gifTest: 'name-file.gif',
    archiveName: 'name-archive.zip',
  }
  t.context.uuidReturns = Math.random()
  t.context.uuid = stub().returns(t.context.uuidReturns)
})

test('test `temp-path util` archive path', (t) => {
  const { archiveName } = t.context.path
  const { uuid, uuidReturns } = t.context
  const { archive } = tempPath(archiveName, uuid)

  t.true(uuid.called)
  t.is(archive(), resolve(__dirname, '..', '..', `tmp/archives/${uuidReturns}--${archiveName}`))
})

test('test `temp-path util` archive decompose', (t) => {
  const { archiveName } = t.context.path
  const { uuid, uuidReturns } = t.context
  const { decompose } = tempPath(archiveName, uuid)

  t.true(uuid.called)
  t.is(decompose(), resolve(__dirname, '..', '..', `tmp/decompress/${uuidReturns}--${archiveName}`))
})

test('test `temp-path util` archive process with folder name', (t) => {
  const { process } = tempPath()
  const withFolder = process('folderName')

  t.is(withFolder, resolve(__dirname, '..', '..', 'tmp/process/folderName'))
})

test('test `temp-path util` archive process without folder name', (t) => {
  const { archiveName } = t.context.path
  const { uuid, uuidReturns } = t.context
  const { process } = tempPath(archiveName, uuid)
  const withoutFolder = process()

  t.true(uuid.called)
  t.is(withoutFolder, resolve(__dirname, '..', '..', `tmp/process/${uuidReturns}--${archiveName}`))
})

test('test `temp-path util` archive compress with folder name', (t) => {
  const { compress } = tempPath()
  const withFolder = compress('folderName')

  t.is(withFolder, resolve(__dirname, '..', '..', 'tmp/compress/folderName'))
})

test('test `temp-path util` archive compress without folder name', (t) => {
  const { archiveName } = t.context.path
  const { uuid, uuidReturns } = t.context
  const { compress } = tempPath(archiveName, uuid)
  const withoutFolder = compress()

  t.true(uuid.called)
  t.is(withoutFolder, resolve(__dirname, '..', '..', `tmp/compress/${uuidReturns}--${archiveName}`))
})

test('test `temp-path util` test gif path', (t) => {
  const { gif } = tempPath()

  t.is(gif('my-gif.gif'), resolve(__dirname, '..', '..', 'tmp/gif/my-gif.gif'))
})

test('test `temp-path util` test gif-original path', (t) => {
  const { gifOriginal } = tempPath()

  t.is(gifOriginal('my-gif.gif'), resolve(__dirname, '..', '..', 'tmp/gif-original/my-gif.gif'))
})

test('test `temp-path util` test gif-ready path', (t) => {
  const { gifReady } = tempPath()

  t.is(gifReady('my-gif.gif'), resolve(__dirname, '..', '..', 'tmp/gif-ready/my-gif.gif'))
})
