import { getPostComments } from '@/api/modules/comments/comments'
import { getPost } from '@/api/modules/posts/posts'
import { getUser } from '@/api/modules/users/users'
import { Skeleton, SkeletonList } from '@/components/Skeleton'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PostPage({
  params: { postId },
}: {
  params: { postId: number }
}) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1 className="page-title">
              <Skeleton inline short />
            </h1>
            <span className="page-subtitle">
              By: <Skeleton short inline />
            </span>
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </>
        }
      >
        <PostDetails postId={postId} />
      </Suspense>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Comments postId={postId} />
        </Suspense>
      </div>
    </>
  )
}

async function PostDetails({ postId }: { postId: number }) {
  const post = await getPost(postId)
  if (!post) return <h3>No post!</h3>

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        <h5>
          By:{' '}
          <Suspense fallback={<Skeleton short inline />}>
            <UserDetails userId={post.userId} />
          </Suspense>
        </h5>
      </span>
      <div>{post.body}</div>
    </>
  )
}

async function UserDetails({ userId }: { userId: number }) {
  const user = await getUser(userId)
  if (!user) return <h3>No user found!</h3>

  return <Link href={`/users/${user.id}`}>{user.name}</Link>
}

async function Comments({ postId }: { postId: number }) {
  const comments = await getPostComments(postId)
  if (!comments) return <h3>No comments found</h3>

  return comments.map((comment) => (
    <div key={comment.id} className="card">
      <div className="card-body">
        <div className="text-sm mb-1">{comment.email}</div>
        {comment.body}
      </div>
    </div>
  ))
}
