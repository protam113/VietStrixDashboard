import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { useUpdateServiceStatus } from '@/hooks/service/useService';
import { toast } from 'sonner';
import { VisibilityOption } from '@/components/container/VisibilitySelect';
import { VisibilityChange } from '@/components/container/ChangeToShow';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { UserDataComponents } from '@/types/types';

interface Post {
  _id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  file: string;
  createdAt: string;
  content: string;
  user?: UserDataComponents;
  views: number;
}

interface PostCardProps {
  post: Post;
}

export function PopularServiceCard({ post }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [visibility, setVisibility] = useState<VisibilityOption>(
    post.status as VisibilityOption
  );

  const { mutate: updateServiceStatus } = useUpdateServiceStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateServiceStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleVisibilityChange = (newVisibility: VisibilityOption) => {
    // Khi visibility thay đổi, gọi hàm handleStatusChange để cập nhật trạng thái mới
    setVisibility(newVisibility);
    handleStatusChange(post._id, newVisibility); // Cập nhật trạng thái
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <Link href={`/admin/service/${post.slug}`}>
        <div className="relative h-48">
          <Image
            src={post.file || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-lime-400 text-gray-800 text-md font-bold hover:bg-lime-600">
            ${post.price}
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/admin/service/${post.slug}`}>
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
            <span>{post.views} views read</span>{' '}
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          <div className="flex items-center gap-2">
            <Image
              src={'/logo.png'}
              alt={post?.user?.username || 'User'}
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {post?.user?.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatSmartDate(post.createdAt)}
              </p>
            </div>
          </div>
        </Link>
        {userInfo?.role.title === 'admin' && (
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
  );
}
