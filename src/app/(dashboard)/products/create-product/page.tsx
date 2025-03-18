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
  const [productData, setProductData] = useState<CreateProductItem>({
    title: '',
    description: '',
    price: '',
    categories: [],
    link: '',
    files: [],
  });

  const [loading, setLoading] = useState(false);
  const [resetImages, setResetImages] = useState(false);

  const handleCategoryChange = (checkedValues: string[]) => {
    setProductData((prevData) => ({ ...prevData, categories: checkedValues }));
  };

  const handleImageChange = (files: File[]) => {
    console.log('Uploaded Files:', files);
    setProductData((prevData) => ({
      ...prevData,
      files: files.length > 0 ? files : [],
    }));
  };

  const handleCreateProduct = async () => {
    console.log('Final Product Data:', productData);
    setLoading(true);
    try {
      if (productData.title.trim() === '') {
        toast.error('Title is required');
        setLoading(false);
        return;
      }

      const productDataToSend: CreateProductItem = {
        ...productData,
      };

      createProduct(productDataToSend);

      // Reset state mà không gây re-render liên tục
      setProductData({
        title: '',
        description: '',
        price: '',
        categories: [],
        link: '',
        files: [],
      });

      setResetImages((prev) => !prev);
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
      <div className="flex">
        <Heading name="Create Product" desc="Create a new product" />
        <Button onClick={handleCreateProduct} disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
      <form className="flex flex-col space-y-4">
        {/* Title */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Title</Label>
          <Input
            type="text"
            name="title"
            value={productData.title}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
            required
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Description</Label>
          <Input
            type="text"
            name="description"
            value={productData.description}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
            required
            placeholder="Enter product description"
          />
        </div>

        {/* Link */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Link</Label>
          <Input
            type="text"
            name="link"
            value={productData.link}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                link: e.target.value,
              }))
            }
            required
            placeholder="Enter product link"
          />
        </div>

        {/* Price */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Price</Label>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={(e) =>
              setProductData((prevData) => ({
                ...prevData,
                price: e.target.value,
              }))
            }
            step="1"
            min="0"
          />
        </div>

        {/* Files */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Files</Label>
          <ImageUploader
            onChange={handleImageChange}
            currentFiles={productData.files || []}
            resetTrigger={resetImages}
          />
        </div>

        {/* Categories */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Categories</Label>
          <div className="flex flex-col gap-2">
            <div className="mb-4">
              <CategoryList onSelectCategories={handleCategoryChange} />
            </div>
          </div>

          {/* {blogData.categories.length > 0 && (
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
          )} */}
        </div>
      </form>
    </Container>
  );
};

export default Page;
