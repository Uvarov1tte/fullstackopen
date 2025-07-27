const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis/index.js')


/* GET added todos stats. */
router.get('/statistics', async (_, res) => {
  const addedTodos = await getAsync('added_todos')
  console.log(addedTodos)
  res.status(200)
  if (!addedTodos) {
    setAsync('added_todos', '0')
    return res.send({ addedTodos: '0' })
  } else {
    res.json({ addedTodos })
  }
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const stat = await getAsync('added_todos')
  if (!stat) {
    await setAsync('added_todos', '0')
  }
  
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  setAsync('added_todos', parseInt(stat) + 1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    { done: !req.todo.done },
    { new: true }
  )

  res.send(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
