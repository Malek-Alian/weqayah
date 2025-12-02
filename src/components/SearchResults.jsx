import { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import DoctorFilters from './DoctorFilters';
import Pagination from './Pagination';
import { mockDoctors } from '@/data/mockDoctors';
import { t } from 'i18next';
import { AdArea } from './ui/ad-area';

const SearchResults = ({ searchData }) => {
  const [filters, setFilters] = useState({});
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(3);

  // Filter doctors based on search criteria and filters
  useEffect(() => {
    let filtered = [...mockDoctors];

    // Apply search filters
    if (searchData?.specialty) {
      filtered = filtered.filter((doctor) =>
        doctor.specialty
          .toLowerCase()
          .includes(searchData?.specialty.toLowerCase())
      );
    }

    if (searchData?.location) {
      filtered = filtered.filter((doctor) =>
        doctor.location
          .toLowerCase()
          .includes(searchData?.location.toLowerCase())
      );
    }

    if (searchData?.doctorName) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchData?.doctorName.toLowerCase())
      );
    }

    if (searchData?.insurance) {
      filtered = filtered.filter((doctor) =>
        doctor.insurance.some((ins) =>
          ins.toLowerCase().includes(searchData?.insurance.toLowerCase())
        )
      );
    }

    // Apply additional filters
    if (filters.gender && filters.gender.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.gender.includes(doctor.gender)
      );
    }

    if (filters.fees && filters.fees.length > 0) {
      filtered = filtered.filter((doctor) => {
        return filters.fees.some((feeRange) => {
          const [min, max] = feeRange.split('-').map(Number);
          if (max) {
            return doctor.fees >= min && doctor.fees <= max;
          } else {
            return doctor.fees >= min;
          }
        });
      });
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchData, filters]);

  const handleBookAppointment = (doctor) => {
    console.log('Booking appointment with:', doctor);
    // Implement booking logic here
    alert(`Booking appointment with ${doctor.name}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  return (
    <div className='max-w-7xl mx-auto py-8 px-4'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Filters Sidebar */}
        <div className='lg:col-span-1 space-y-4 sticky top-20 h-fit'>
          <DoctorFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <AdArea size='rectangle' placeholder='advertisement.placeholder' />
        </div>

        {/* Doctor Results */}
        <div className='lg:col-span-3'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-primary mb-2'>
              {t('searchResults.availableDoctors')}
            </h2>
            <p className='text-primary'>
              {t('searchResults.foundDoctors')} {filteredDoctors.length}{' '}
              {t('searchResults.doctorsMatchingYourCriteria')}
            </p>
          </div>

          {/* Doctor Cards */}
          <div className='space-y-6 mb-8'>
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                />
              ))
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>
                  {t('searchResults.noDoctorsFoundMatchingYourCriteria')}
                </p>
                <p className='text-gray-400 mt-2'>
                  {t('searchResults.tryAdjustingYourSearchFilters')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='w-full flex justify-center mb-8'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
