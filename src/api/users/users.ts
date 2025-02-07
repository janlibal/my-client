import { users } from './data/users.data'

export async function getUsers() {
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/users`)
    .then((res) => res.json())
    .then((data) => data as User[])*/
  await wait(5000)
  return users
}

export async function getUser(userId: string | number) {
  await wait(5000)
  return users.find((a) => a.id === Number(userId))
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
