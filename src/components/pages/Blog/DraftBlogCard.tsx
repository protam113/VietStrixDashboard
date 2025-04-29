import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '@/components/design/Dialog';
import { useDeleteBlog, useUpdateBlogStatus } from '@/hooks/Blog/useBlog';
import {
  VisibilityOption,
  VisibilitySelect,
} from '@/components/container/VisibilitySelect';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { UserDataComponents } from '@/types/types';

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  file: string;
  createdAt: string | Date;
  content: string;
  user?: UserDataComponents;
  views: number;
}

interface PostCardProps {
  blog: Post;
}

export function DraftBlogCard({ blog }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string>();
  const [visibility, setVisibility] = useState<VisibilityOption>(
    blog.status as VisibilityOption
  );

  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: updateBlogStatus } = useUpdateBlogStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }
    updateBlogStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedBlog(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedBlog) {
      deleteBlog(selectedBlog);
      setSelectedBlog(undefined);
      setDeleteDialogOpen(false);
    }
  };

  const handleVisibilityChange = (newVisibility: VisibilityOption) => {
    // Khi visibility thay đổi, gọi hàm handleStatusChange để cập nhật trạng thái mới
    setVisibility(newVisibility);
    handleStatusChange(blog._id, newVisibility); // Cập nhật trạng thái
  };

  return (
    <>
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
                alt={blog?.user?.name || 'User'}
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {blog?.user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatSmartDate(blog.createdAt)}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            {userInfo?.role?.title === 'admin' && (
              <div className="flex items-center gap-2">
                <VisibilitySelect
                  value={visibility}
                  onChange={handleVisibilityChange}
                />
                <button
                  onClick={() => handleDeleteClick(blog._id)}
                  className="bg-red-100 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-md p-1"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the blog."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
