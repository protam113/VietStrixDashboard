'use client';

import { SeoList } from '@/lib/data/seoLib';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UpdateSeo } from '@/types/types';
import { useUpdateSeo } from '@/hooks/SEO/useSeo';

export function SeoSettingsForm() {
  const [seoData, setSeoData] = useState<UpdateSeo>({
    site_title: '',
    site_description: '',
    domain: 'hust4l.com',
    keywords: [],
    google_analytics_id: '',
    gtm_id: '',
    facebook_pixel_id: '',
    search_console_verification: '',
  });

  const { seo, isLoading, isError } = SeoList(0);
  const { mutate: updateSeo } = useUpdateSeo();
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (seo && JSON.stringify(seo) !== JSON.stringify(seoData)) {
      const safeSeo = seo as UpdateSeo;
      setSeoData({
        site_title: safeSeo.site_title || '',
        site_description: safeSeo.site_description || '',
        domain: safeSeo.domain || 'hust4l.com',
        keywords: safeSeo.keywords || [],
        google_analytics_id: safeSeo.google_analytics_id || '',
        gtm_id: safeSeo.gtm_id || '',
        facebook_pixel_id: safeSeo.facebook_pixel_id || '',
        search_console_verification: safeSeo.search_console_verification || '',
      });
    }
  }, [seo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() === '') return;
    setSeoData((prev) => ({
      ...prev,
      keywords: [...(prev.keywords ?? []), newKeyword.trim()],
    }));
    setNewKeyword('');
  };

  const removeKeyword = (keywordToRemove: string) => {
    setSeoData((prev) => ({
      ...prev,
      keywords: (prev.keywords ?? []).filter(
        (keyword) => keyword !== keywordToRemove
      ),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo({ updateSeo: seoData });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading SEO settings...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load SEO settings.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>
            Manage your website&apos;s SEO configuration and tracking IDs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Site Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  name="site_title"
                  value={seoData.site_title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  name="domain"
                  value={seoData.domain}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                name="site_description"
                value={seoData.site_description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Keywords</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {seoData.keywords?.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 rounded-full hover:bg-muted"
                    aria-label={`Remove ${keyword}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="new-keyword"
                placeholder="Add a keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addKeyword}
                variant="outline"
                size="icon"
                aria-label="Add keyword"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tracking IDs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  name="google_analytics_id"
                  value={seoData.google_analytics_id}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gtm_id">Google Tag Manager ID</Label>
                <Input
                  id="gtm_id"
                  name="gtm_id"
                  value={seoData.gtm_id}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  name="facebook_pixel_id"
                  value={seoData.facebook_pixel_id}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="search_console_verification">
                  Search Console Verification
                </Label>
                <Input
                  id="search_console_verification"
                  name="search_console_verification"
                  value={seoData.search_console_verification}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="ml-auto bg-lime-500 hover:bg-lime-700"
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
