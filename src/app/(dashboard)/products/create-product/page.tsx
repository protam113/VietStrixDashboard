'use client';

import BackButton from '@/components/button/BackButton';
import Container from '@/components/container/Container';
import Heading from '@/components/heading/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateProduct } from '@/hooks/Product/useProduct';
import React, { useState } from 'react';
import { CreateProductItem } from '@/types/types';
import { toast } from 'sonner';
import CategoryList from '@/components/pages/products/create_product/categoryList';
import ImageUploader from '@/components/pages/products/create_product/uploadImage';

const Page = () => {
  const { mutate: createProduct } = useCreateProduct();
  const [blogData, setBlogData] = useState<CreateProductItem>({
    title: '',
    description: '',
    price: 0,
    categories: [],
    files: [], // Khởi tạo là mảng rỗng thay vì null để tránh lỗi
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [, setCategoryInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;

    if (title === 'categories') {
      setCategoryInput(value);
    } else {
      setBlogData({ ...blogData, [title]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setBlogData((prevData) => ({
        ...prevData,
        files: Array.from(files),
      }));
    } else {
      setBlogData((prevData) => ({
        ...prevData,
        files: [],
      }));
    }
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...blogData.categories];
    updatedCategories.splice(index, 1);
    setBlogData({ ...blogData, categories: updatedCategories });
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    try {
      const productDataToSend: CreateProductItem = {
        ...blogData,
        price: blogData.price ? Number(blogData.price) : 0,
      };
      createProduct(productDataToSend);
      setBlogData({
        title: '',
        description: '',
        price: 0,
        categories: [],
        files: [],
        link: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error creating product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackButton />
      <Heading name="Create Product" desc="Create a new product" />

      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="mt-4">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter product title"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
            required
            placeholder="Enter product description"
          />

          <div className="mt-4">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={blogData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
            />
          </div>
          <div className="mt-4">
            <Label>Categories</Label>
            <div className="flex flex-col gap-2">
              <div className="mb-4">
                <CategoryList
                  onSelectCategories={(selected) =>
                    setBlogData({ ...blogData, categories: selected })
                  }
                />
              </div>
            </div>
          </div>
          {blogData.categories.length > 0 && (
            <div className="mt-2 p-2 border rounded">
              <p className="text-sm mb-2">Added Categories:</p>
              <div className="flex flex-wrap gap-2">
                {blogData.categories.map((cat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 py-1 px-2 rounded"
                  >
                    <span className="text-sm">{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(index)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4">
            <Label className="Font-bold">Files</Label>
            <ImageUploader />
          </div>

          <div className="mt-4">
            <Label>Link</Label>
            <Input
              type="text"
              name="link"
              value={blogData.link}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button onClick={handleCreateProduct} disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </main>
    </Container>
  );
};

export default Page;
