const ToDoList = artifacts.require('./ToDoList.sol')

contract('ToDoList', (accounts) => {
  before(async () => {
    this.todoList = await ToDoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists tasks', async () => {
    const taskcount = await this.todoList.taskcount()
    const task = await this.todoList.tasks(taskcount)
    assert.equal(task.id.toNumber(), taskcount.toNumber())
    assert.equal(task.content, 'check out this')
    assert.equal(task.completed, false)
    assert.equal(taskcount.toNumber(), 1)
  })

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskcount = await this.todoList.taskcount()
    assert.equal(taskcount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)
  })

  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })

})