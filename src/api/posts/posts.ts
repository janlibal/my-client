import { postsData } from './data/posts.data'
import { Post } from './types/posts.type'

export async function getPosts() {
  /*await wait(2000)
    return fetch(`${process.env.API_URL}/posts`)
      .then(res => res.json())
      .then(data => data as Post[])*/
  return postsData
}

export async function getPost(postId: string | number) {
  await wait(2000)
  return postsData.find((a) => a.id === postId)
  /*
  return fetch(`${process.env.API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => data as Post)*/
}

export async function getUserPosts(userId: string | number) {
  return postsData.filter((a) => a.userId === userId)
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/posts?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Post[])*/
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
