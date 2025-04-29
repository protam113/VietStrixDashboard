import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Pen, Trash } from 'lucide-react';
import { useDeleteService } from '@/hooks/service/useService';
import { useState } from 'react';
import ConfirmDialog from '@/components/design/Dialog';
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

export function ServiceCard({ post }: PostCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const { mutate: deleteService } = useDeleteService();

  const handleDeleteClick = (id: string) => {
    setSelectedService(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      deleteService(selectedService);
      setSelectedService(undefined);
      setDeleteDialogOpen(false);
    }
  };
  return (
    <>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <Link href={`/admin/service/${post.slug}`}>
          <div className="relative h-48">
            <Image
              src={post.file || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
            />

            {/* Price badge - left top */}
            <Badge className="absolute top-3 left-3 bg-lime-400 text-gray-800 text-md font-bold hover:bg-lime-600">
              ${post.price}
            </Badge>

            {/* Status badge - right top */}
            <Badge className="absolute top-3 right-3 bg-gray-600 text-white text-md font-bold">
              {post.status}
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
              <span>{post.views} views read</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          </Link>
          <div className="flex items-start justify-between w-full">
            {/* Avatar + Info */}
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

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                // onClick={() => handleEdit(post._id)}
                className="bg-blue-100 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-md p-1"
              >
                <Pen className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteClick(post._id)}
                className="bg-red-100 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-md p-1"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the service."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
