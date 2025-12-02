import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { t } from 'i18next';

const LargestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Future of Healthcare',
      summary:
        'The future of healthcare is here. We are using AI to predict and prevent diseases before they happen. We are using telemedicine to make healthcare more accessible to everyone. We are using personalized medicine to make healthcare more effective and efficient.',
      image: 'https://picsum.photos/400/124',
      readMore: '#',
    },
    {
      id: 2,
      title: 'The Future of Healthcare',
      summary:
        'The future of healthcare is here. We are using AI to predict and prevent diseases before they happen. We are using telemedicine to make healthcare more accessible to everyone. We are using personalized medicine to make healthcare more effective and efficient.',
      image: 'https://picsum.photos/400/261',
      readMore: '#',
    },
    {
      id: 3,
      title: 'The Future of Healthcare',
      summary:
        'The future of healthcare is here. We are using AI to predict and prevent diseases before they happen. We are using telemedicine to make healthcare more accessible to everyone. We are using personalized medicine to make healthcare more effective and efficient.',
      image: 'https://picsum.photos/400/272',
      readMore: '#',
    },
  ];

  return (
    <div className='py-16 px-4 bg-background'>
      <div className='container mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-primary mb-4'>
            {t('largestBlogs.title')}
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            {t('largestBlogs.description')}
          </p>
        </div>

        {/* News Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className='overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0'
            >
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <CardHeader>
                <CardTitle className='text-primary text-xl'>
                  {blog.title}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {blog.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-0'>
                <a
                  href={blog.readMore}
                  className='text-primary hover:text-primary/80 underline text-sm font-medium float-right'
                >
                  {t('largestBlogs.readMore')}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LargestBlogs;
