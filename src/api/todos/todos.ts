import { todos } from './data/todos.data'

export async function getTodos() {
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/todos`)
    .then((res) => res.json())
    .then((data) => data as Todo[])*/
  await wait(5000)
  return todos
}

export async function getUserTodos(userId: number) {
  await wait(5000)
  return todos.filter((todos) => todos.userId === Number(userId))
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/todos?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Todo[])*/
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
