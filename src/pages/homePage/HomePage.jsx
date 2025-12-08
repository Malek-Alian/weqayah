import AdImage from '@/components/AdImage';
import DoctorSearch from '@/components/DoctorSearch';
import LargestBlogs from '@/components/LargestBlogs';
import LatestMedicalNews from '@/components/LatestMedicalNews';
import SearchBySpecialty from '@/components/SearchBySpecialty';
import { AdArea } from '@/components/ui/ad-area';
import { get } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);

  const fetchAdvertisements = async () => {
    try {
      const response = await get('/ads/active?section=HOME');
      setAdvertisements(response.data);
    } catch (error) {
      toast.error('Error fetching advertisements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return (
    <div className='min-h-screen bg-background'>
      <main className='mx-auto'>
        {/* Ad Area Section */}
        <AdArea
          size='banner'
          placeholder='advertisement.placeholder'
          className='w-full rounded-none'
          loading={isLoading}
          children={
            <AdImage imageUrl={advertisements[0]?.images[0]?.imageUrl} />
          }
        />

        {/* Doctor Search Section */}
        <DoctorSearch />

        {/* Latest Medical News Section */}
        <LatestMedicalNews />

        {/* Search by Specialty Section */}
        <SearchBySpecialty />

        {/* Largest Blogs Section */}
        <LargestBlogs />
      </main>
    </div>
  );
}

export default HomePage;
