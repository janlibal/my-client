import { timeout } from '@/api/core/api.settings'
import { posts } from './data/posts.data'

export async function getPosts() {
  await wait(timeout)
  return posts
}

export async function getUserPosts(userId: number) {
  await wait(timeout)
  return posts.filter((posts) => posts.userId === Number(userId))
}

export async function getPost(postId: number) {
  await wait(timeout)
  return posts.find((a) => a.id === Number(postId))
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
