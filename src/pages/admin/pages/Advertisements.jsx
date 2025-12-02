import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save } from 'lucide-react';
import React, { useState } from 'react';
import FilePicker from '../components/FilePicker';
import DatePicker from '../components/DatePicker';

const Advertisements = () => {
  // State for managing ad data
  const [adSections, setAdSections] = useState({
    homeSearch: {
      title: 'Home/Search Ad',
      startDate: new Date(2025, 7, 18), // August 18, 2025
      endDate: new Date(2025, 7, 18),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    signinSignup: {
      title: 'Sign-in/Sign-up Ad',
      startDate: new Date(2025, 7, 18),
      endDate: new Date(2025, 7, 18),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    blogs: {
      title: 'Our Blogs Ad',
      startDate: new Date(2025, 7, 18),
      endDate: new Date(2025, 7, 18),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
        { id: 3, url: '', placeholder: 'Picture 3' },
        { id: 4, url: '', placeholder: 'Picture 4' },
      ],
    },
    searchFilters: {
      title: 'Under Search Filters Ad',
      startDate: new Date(2025, 7, 18),
      endDate: new Date(2025, 7, 18),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
    medicalNews: {
      title: 'Medical News Ad',
      startDate: new Date(2025, 7, 18),
      endDate: new Date(2025, 7, 18),
      images: [
        { id: 1, url: '', placeholder: 'Picture 1' },
        { id: 2, url: '', placeholder: 'Picture 2' },
      ],
    },
  });

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

  // Handle image upload
  const handleImageUpload = (sectionKey, imageId, file) => {
    console.log('Uploading image:', { sectionKey, imageId, file });

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
              img.id === imageId ? { ...img, url: e.target.result } : img
            ),
          },
        };
      });
    };
    reader.readAsDataURL(file);
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
          images: prev[sectionKey].images.map((img) =>
            img.id === imageId ? { ...img, url: '' } : img
          ),
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

  // Save all advertisements
  const handleSaveAll = () => {
    console.log('Saving advertisements:', adSections);
    // Here you would typically send the data to your backend
    alert('Advertisements saved successfully!');
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
          <div className='space-y-4'>
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
          </div>

          {/* Image uploads */}
          <div className='lg:col-span-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {section.images.map((image) => (
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
                <Plus className='h-4 w-4 mr-2' />
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
        <Button
          onClick={handleSaveAll}
          className='bg-blue-600 hover:bg-blue-700'
        >
          <Save className='h-4 w-4 mr-2' />
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
