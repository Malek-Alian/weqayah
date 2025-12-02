import DoctorSearch from '@/components/DoctorSearch';
import LargestBlogs from '@/components/LargestBlogs';
import LatestMedicalNews from '@/components/LatestMedicalNews';
import SearchBySpecialty from '@/components/SearchBySpecialty';
import { AdArea } from '@/components/ui/ad-area';

function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      <main className='mx-auto'>
        {/* Ad Area Section */}
        <AdArea
          size='banner'
          placeholder='advertisement.placeholder'
          className='w-full rounded-none'
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
