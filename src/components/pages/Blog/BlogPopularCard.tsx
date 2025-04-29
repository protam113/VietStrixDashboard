import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { VisibilityChange } from '@/components/container/ChangeToShow';
import { VisibilityOption } from '@/components/container/VisibilitySelect';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUpdateBlogStatus } from '@/hooks/Blog/useBlog';
import { useAuthStore } from '@/store/authStore';
import { UserDataComponents } from '@/types/types';

interface Blog {
  _id: string;
  title: string;
  //   categories: string;
  status: string;
  slug: string;
  file: string;
  views: number;
  createdAt: string | Date;
  content: string;
  user?: UserDataComponents;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogPopularCard({ blog }: BlogCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [visibility, setVisibility] = useState<VisibilityOption>(
    blog.status as VisibilityOption
  );

  const { mutate: updateStatus } = useUpdateBlogStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleVisibilityChange = (newVisibility: VisibilityOption) => {
    // Khi visibility thay đổi, gọi hàm handleStatusChange để cập nhật trạng thái mới
    setVisibility(newVisibility);
    handleStatusChange(blog._id, newVisibility); // Cập nhật trạng thái
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <Link href={`/admin/blog/${blog.slug}`}>
        <div className="relative h-48">
          <Image
            src={blog.file || '/placeholder.svg'}
            alt={blog.title}
            fill
            className="object-cover"
          />

          {/* Status badge - right top */}
          <Badge className="absolute top-3 right-3 bg-gray-600 text-white text-md font-bold">
            {blog.status}
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/admin/service/${blog.slug}`}>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{blog.views} views read</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{blog.content}</p>
        </Link>
        <div className="flex items-start justify-between w-full">
          {/* Avatar + Info */}
          <div className="flex items-center gap-2">
            <Image
              src={'/logo.png'}
              alt={blog?.user?.username || 'User'}
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {blog?.user?.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatSmartDate(blog.createdAt)}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          {userInfo?.role?.title === 'admin' && (
            <div className="flex items-center gap-2 mt-4 self-end sm:self-auto">
              <VisibilityChange
                label={`Change to ${visibility === 'show' ? 'Hide' : 'Show'}`}
                value={visibility === 'show' ? 'hide' : 'show'}
                onChange={handleVisibilityChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
