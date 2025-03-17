import { Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-white py-4 px-2 shadow-md">
      <span className="text-sm text-gray-500 text-center flex items-center gap-1">
        <p>Copyright</p>
        <Copyright className="h-4 w-4" />
        {new Date().getFullYear()}
        <a href="https://vietstrix.com/" className="hover:underline px-1">
          VietStrix
        </a>
        . All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
