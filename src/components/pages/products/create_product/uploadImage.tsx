'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { X, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ImageItem } from '@/types/types';
// Define types for the files
type FileOrUrl = File | string;

interface ImageUploaderProps {
  onChange?: (files: File[]) => void; // Changed to only return File[] to match expectation
  currentFiles?: FileOrUrl[] | null;
  resetTrigger?: boolean;
}

export default function ImageUploader({
  onChange,
  currentFiles = [],
  resetTrigger,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<ImageItem[]>([]);
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFileSize = 20; // MB

  useEffect(() => {
    if (resetTrigger) {
      setFiles([]); // Reset files khi trigger thay đổi
    }
  }, [resetTrigger]);

  const processedRef = useRef(false);

  useEffect(() => {
    if (!currentFiles || currentFiles.length === 0) {
      return;
    }

    if (!processedRef.current) {
      processedRef.current = true;
      const fileItems = currentFiles.map((file) => ({
        file,
        preview: file instanceof File ? URL.createObjectURL(file) : file,
        id: crypto.randomUUID(),
        name:
          file instanceof File ? file.name : file.split('/').pop() || 'image',
        size: file instanceof File ? file.size : 0,
        type: file instanceof File ? file.type : 'image/*',
      }));

      setFiles(fileItems);
    }
  }, [currentFiles]);

  // Notify parent component when files change - but only when files actually change
  useEffect(() => {
    if (onChange && files.length > 0) {
      const fileObjects = files
        .map((item) => item.file)
        .filter((file): file is File => file instanceof File);

      if (
        JSON.stringify(fileObjects) !==
        JSON.stringify(
          currentFiles?.filter((file): file is File => file instanceof File)
        )
      ) {
        onChange(fileObjects);
      }
    }
  }, [files, onChange, currentFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles];
      return updatedFiles.length !== prev.length ? updatedFiles : prev;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);

      const newFiles = droppedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return (
        <div className="w-8 h-8 bg-orange-100 text-orange-500 flex items-center justify-center rounded">
          📷
        </div>
      );
    }

    return (
      <div className="w-8 h-8 bg-gray-100 text-gray-500 flex items-center justify-center rounded">
        📁
      </div>
    );
  };

  return (
    <div className="w-full max-w-md ">
      <Card className="p-4">
        <h2 className="text-lg font-medium mb-4">Upload Files</h2>

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600">
              Drag & drop or click to choose files
            </p>
            <p className="text-xs text-gray-500">
              Max file size: {maxFileSize} MB
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(fileItem.name)}
                  <div>
                    <p
                      className="text-sm font-medium"
                      onClick={() => setPreviewOpen(fileItem.id)}
                    >
                      {fileItem.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileItem.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPreviewOpen(fileItem.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFile(fileItem.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 flex items-center gap-1"
                onClick={() => setFiles([])}
              >
                <X className="h-3 w-3" />
                Remove all files
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Image Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewOpen(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white z-10 rounded-full"
              onClick={() => setPreviewOpen(null)}
            >
              <X className="h-4 w-4" />
            </Button>

            {files
              .find((f) => f.id === previewOpen)
              ?.type.startsWith('image/') ? (
              <Image
                src={
                  files.find((f) => f.id === previewOpen)?.preview ||
                  '/placeholder.svg'
                }
                alt="Preview"
                width={600}
                height={400}
                className="max-w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div className="p-8 text-center">
                <p className="text-lg font-medium">
                  {files.find((f) => f.id === previewOpen)?.name}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This file type cannot be previewed
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
