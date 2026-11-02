import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Card({ title, description, image }) {
  return (
    <div className={cn('rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow', 'bg-white dark:bg-gray-800') }>
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
