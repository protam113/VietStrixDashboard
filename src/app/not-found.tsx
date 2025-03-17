'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <motion.span
            className="text-[80px] md:text-[120px] font-bold text-[#0a2240]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5 }}
          >
            4
          </motion.span>

          <motion.div
            className="mx-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? [0.8, 1.1, 1] : 0.8,
            }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.span
              className="text-[80px] md:text-[120px] font-bold text-[#0a2240]"
              animate={{
                scaleX: isVisible ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 1.5,
              }}
            >
              {'{'}
            </motion.span>
            <motion.span
              className="text-[80px] md:text-[120px] font-bold text-[#0a2240]"
              animate={{
                scaleX: isVisible ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 1.5,
              }}
            >
              {'}'}
            </motion.span>
          </motion.div>

          <motion.span
            className="text-[80px] md:text-[120px] font-bold text-[#0a2240]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            4
          </motion.span>
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-xl font-semibold">OOPS!</p>
          <div className="w-8 h-0.5 bg-gray-300 mx-auto my-3"></div>
          <p className="text-gray-500 mb-2">SOMETHING WENT WRONG</p>
          <Link href="/" className="group inline-flex items-center">
            <span className="text-gray-500">GO BACK TO </span>
            <motion.span
              className="text-[#2cb1bc] font-medium ml-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              HOME
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
