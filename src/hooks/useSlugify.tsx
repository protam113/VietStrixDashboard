import { useState } from 'react';
import slugify from 'slugify';

// Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str: string) => {
  const vietnameseMap: { [key: string]: string } = {
    á: 'a',
    à: 'a',
    ả: 'a',
    ã: 'a',
    ạ: 'a',
    ă: 'a',
    ắ: 'a',
    ằ: 'a',
    ẳ: 'a',
    ẵ: 'a',
    ặ: 'a',
    â: 'a',
    ấ: 'a',
    ầ: 'a',
    ẩ: 'a',
    ẫ: 'a',
    ậ: 'a',
    é: 'e',
    è: 'e',
    ẻ: 'e',
    ẽ: 'e',
    ẹ: 'e',
    ê: 'e',
    ế: 'e',
    ề: 'e',
    ể: 'e',
    ễ: 'e',
    ệ: 'e',
    í: 'i',
    ì: 'i',
    ỉ: 'i',
    ĩ: 'i',
    ị: 'i',
    ó: 'o',
    ò: 'o',
    ỏ: 'o',
    õ: 'o',
    ọ: 'o',
    ô: 'o',
    ố: 'o',
    ồ: 'o',
    ổ: 'o',
    ỗ: 'o',
    ộ: 'o',
    ơ: 'o',
    ớ: 'o',
    ờ: 'o',
    ở: 'o',
    ỡ: 'o',
    ợ: 'o',
    ú: 'u',
    ù: 'u',
    ủ: 'u',
    ũ: 'u',
    ụ: 'u',
    ư: 'u',
    ứ: 'u',
    ừ: 'u',
    ử: 'u',
    ữ: 'u',
    ự: 'u',
    ý: 'y',
    ỳ: 'y',
    ỷ: 'y',
    ỹ: 'y',
    ỵ: 'y',
    đ: 'd',
    ' ': '-',
  };

  return str
    .toLowerCase() // ✅ Đảm bảo toàn bộ chuỗi về chữ thường trước khi thay thế
    .split('')
    .map((char) => vietnameseMap[char] || char)
    .join('');
};

function useSlugify() {
  const [slug, setSlug] = useState('');

  const toSlug = (input: string) => {
    const noTonesInput = removeVietnameseTones(input); // Loại bỏ dấu tiếng Việt
    const result = slugify(noTonesInput, {
      lower: true, // Chuyển sang chữ thường
      remove: /[^a-z0-9\s-]/g, // Loại bỏ ký tự không hợp lệ
    });
    setSlug(result); // Không cần replace vì slugify đã tự động thay thế dấu cách thành "-"
  };

  return {
    slug,
    toSlug,
  };
}

export default useSlugify;
