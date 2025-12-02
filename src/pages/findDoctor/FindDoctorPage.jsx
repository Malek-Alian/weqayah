import { useState } from 'react';
import DoctorSearch from '@/components/DoctorSearch';
import SearchResults from '@/components/SearchResults';
import { AdArea } from '@/components/ui/ad-area';

function FindDoctorPage() {
  const [searchData, setSearchData] = useState(null);

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
