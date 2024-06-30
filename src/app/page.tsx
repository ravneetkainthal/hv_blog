 'use client';
import React from 'react';
import Image from 'next/image'; 
import Header from '../components/header';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  return (
    <div className="page-container">
     
      <main>
        <h1>Welcome to Our Blogs</h1>
        <p >Our Blogs is a platform designed to give writers of all kinds a space to share their thoughts,
          ideas, and stories with a broader audience. Whether you're a professional writer looking for a 
          new audience or someone who simply loves to write, our platform provides the perfect space for you 
          to express yourself. Join our community, start sharing your blogs, and connect with readers from 
          all over the world. Here, your words matter.</p>
      </main>
      
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 81vh;
          
        }
        main {
          flex: 1;
          padding: 2rem;
          text-align: center;
          
        }
        .image-container {
          margin-top: 2rem; /* Add margin to separate the image from the heading */
        }
        h1 {
          margin-bottom: 1rem;
        }
          p {
       
          font-family: 'Roboto', sans-serif;
          font-size: 1.2rem;
          color: #333;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
          
        }
      `}</style>
    </div>
  );
}