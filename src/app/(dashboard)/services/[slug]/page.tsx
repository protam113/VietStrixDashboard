'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import NoResultsFound from '@/components/design/NoResultsFound';
import Container from '@/components/container/Container';
import { formatDistanceToNow, format, differenceInHours } from 'date-fns';
import { ServiceDetailData } from '@/lib/data/serviceLib';
import BackButton from '@/components/button/BackButton';
import { CodeBlockComponent } from '@/components/richText/ContentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { service, isLoading, isError } = ServiceDetailData(blogSlug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <Container>
      <article className="mx-auto max-w-7xl">
        <BackButton />
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            {service?.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between text-sm text-gray-600 mb-8">
            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED BY
              </span>
              <p>HUST4L</p>
            </div>

            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                PRICE
              </span>
              <p className="font-bold text-lime-500 text-xl">
                {service?.price}
              </p>
            </div>

            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                VIEWS
              </span>
              <p className="font-bold text-lime-500 text-xl">
                {service?.views}
              </p>
            </div>

            <div>
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED ON
              </span>
              <p>
                {(() => {
                  if (!service?.createdAt) return '-';

                  const date = new Date(service.createdAt);
                  if (isNaN(date.getTime())) return '-';

                  const hoursAgo = differenceInHours(new Date(), date);

                  if (hoursAgo < 1) {
                    return formatDistanceToNow(date, { addSuffix: true });
                  } else if (hoursAgo < 24) {
                    return `${hoursAgo}h ago`;
                  } else {
                    return format(date, 'yyyy/MM/dd');
                  }
                })()}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={service?.file || 'Default image'}
            alt={`Featured image for ${service?.title}`}
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">{service?.content}</h2>

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
            {service?.description}
          </ReactMarkdown>
        </div>
      </article>
    </Container>
  );
}
