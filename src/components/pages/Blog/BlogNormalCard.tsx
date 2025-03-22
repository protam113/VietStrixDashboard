import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  //   categories: string;
  type: string;
  //   image: string;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogNormalCard({ blog }: BlogCardProps) {
  return (
    <Link href="#" className="block">
      <div className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:z-10">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {/* <Image
            src={
              blog.image.startsWith('/')
                ? blog.image
                : `/placeholder.svg?height=400&width=300`
            }
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          /> */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="text-white text-xs font-medium">{blog.type}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
          {/* <p className="text-sm text-gray-500">{blog.categories}</p> */}
        </div>
      </div>
    </Link>
  );
}
