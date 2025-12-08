import AdImage from '@/components/AdImage';
import DoctorSearch from '@/components/DoctorSearch';
import SearchResults from '@/components/SearchResults';
import { AdArea } from '@/components/ui/ad-area';
import { get } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function FindDoctorPage() {
  const [searchData, setSearchData] = useState(null);
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

  const handleSearch = (searchCriteria) => {
    setSearchData(searchCriteria);
  };

  return (
    <div className='bg-background'>
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
        <DoctorSearch onSearch={handleSearch} />

        {/* Search Results Section */}
        <SearchResults searchData={searchData} />
      </main>
    </div>
  );
}

export default FindDoctorPage;
