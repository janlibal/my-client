import { getUserPosts } from '@/api/posts/posts'
import { getUserTodos } from '@/api/todos/todos'
import { getUser } from '@/api/users/users'
import { PostCard, SkeletonPostCard } from '@/components/PostCard'
import { Skeleton, SkeletonList } from '@/components/Skeleton'
import { TodoItem } from '@/components/TodoItem'
import { Suspense } from 'react'

export default async function UserPage({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1 className="page-title">
              <Skeleton short inline />
            </h1>
            <div className="page-subtitle">
              <Skeleton short inline />
            </div>
            <div>
              <b>Company:</b> <Skeleton short inline />
            </div>
            <div>
              <b>Website:</b> <Skeleton short inline />
            </div>
            <div>
              <b>Address:</b> <Skeleton short inline />
            </div>
          </>
        }
      >
        <UserDetails userId={userId} />
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={3}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <UserPosts userId={userId} />
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <UserTodos userId={userId} />
        </Suspense>
      </ul>
    </>
  )
}

async function UserDetails({ userId }: { userId: number }) {
  const user = await getUser(userId)
  if (!user) return <h3>No user found</h3>

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>{' '}
        {`${user.address.street} ${user.address.suite}
    ${user.address.city} ${user.address.zipcode}`}
      </div>
    </>
  )
}

async function UserPosts({ userId }: { userId: number }) {
  const posts = await getUserPosts(userId)
  if (!posts) return <h3>No posts for this user</h3>

  return posts.map((post) => <PostCard key={post.id} {...post} />)
}

async function UserTodos({ userId }: { userId: number }) {
  const todos = await getUserTodos(userId)

  return todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
}
