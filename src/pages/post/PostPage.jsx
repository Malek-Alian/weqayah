import { AdArea } from '@/components/ui/ad-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { get } from '@/lib/api';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function PostPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine post type based on the current path
  const isMedicalNews = location.pathname.startsWith('/medical-news/');
  const isBlog = location.pathname.startsWith('/blog/');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try to fetch from API first
        const endpoint = isMedicalNews
          ? `/medical-news/${postId}`
          : isBlog
          ? `/blogs/${postId}`
          : `/posts/${postId}`;

        try {
          const response = await get(endpoint);
          setPost(response.data);
        } catch (apiError) {
          // If API fails, use mock data
          toast.error('Error fetching post. Please try again.');
          setPost(getMockPost(postId, isBlog, isMedicalNews));
        }
      } catch (err) {
        toast.error('Error fetching post. Please try again.');
        setError(err.message);
        // Fallback to mock data
        setPost(getMockPost(postId, isBlog, isMedicalNews));
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, isBlog, isMedicalNews]);

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <div className='container px-4 py-8 max-w-5xl space-y-4'>
          <Skeleton className='h-12 w-40' />
          <Skeleton className='h-32 w-full' />
          <div className='flex flex-row gap-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <Skeleton className='h-12 w-50' />
          </div>
          <Skeleton className='h-120 w-full' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-24 w-full' />
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>{t('common.error')}</h1>
          <p className='text-muted-foreground'>{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>{t('post.notFound')}</h1>
          <p className='text-muted-foreground'>
            {t('post.notFoundDescription')}
          </p>
        </div>
      </div>
    );
  }

  // Parse HTML content if it's a string
  const renderContent = (content) => {
    if (typeof content === 'string' && content.includes('<')) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <p className='text-foreground leading-relaxed'>{content}</p>;
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8 max-w-5xl'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <Badge
              variant='secondary'
              className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium'
            >
              {post.category || 'Technology'}
            </Badge>
          </div>

          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight'>
            {post.title ||
              'The Impact of Technology on the Workplace: How Technology is Changing'}
          </h1>

          <div className='flex items-center gap-3 text-muted-foreground mb-8'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={post.authorAvatar || post.author?.avatar}
                alt={post.author || 'Author'}
              />
              <AvatarFallback>
                {post.author
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('') || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='font-medium text-foreground'>
                {post.author || 'Tracey Wilson'}
              </span>
              <span className='text-sm'>{post.date || 'August 20, 2020'}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {post.heroImage && (
          <div className='mb-12 rounded-lg overflow-hidden'>
            <img
              src={post.heroImage}
              alt={post.title}
              className='w-full h-auto object-cover'
            />
          </div>
        )}

        {/* First Advertisement Banner */}
        <div className='mb-12'>
          <AdArea size='banner' className='w-full' />
        </div>

        {/* Article Content */}
        <article className='prose prose-lg max-w-none'>
          {/* Introduction */}
          {post.introduction && (
            <div className='mb-8'>{renderContent(post.introduction)}</div>
          )}

          {/* Main Content Sections */}
          {post.content && Array.isArray(post.content) ? (
            post.content.map((section, index) => (
              <div key={index} className='mb-8'>
                {section.heading && (
                  <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs &&
                  section.paragraphs.map((paragraph, pIndex) => (
                    <div key={pIndex} className='mb-4'>
                      {renderContent(paragraph)}
                    </div>
                  ))}
                {section.image && (
                  <div className='my-8 rounded-lg overflow-hidden'>
                    <img
                      src={section.image}
                      alt={section.heading || 'Article image'}
                      className='w-full h-auto object-cover'
                    />
                  </div>
                )}
                {section.callout && (
                  <div className='my-8 p-6 bg-muted rounded-lg border-l-4 border-primary'>
                    <p className='text-foreground italic text-lg leading-relaxed'>
                      {section.callout}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Fallback: render default content structure
            <>
              <div className='mb-8'>
                <p className='text-foreground leading-relaxed mb-4'>
                  Traveling is one of the most enriching experiences you can
                  have, exposing you to new cultures, landscapes, and ways of
                  life. Whether you're planning a weekend getaway or a
                  month-long adventure, this guide will help you make the most
                  of your journey. We'll explore tips and tricks for a memorable
                  travel experience.
                </p>
                <p className='text-foreground leading-relaxed'>
                  Immersing yourself in the local culture is one of the best
                  ways to enhance your travel experience. Try local cuisine,
                  attend cultural events, and interact with locals to gain a
                  deeper understanding of your destination.
                </p>
              </div>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Research Your Destination
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                Before you embark on your journey, take time to research your
                destination. Understanding the local culture, customs, and
                attractions will help you navigate with confidence and make the
                most of your visit.
              </p>
              <p className='text-foreground leading-relaxed mb-8'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Plan Your Itinerary
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                Planning your itinerary is crucial for making the most of your
                time and budget. Prioritize the sights and experiences that
                matter most to you, and don't forget to leave room for
                spontaneity.
              </p>
              <p className='text-foreground leading-relaxed mb-8'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>

              {/* Call-out Box */}
              <div className='my-8 p-6 bg-muted rounded-lg border-l-4 border-primary'>
                <p className='text-foreground italic text-lg leading-relaxed'>
                  "Traveling can expose you to new environments and potential
                  health risks, so it's crucial to take precautions to stay safe
                  and healthy."
                </p>
              </div>

              {/* Second Image */}
              <div className='my-8 rounded-lg overflow-hidden'>
                <img
                  src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop'
                  alt='Travel journey'
                  className='w-full h-auto object-cover'
                />
              </div>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Pack Lightly and Smartly
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                Efficient packing can make your trip much more enjoyable. Make a
                packing list, focus on versatile clothing, and use packing
                organizers to maximize space in your luggage.
              </p>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Stay Safe and Healthy
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                Traveling can expose you to new environments and potential
                health risks, so it's crucial to take precautions. Make sure
                you're up to date on vaccinations, stay hydrated, wash your
                hands regularly, and protect yourself from the sun and insects.
                Keep your valuables safe and be aware of your surroundings.
              </p>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Immerse Yourself in the Local Culture
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                One of the best ways to enhance your travel experience is to
                immerse yourself in the local culture. Try local cuisine, attend
                cultural events, and interact with locals to gain a deeper
                understanding of your destination.
              </p>

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Capture Memories
              </h2>
              <p className='text-foreground leading-relaxed mb-4'>
                Don't forget to capture your memories through photographs,
                journaling, or collecting souvenirs. However, remember to also
                put down your camera and enjoy the moment - sometimes the best
                memories are the ones you experience fully without the
                distraction of technology.
              </p>

              <Separator className='my-8' />

              <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4 mt-8'>
                Conclusion
              </h2>
              <p className='text-foreground leading-relaxed mb-8'>
                Traveling is a journey that requires both planning and
                spontaneity. By following these tips, you can make the most of
                your journey and create lasting memories. Remember to stay open
                to new experiences and embrace the unexpected - that's often
                where the best adventures lie.
              </p>
            </>
          )}
        </article>

        {/* Second Advertisement Banner */}
        <div className='mt-12'>
          <AdArea size='banner' className='w-full' />
        </div>
      </div>
    </div>
  );
}

// Mock data function for fallback
function getMockPost(postId, isBlog, isMedicalNews) {
  const mockPosts = {
    1: {
      id: 1,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Tracey Wilson',
      authorAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      date: 'August 20, 2020',
      heroImage:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop',
      introduction:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
  };

  return (
    mockPosts[postId] || {
      id: postId,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Tracey Wilson',
      authorAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      date: 'August 20, 2020',
      heroImage:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop',
    }
  );
}

export default PostPage;
