#! /usr/bin/env node

const cac = require('cac')
const cli = cac()

const TODOStore = require('./')

const store = new TODOStore()

cli.command('push', {
  desc: 'Add a task',
  examples: ['"build new internet"', '10']
}, ([task, priority]) => {
  if (!task || typeof task !== 'string') {
    console.error('tl-cli: Please provide a valid task')
  }

  if (!priority) {
    console.error('tl-cli: Please provide a valid priority level')
  }

  store.push(task, priority)
  console.log('Task added (priority):\n')
  console.log(`${task} (${priority}) `)
})

cli.command('all', {
  desc: 'List all tasks. Sorted by priority'
}, () => {
  const tasks = store.all().map(({priority, task}) => `${task} (${priority}) `).join('\n')
  console.log('Tasks (priority):\n')
  console.log(tasks)
})

cli.command('top', {
  desc: 'Get task on top of list'
}, () => {
  const {priority, task} = store.top()
  console.log('Top task (priority):\n')
  console.log(`${task} (${priority}) `)
})

cli.command('pop', {
  desc: 'Remove task on top of list'
}, () => {
  const {priority, task} = store.pop()
  console.log('Task removed (priority):\n')
  console.log(`${task} (${priority}) `)
})

cli.parse()
