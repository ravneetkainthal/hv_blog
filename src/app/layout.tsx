'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/header';
import Footer from '@/components/footer';


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
          <style jsx>{`
            header {
              background: #333;
              color: #fff;
              padding: 1em 0;
            }
            nav ul {
              list-style: none;
              display: flex;
              justify-content: space-around;
            }
            nav a {
              color: #fff;
              text-decoration: none;
            }
            footer {
              background: #333;
              color: #fff;
              text-align: center;
              padding: 1em 0;
              position: fixed;
              bottom: 0;
              width: 100%;
            }
          `}</style>
        </body>
      </html>
    </SessionProvider>
  );
}

export default RootLayout;

