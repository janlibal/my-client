import { timeout } from '@/api/core/api.settings'
import { comments } from './data/comments.data'

export async function getPostComments(postId: number) {
  await wait(timeout)
  return comments.filter((comment) => comment.postId === Number(postId))
  /*await wait(2000)
  return fetch(`${process.env.API_URL}/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((data) => data as Comment[])*/
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
