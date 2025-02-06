type Post = {
  id: number
  title: string
  body: string
  userId: number
}

const pst: Post[] = [
  {
    id: 1,
    title: 'First post',
    body: 'First body',
    userId: 1,
  },
  {
    id: 2,
    title: 'Second post',
    body: 'Second body',
    userId: 1,
  },
]

export async function getPosts() {
  /*await wait(2000)
    return fetch(`${process.env.API_URL}/posts`)
      .then(res => res.json())
      .then(data => data as Post[])*/
  return pst
}

export async function getPost(postId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => data as Post)
}

export async function getUserPosts(userId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Post[])
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
