import { useLocation, useParams } from 'react-router-dom';

function PostPage() {
  const { postId } = useParams();
  const location = useLocation();

  // Determine post type based on the current path
  const isMedicalNews = location.pathname.startsWith('/medical-news/');
  const isBlog = location.pathname.startsWith('/blog/');

  return (
    <div>
      <h1>
        {isMedicalNews ? 'Medical News Article' : isBlog ? 'Blog Post' : 'Post'}
      </h1>
      <p>
        Post ID: <strong>{postId}</strong>
      </p>
      <p>
        {isMedicalNews
          ? 'Read the full medical news article here.'
          : isBlog
          ? 'Read the full blog post here.'
          : 'Read the full post here.'}
      </p>
    </div>
  );
}

export default PostPage;
