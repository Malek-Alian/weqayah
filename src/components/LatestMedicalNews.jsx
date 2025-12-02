import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { t } from 'i18next';

const LatestMedicalNews = () => {
  const newsArticles = [
    {
      id: 1,
      title: 'Breakthrough in Cancer Treatment Research',
      summary:
        'New immunotherapy treatments show promising results in clinical trials, offering hope for patients with advanced cancer.',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      readMore: '#',
    },
    {
      id: 2,
      title: 'AI Revolutionizing Medical Diagnosis',
      summary:
        'Artificial intelligence is transforming healthcare with faster, more accurate diagnostic tools and personalized treatment plans.',
      image: 'https://picsum.photos/400/250',
      readMore: '#',
    },
    {
      id: 3,
      title: 'Telemedicine Trends in 2024',
      summary:
        'Remote healthcare services continue to evolve, making quality medical care more accessible to patients worldwide.',
      image:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop',
      readMore: '#',
    },
  ];

  return (
    <div className='py-16 px-4 bg-background'>
      <div className='container mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-primary mb-4'>
            {t('latestMedicalNews.title')}
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            {t('latestMedicalNews.description')}
          </p>
        </div>

        {/* News Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className='overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0'
            >
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <CardHeader>
                <CardTitle className='text-primary text-xl'>
                  {article.title}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {article.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-0'>
                <a
                  href={article.readMore}
                  className='text-primary hover:text-primary/80 underline text-sm font-medium float-right'
                >
                  {t('latestMedicalNews.readMore')}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestMedicalNews;
