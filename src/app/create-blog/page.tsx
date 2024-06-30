'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateBlog: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated' && session?.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        author: session.user?.name || '',
      }));
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/blogs', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError('Failed to create blog post');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Create a New Blog Post</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Content:
            <textarea name="content" value={formData.content} onChange={handleChange} />
          </label>
          <button type="submit">Create Blog Post</button>
        </form>
      </div>
     
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow-x: hidden;
          align-items: center; /* Ensure content is centered */
        }
        .content-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          background-color: #f0f0f0;
          padding: 2rem;
          box-sizing: border-box;
          width: 100%;
          max-width: 100vw; /* Ensure it doesn't exceed viewport width */
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 600px;
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        label {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        input,
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1rem;
          margin-bottom: 1rem;
          transition: border-color 0.3s;
        }
        input:focus,
        textarea:focus {
          border-color: #0070f3;
        }
        button {
          padding: 0.75rem 1.5rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005bb5;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 1rem;
        }
        footer {
          background-color: #f8f9fa;
          color: #333;
          padding: 1rem;
          text-align: center;
          border-top: 1px solid #ddd;
          width: 100%;
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;
