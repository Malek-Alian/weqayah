import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { get, putUpload } from '@/lib/api';
import { compressImage } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { toast } from 'sonner';
import DatePicker from '../components/DatePicker';
import FilePicker from '../components/FilePicker';

const Advertisements = () => {
  // State for managing ad data
  const [isLoading, setIsLoading] = useState(true);
  const [adSections, setAdSections] = useState({
    homeSearch: {
      title: 'Home/Search Ad',
      startDate: new Date(),
      endDate: new Date(),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    signinSignup: {
      title: 'Sign-in/Sign-up Ad',
      startDate: new Date(),
      endDate: new Date(),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    blogs: {
      title: 'Our Blogs Ad',
      startDate: new Date(),
      endDate: new Date(),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
        { id: 3, url: '', placeholder: 'Picture 3' },
        { id: 4, url: '', placeholder: 'Picture 4' },
      ],
    },
    searchFilters: {
      title: 'Under Search Filters Ad',
      startDate: new Date(),
      endDate: new Date(),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    medicalNews: {
      title: 'Medical News Ad',
      startDate: new Date(),
      endDate: new Date(),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
  });

  // Map API section names to internal section keys
  const sectionMap = {
    HOME: 'homeSearch',
    SIGN_IN_SIGN_UP: 'signinSignup',
    BLOG: 'blogs',
    UNDER_SEARCH_FILTER: 'searchFilters',
    MEDICAL_NEWS: 'medicalNews',
  };

  // Reverse map for getting API section name from internal key
  const reverseSectionMap = Object.fromEntries(
    Object.entries(sectionMap).map(([key, value]) => [value, key])
  );

  const fetchAdvertisements = async () => {
    try {
      const response = await get('/ads/');
      const adsData = response.data || [];

      // Initialize with default structure
      const updatedSections = { ...adSections };

      // Transform API response to match component structure
      adsData.forEach((ad) => {
        const sectionKey = sectionMap[ad.section];
        if (sectionKey && updatedSections[sectionKey]) {
          // Parse dates from string format "YYYY-MM-DD" to Date objects
          const parseDate = (dateString) => {
            if (!dateString) return new Date();
            // Handle "YYYY-MM-DD" format
            const [year, month, day] = dateString.split('-').map(Number);
            return new Date(year, month - 1, day); // month is 0-indexed
          };

          const startDate = parseDate(ad.startDate);
          const endDate = parseDate(ad.endDate);

          // Transform images from API format to component format
          const transformedImages =
            ad.images?.map((img, index) => ({
              id: img.id || index + 1,
              url: img.imageUrl || '',
              placeholder: `Picture ${index + 1}`,
              blurHash: img.blurHash, // Keep blurHash for potential future use
            })) || [];

          // Merge API images with default image slots to preserve all slots
          const defaultImages = updatedSections[sectionKey].images;
          const mergedImages = defaultImages.map((defaultImg, index) => {
            // If there's a corresponding API image at this index, use it
            if (transformedImages[index]) {
              return {
                ...defaultImg,
                id: transformedImages[index].id,
                url: transformedImages[index].url,
                blurHash: transformedImages[index].blurHash,
              };
            }
            // Otherwise, keep the default empty slot
            return defaultImg;
          });

          // Update the section with API data
          updatedSections[sectionKey] = {
            ...updatedSections[sectionKey],
            startDate,
            endDate,
            images: mergedImages,
            adId: ad.id, // Store the ad ID for updates
            createdAt: ad.createdAt,
          };
        }
      });

      setAdSections(updatedSections);
    } catch (error) {
      toast.error('Error fetching advertisements. Please try again.');
      // Keep default state on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  // State for popover open/close
  const [openPopovers, setOpenPopovers] = useState({});

  // Handle date changes
  const handleDateChange = (sectionKey, field, value) => {
    setAdSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  // Handle popover open/close
  const handlePopoverChange = (popoverKey, isOpen) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [popoverKey]: isOpen,
    }));
  };

  // Handle image upload with compression
  const handleImageUpload = async (sectionKey, imageId, file) => {
    console.log('Processing image:', { sectionKey, imageId, file });

    try {
      // Show compression toast
      const compressionToast = toast.loading('Compressing image...');

      // Compress the image before storing
      const compressedFile = await compressImage(file, 1920, 1080, 0.8, 2);

      // Dismiss compression toast
      toast.dismiss(compressionToast);

      // Read compressed file as data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdSections((prev) => {
          // Safety check to ensure sectionKey exists
          if (!prev[sectionKey]) {
            console.error('Section key not found:', sectionKey);
            return prev;
          }

          return {
            ...prev,
            [sectionKey]: {
              ...prev[sectionKey],
              images: prev[sectionKey].images.map((img) =>
                img.id === imageId
                  ? { ...img, url: e.target.result, file: compressedFile }
                  : img
              ),
            },
          };
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Failed to process image. Please try again.');
    }
  };

  // Handle image removal
  const handleImageRemove = (sectionKey, imageId) => {
    setAdSections((prev) => {
      // Safety check to ensure sectionKey exists
      if (!prev[sectionKey]) {
        console.error('Section key not found for removal:', sectionKey);
        return prev;
      }

      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          images: prev[sectionKey].images.map((img) => {
            if (img.id === imageId) {
              // If image has a URL from API (existing image), mark it for deletion
              // Otherwise, just clear the new file
              if (img.url && !img.url.startsWith('data:')) {
                // Existing image from API - mark for deletion but keep the id
                return { ...img, markedForDeletion: true, url: '', file: null };
              } else {
                // New image or data URL - just clear it
                return { ...img, url: '', file: null };
              }
            }
            return img;
          }),
        },
      };
    });
  };

  // Add new image to section
  const addImageToSection = (sectionKey) => {
    // Safety check to ensure sectionKey exists
    if (!adSections[sectionKey]) {
      console.error('Section key not found for adding image:', sectionKey);
      return;
    }

    const newId =
      Math.max(...adSections[sectionKey].images.map((img) => img.id)) + 1;
    setAdSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        images: [
          ...prev[sectionKey].images,
          {
            id: newId,
            url: '',
            placeholder: `Picture ${newId}`,
          },
        ],
      },
    }));
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Save all advertisements using batch update
  const handleSaveAll = async () => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Saving advertisements...');

      // Collect all updates
      const updates = [];
      const imageMap = new Map(); // Map adId to array of image files

      // Process each section
      for (const [sectionKey, section] of Object.entries(adSections)) {
        // Skip if section doesn't have an adId (not yet created)
        if (!section.adId) {
          console.log(`Skipping ${sectionKey} - no adId found`);
          continue;
        }

        const adId = section.adId;

        // Collect images marked for deletion (existing images that were removed)
        // Only include images that have an API id (not just local sequential ids)
        const imagesToDelete = section.images
          .filter(
            (img) =>
              img.markedForDeletion && img.id && typeof img.id === 'number'
          )
          .map((img) => img.id);

        // Collect new image files to upload
        const newImageFiles = section.images
          .filter((img) => img.file instanceof File)
          .map((img) => img.file);

        // Check if there are any changes (dates, new images, or deletions)
        const hasChanges =
          newImageFiles.length > 0 ||
          imagesToDelete.length > 0 ||
          section.startDate ||
          section.endDate;

        if (hasChanges) {
          // Add to updates array
          updates.push({
            adId: adId,
            startDate: formatDate(section.startDate),
            endDate: formatDate(section.endDate),
            imagesToDelete:
              imagesToDelete.length > 0 ? imagesToDelete : undefined,
          });

          // Map images to adId (image_1 for adId=1, image_2 for adId=2, etc.)
          if (newImageFiles.length > 0) {
            imageMap.set(adId, newImageFiles);
          }
        }
      }

      // Check if there are any updates
      if (updates.length === 0) {
        toast.dismiss(loadingToast);
        toast.info('No changes to save.');
        return;
      }

      // Remove undefined imagesToDelete fields
      const cleanedUpdates = updates.map((update) => {
        const cleaned = { ...update };
        if (!cleaned.imagesToDelete || cleaned.imagesToDelete.length === 0) {
          delete cleaned.imagesToDelete;
        }
        return cleaned;
      });

      // Create FormData
      const formData = new FormData();

      // Add data as JSON string
      formData.append('data', JSON.stringify({ updates: cleanedUpdates }));

      // Add images mapped to adIds (image_1 for adId=1, image_2 for adId=2, etc.)
      imageMap.forEach((files, adId) => {
        files.forEach((file, index) => {
          // Use image_1, image_2, etc. format
          formData.append(`images_${adId}`, file);
        });
      });

      // Send batch update request
      try {
        const response = await putUpload('/ads/batch-update', formData);
        console.log('Successfully saved batch update:', response.data);

        toast.dismiss(loadingToast);
        toast.success(`Successfully saved ${updates.length} advertisement(s)!`);

        // Refresh data after successful save
        await fetchAdvertisements();
      } catch (error) {
        console.error('Error saving batch update:', error);
        const errorMessage =
          error.response?.status === 413
            ? 'File size too large. Please use smaller images.'
            : error.response?.data?.message || error.message;

        toast.dismiss(loadingToast);
        toast.error(
          errorMessage || 'Failed to save advertisements. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error saving advertisements:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Render ad section
  const AdSection = ({ sectionKey, section }) => (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle className='text-xl font-bold text-blue-900'>
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Date inputs */}
          <div className='space-y-6'>
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className='space-y-3'>
                  <Skeleton className='h-4 w-1/4' />
                  <Skeleton className='h-9' />
                </div>
              ))
            ) : (
              <>
                <DatePicker
                  sectionKey={sectionKey}
                  field='startDate'
                  value={section.startDate}
                  label='Start Date'
                  isOpen={openPopovers[`${sectionKey}-startDate`] || false}
                  onOpenChange={(isOpen) =>
                    handlePopoverChange(`${sectionKey}-startDate`, isOpen)
                  }
                  onDateChange={handleDateChange}
                />
                <DatePicker
                  sectionKey={sectionKey}
                  field='endDate'
                  value={section.endDate}
                  label='End Date'
                  isOpen={openPopovers[`${sectionKey}-endDate`] || false}
                  onOpenChange={(isOpen) =>
                    handlePopoverChange(`${sectionKey}-endDate`, isOpen)
                  }
                  onDateChange={handleDateChange}
                />
              </>
            )}
          </div>

          {/* Image uploads */}
          <div className='lg:col-span-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {isLoading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className='space-y-3'>
                      <Skeleton className='h-4 w-1/4' />
                      <Skeleton className='h-32' />
                    </div>
                  ))
                : section.images.map((image) => (
                    <FilePicker
                      key={image.id}
                      sectionKey={sectionKey}
                      image={image}
                      onUpload={handleImageUpload}
                      onRemove={handleImageRemove}
                    />
                  ))}
            </div>

            {/* Add image button for blogs section (which has 4 images) */}
            {/* {sectionKey === 'blogs' && (
              <Button
                variant='outline'
                size='sm'
                className='mt-4'
                onClick={() => addImageToSection(sectionKey)}
              >
                <LuPlus className='h-4 w-4 mr-2' />
                Add Image
              </Button>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Advertisements Management
          </h2>
          <p className='text-gray-600 mt-1'>
            Manage advertisement placements across different sections of the
            platform
          </p>
        </div>
        <Button onClick={handleSaveAll}>
          <LuSave className='h-4 w-4 mr-2' />
          Save All Changes
        </Button>
      </div>

      {/* Ad Sections */}
      {Object.entries(adSections).map(([sectionKey, section]) => (
        <AdSection key={sectionKey} sectionKey={sectionKey} section={section} />
      ))}
    </div>
  );
};

export default Advertisements;
