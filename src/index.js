const path = require('path')
const os = require('os')

const piggyBank = require('piggy-bank')
const defaultPath = path.join(os.homedir(), '.tl-store.json')
const LIST_KEY = 'key'

function sorter (a, b) {
  // https://stackoverflow.com/a/8837511/7027045
  const keyA = Number(a.priority)
  const keyB = Number(b.priority)
  if (keyA < keyB) {
    return -1
  }
  if (keyA > keyB) {
    return 1
  }

  return 0
}

module.exports = class TODOStore {
  constructor (storePath = defaultPath) {
    this.store = piggyBank(storePath)
    this.list = this.store.get(LIST_KEY, [])
  }

  push (task, priority) {
    this.list.push({ task, priority })
    this.list.sort(sorter)
    this.store.set(LIST_KEY, this.list, {overwrite: true})
  }

  top () {
    return this.list[this.list.length - 1]
  }

  all () {
    return this.list
  }

  pop () {
    const task = this.list.pop()
    this.store.set(LIST_KEY, this.list, {overwrite: true})
    return task
  }
}
