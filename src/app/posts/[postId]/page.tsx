import { getPostComments } from '@/api/comments/comments'
import { getPost } from '@/api/posts/posts'
import { getUser } from '@/api/users/users'
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
    </>
  )

  async function PostDetails({ postId }: { postId: number }) {
    const post = await getPost(postId)
    if (!post) {
      return <div>Post detail: Post not found</div>
    }

    return (
      <>
        <h1 className="page-title">{post.title}</h1>
        <span className="page-subtitle">
          By:{' '}
          <Suspense fallback={<Skeleton short inline />}>
            <UserDetails userId={post.userId} />
          </Suspense>
        </span>
        <div>{post.body}</div>
      </>
    )
  }

  async function UserDetails({ userId }: { userId: number }) {
    const user = await getUser(userId)
    if (!user) {
      return <div>Post not found</div>
    }
    return <Link href={`/users/${user.id}`}>{user.name}</Link>
  }
}
