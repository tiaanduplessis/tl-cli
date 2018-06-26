const path = require('path')
const fs = require('fs')

const TODOStore = require('../')

const testPath = path.join(__dirname, 'test.json')

test('should perform add', () => {
  const store = new TODOStore(testPath)
  store.push('test', 1)
  expect(store.list.length).toBe(1)
})

test('should get top', () => {
  const task = {'priority': 10, 'task': 'test'}
  const store = new TODOStore(testPath)
  store.push('test', 10)
  store.push('test a', 5)
  store.push('test b', 1)

  expect(store.top()).toEqual(task)
})

test('should get all', () => {
  const store = new TODOStore(testPath)
  store.push('test', 1)
  store.push('another test', 10)

  expect(store.all().length).toBe(2)
})

test('should pop top priority', () => {
  const store = new TODOStore(testPath)
  store.push('test', 1)
  store.push('another test', 10)
  store.push('a test', 5)

  expect(store.pop()).toEqual({'priority': 10, 'task': 'another test'})
})

afterEach(() => {
  try {
    fs.unlinkSync(testPath)
  } catch (err) {}
})
