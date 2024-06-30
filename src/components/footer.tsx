import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Our Blogs. All Rights Reserved.</p>
      <style jsx>{`
        footer {
          background-color: skyblue;
          color: #333;
          padding: 1rem;
          text-align: center;
          margin-top: auto;
          border-top: 1px solid #ddd;
        }
        p {
          margin: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
