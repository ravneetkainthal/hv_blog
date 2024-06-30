'use client';
import React, { useState } from 'react';

interface BlogFormProps {
  onSubmit: (title: string, content: string) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Blog</button>
      <style jsx>{`
        div {
          margin-bottom: 1em;
        }
        label {
          display: block;
          margin-bottom: 0.5em;
        }
        input, textarea {
          width: 100%;
          padding: 0.5em;
          margin-bottom: 1em;
        }
      `}</style>
    </form>
  );
};

export default BlogForm;
