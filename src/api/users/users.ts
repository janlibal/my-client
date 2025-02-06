import { usersData } from './data/users.data'
import { User } from './types/users.type'

export async function getUsers() {
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/users`)
    .then((res) => res.json())
    .then((data) => data as User[])*/
  await wait(1000)
  return usersData
}

export async function getUser(userId: string | number) {
  await wait(1000)
  return usersData.find((user) => user.id === userId)
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/users/${userId}`)
    .then((res) => res.json())
    .then((data) => data as User)*/
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
