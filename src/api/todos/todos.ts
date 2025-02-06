import { todosData } from './data/todos.data'
import { Todo } from './types/todos.type'

export async function getTodos() {
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/todos`)
    .then((res) => res.json())
    .then((data) => data as Todo[])*/
  return todosData
}

export async function getUserTodos(userId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/todos?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Todo[])
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
