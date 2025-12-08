import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTranslation } from 'react-i18next';
import { LuCalendar, LuClock } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

function MedicalNewsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data for medical news articles
  const featuredArticle = {
    id: 1,
    title:
      'Breakthrough in Cancer Treatment: New Immunotherapy Shows 85% Success Rate',
    description:
      'Researchers at leading medical institutions have developed a revolutionary immunotherapy treatment that has shown remarkable results in clinical trials.',
    date: 'September 19, 2025',
    category: 'Cancer Research',
    image: 'https://picsum.photos/594/973',
    readTime: '5 min read',
  };

  const articles = [
    {
      id: 2,
      title:
        'AI-Powered Diagnostic Tools Revolutionize Early Disease Detection',
      description:
        'Artificial intelligence is transforming healthcare with new diagnostic capabilities that can detect diseases earlier than ever before.',
      date: 'September 18, 2025',
      category: 'Technology',
      image: 'https://picsum.photos/400/315',
      readTime: '3 min read',
    },
    {
      id: 3,
      title: 'New Study Links Mediterranean Diet to Improved Brain Health',
      description:
        'A comprehensive study reveals the cognitive benefits of following a Mediterranean-style diet for long-term brain health.',
      date: 'September 17, 2025',
      category: 'Nutrition',
      image: 'https://picsum.photos/400/651',
      readTime: '4 min read',
    },
    {
      id: 4,
      title:
        'Breakthrough in Gene Therapy Offers Hope for Rare Genetic Disorders',
      description:
        'Scientists have made significant progress in gene therapy techniques that could treat previously untreatable genetic conditions.',
      date: 'September 16, 2025',
      category: 'Genetics',
      image: 'https://picsum.photos/400/239',
      readTime: '6 min read',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-4xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
              {t('medicalNews.title')}
            </h1>
            <p className='text-lg text-muted-foreground mb-8'>
              {t('medicalNews.description')}
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        {/* Featured Article */}
        <div className='mb-16'>
          <h2 className='text-2xl font-semibold mb-6'>
            {t('medicalNews.featuredArticle')}
          </h2>
          <Card className='md:max-h-112 pt-0 overflow-hidden hover:shadow-lg transition-shadow'>
            <div className='md:flex'>
              <div className='md:w-1/2'>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className='w-full h-64 md:h-full object-cover'
                />
              </div>
              <div className='md:w-1/2'>
                <CardHeader className='mt-6'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant='secondary'>
                      {featuredArticle.category}
                    </Badge>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <LuClock className='w-4 h-4 mr-1' />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                  <CardTitle className='text-2xl leading-tight'>
                    {featuredArticle.title}
                  </CardTitle>
                  <CardDescription className='text-base'>
                    {featuredArticle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center text-sm text-muted-foreground mb-4'>
                    <LuCalendar className='w-4 h-4 mr-2' />
                    {featuredArticle.date}
                  </div>
                  <Button
                    className='w-full md:w-auto'
                    onClick={() =>
                      navigate(`/medical-news/${featuredArticle.id}`)
                    }
                  >
                    {t('medicalNews.readFullArticle')}
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>

        {/* Articles List */}
        <div className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6'>
            {t('medicalNews.latestArticles')}
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {articles.map((article) => (
              <Card
                key={article.id}
                className='overflow-hidden hover:shadow-lg transition-shadow pt-0'
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-48 object-cover'
                />
                <CardHeader>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant='outline'>{article.category}</Badge>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <LuClock className='w-4 h-4 mr-1' />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className='line-clamp-2'>
                    {article.title}
                  </CardTitle>
                  <CardDescription className='line-clamp-3'>
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <LuCalendar className='w-4 h-4 mr-2' />
                      {article.date}
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => navigate(`/medical-news/${article.id}`)}
                    >
                      {t('medicalNews.readMore')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='flex justify-center'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default MedicalNewsPage;
