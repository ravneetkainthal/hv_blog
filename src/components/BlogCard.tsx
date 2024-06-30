// src/components/BlogCard.tsx
import React from 'react';
import { BlogProps } from '@/types';

const BlogCard: React.FC<BlogProps> = ({ _id, title, content, author, createdAt }) => {
  return (
    <div key={_id} className="blog-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <p><em>by {author}</em></p>
      <p><small>{new Date(createdAt).toLocaleDateString()}</small></p>
      <style jsx>{`
        .blog-card {
          background: linear-gradient(135deg, #f3e5f5, #e1f5fe);
          color: #333;
          border: 1px solid #ddd;
          padding: 1.5rem;
          margin: 1rem 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .blog-card:hover {
          transform: translateY(-5px);
        }
        h2 {
          margin-top: 0;
        }
        p {
          margin: 0.5rem 0;
        }
        em {
          font-style: italic;
          color: #555;
        }
        small {
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default BlogCard;



// 'use client';
// import React from 'react';

// interface BlogCardProps {
//   _id: string;
//   title: string;
//   content: string;
//   author: string;
// }

// const BlogCard: React.FC<BlogCardProps> = ({ _id, title, content, author }) => {
//   return (
//     <div className="blog-card" id={_id}>
//       <h2>{title}</h2>
//       <p>{content}</p>
//       <p><small>By {author}</small></p>
//       <style jsx>{`
//         .blog-card {
//           border: 1px solid #ddd;
//           padding: 1em;
//           margin: 1em 0;
//           border-radius: 4px;
//           background: #fff;
//         }
//         h2 {
//           margin-bottom: 0.5em;
//         }
//         p {
//           margin-bottom: 0.5em;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BlogCard;
