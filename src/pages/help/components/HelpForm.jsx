import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { t } from 'i18next';
import { useState } from 'react';

function HelpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Card className='h-fit py-0'>
      <CardHeader className='bg-primary text-white rounded-t-xl py-4'>
        <CardTitle className='text-2xl'>{t('help.form.title')}</CardTitle>
        <CardDescription className='text-primary-foreground'>
          {t('help.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='name'>{t('help.form.name')}</Label>
            <Input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('help.form.namePlaceholder')}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>{t('help.form.email')}</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('help.form.emailPlaceholder')}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subject'>{t('help.form.subject')}</Label>
            <Input
              id='subject'
              name='subject'
              type='text'
              value={formData.subject}
              onChange={handleInputChange}
              placeholder={t('help.form.subjectPlaceholder')}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='message'>{t('help.form.message')}</Label>
            <Textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t('help.form.messagePlaceholder')}
              rows={4}
              required
            />
          </div>

          <Button type='submit' className='w-full'>
            {t('help.form.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default HelpForm;
