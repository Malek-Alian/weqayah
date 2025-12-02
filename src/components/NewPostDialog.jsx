import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RichText from '@/components/editor/RichText';

const NewPostDialog = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstImage: '',
    secondImage: '',
    firstParagraph: '',
    secondParagraph: '',
    isBlog: false,
    isPublished: false,
  });

  const [firstParagraphContent, setFirstParagraphContent] = useState('');
  const [secondParagraphContent, setSecondParagraphContent] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!formData.firstImage.trim()) {
      alert('First image URL is required');
      return;
    }
    if (!formData.secondImage.trim()) {
      alert('Second image URL is required');
      return;
    }
    if (!firstParagraphContent.trim()) {
      alert('First paragraph is required');
      return;
    }
    if (!secondParagraphContent.trim()) {
      alert('Second paragraph is required');
      return;
    }

    const postData = {
      ...formData,
      firstParagraph: firstParagraphContent,
      secondParagraph: secondParagraphContent,
    };

    onSubmit(postData);

    // Reset form
    setFormData({
      title: '',
      firstImage: '',
      secondImage: '',
      firstParagraph: '',
      secondParagraph: '',
      isBlog: false,
      isPublished: false,
    });
    setFirstParagraphContent('');
    setSecondParagraphContent('');
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      title: '',
      firstImage: '',
      secondImage: '',
      firstParagraph: '',
      secondParagraph: '',
      isBlog: false,
      isPublished: false,
    });
    setFirstParagraphContent('');
    setSecondParagraphContent('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new medical news post or blog
            article.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Title */}
          <div className='space-y-2'>
            <Label htmlFor='title'>Title *</Label>
            <Input
              id='title'
              type='text'
              placeholder='Enter post title...'
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          {/* Images */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstImage'>First Image URL *</Label>
              <Input
                id='firstImage'
                type='url'
                placeholder='https://example.com/image1.jpg'
                value={formData.firstImage}
                onChange={(e) =>
                  handleInputChange('firstImage', e.target.value)
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='secondImage'>Second Image URL *</Label>
              <Input
                id='secondImage'
                type='url'
                placeholder='https://example.com/image2.jpg'
                value={formData.secondImage}
                onChange={(e) =>
                  handleInputChange('secondImage', e.target.value)
                }
                required
              />
            </div>
          </div>

          {/* First Paragraph */}
          <div className='space-y-2'>
            <Label htmlFor='firstParagraph'>First Paragraph *</Label>
            <div className='border rounded-md'>
              <RichText
                initialContent={firstParagraphContent}
                onChange={setFirstParagraphContent}
              />
            </div>
          </div>

          {/* Second Paragraph */}
          <div className='space-y-2'>
            <Label htmlFor='secondParagraph'>Second Paragraph *</Label>
            <div className='border rounded-md'>
              <RichText
                initialContent={secondParagraphContent}
                onChange={setSecondParagraphContent}
              />
            </div>
          </div>

          {/* Post Type and Status */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='isBlog'>Post Type</Label>
              <Select
                value={formData.isBlog.toString()}
                onValueChange={(value) =>
                  handleInputChange('isBlog', value === 'true')
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select post type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='false'>Medical News</SelectItem>
                  <SelectItem value='true'>Blog Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='isPublished'>Status</Label>
              <Select
                value={formData.isPublished.toString()}
                onValueChange={(value) =>
                  handleInputChange('isPublished', value === 'true')
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='false'>Draft</SelectItem>
                  <SelectItem value='true'>Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit'>Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
