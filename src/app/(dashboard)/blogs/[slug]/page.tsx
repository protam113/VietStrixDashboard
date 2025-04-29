'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { parseISO, format } from 'date-fns';
import BackButton from '@/components/button/BackButton';
import { BlogDetailData } from '@/lib/data/blogLib';
import remarkGfm from 'remark-gfm';
import { CodeBlockComponent } from '@/components/richText/ContentSection';
import ReactMarkdown from 'react-markdown';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-96">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const { blog, isLoading, isError } = BlogDetailData(blogSlug, 0);

  // Kiểm tra nếu blog là undefined
  if (isLoading) return <LoadingSpinner />;
  if (isError || !blog) return <p className="text-red-500">Blog not found.</p>; // Kiểm tra thêm trường hợp blog undefined

  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
            <p className="text-gray-600 mb-6">{blog.category.name}</p>

            <p className="text-gray-600 mb-6">{blog?.content}</p>
          </div>
          <div className="mb-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={blog.file || '/placeholder.svg?height=400&width=800'}
                alt="Blog feature image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo.png?height=50&width=50"
                alt="Author avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Hust4L</p>
                <p className="text-sm text-gray-500">
                  {/* Kiểm tra nếu createdAt có giá trị hợp lệ */}
                  {blog.createdAt
                    ? format(parseISO(blog.createdAt), 'dd/MM/yyyy')
                    : 'No date available'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: ({ children }) => (
                  <blockquote className="custom-blockquote">
                    {children}
                  </blockquote>
                ),
                code: ({ inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');

                  if (!inline) {
                    return (
                      <CodeBlockComponent
                        value={String(children).replace(/\n$/, '')}
                        language={match ? match[1] : undefined}
                      />
                    );
                  }

                  return (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
