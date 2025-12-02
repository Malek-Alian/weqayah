import { AdArea } from '@/components/ui/ad-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { t } from 'i18next';
import { useState } from 'react';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Tracey Willson',
      authorAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/548/124',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
    {
      id: 2,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Jason Francisco',
      authorAvatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/548/854',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
    {
      id: 3,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Elizabeth Slavin',
      authorAvatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/945/146',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
    {
      id: 4,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Ernie Smith',
      authorAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/945/513',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
    {
      id: 5,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Erie Smith',
      authorAvatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/864/645',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
    {
      id: 6,
      title:
        'The Impact of Technology on the Workplace: How Technology is Changing',
      category: 'Technology',
      author: 'Tracey Wilson',
      authorAvatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      date: 'August 20, 2022',
      image: 'https://picsum.photos/864/146',
      excerpt:
        'Exploring how modern technology is transforming the way we work and collaborate in professional environments.',
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <div className='relative container px-4 mx-auto h-96 mt-8 overflow-hidden'>
        <img
          src='https://picsum.photos/1200/400'
          alt='Technology and Healthcare'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      <div className='container mx-auto px-4 py-8'>
        {/* First Advertisement Banner */}
        <div className='mb-12'>
          <AdArea size='banner' className='w-full' />
        </div>

        {/* Latest Posts Section */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-3xl font-bold text-foreground'>
              {t('blog.latestPosts')}
            </h2>
          </div>

          {/* Posts Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className='pt-0 overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                <div className='relative h-48 overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant='secondary' className='text-xs'>
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className='text-lg font-semibold text-foreground line-clamp-2 leading-tight'>
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className='pt-0'>
                  <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className='text-xs'>
                        {post.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Second Advertisement Banner */}
        <AdArea size='banner' className='w-full' />
      </div>
    </div>
  );
};

export default BlogPage;
