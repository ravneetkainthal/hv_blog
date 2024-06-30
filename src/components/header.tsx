'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SearchBar from '../components/Searchbar';

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic here
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header>
      <nav>
        <ul>
        
          {status === 'authenticated' ? (
            <>
             <li>
                <Link href="/dashboard">
                  <button className="navButton">Dashboard</button>
                </Link>
              </li>
              <li>
                <Link href="/create-blog">
                  <button className="navButton">Create Blog</button>
                </Link>
                </li>
              
              <li>
                <button className="navButton" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signin">
                  <button className="navButton">Sign In</button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <button className="navButton">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      
      </nav>
      <style jsx>{`
        header {
          background-color: lightskyblue;
          color: #333;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
        }
        nav {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
        }
        nav ul {
          list-style-type: none;
          display: flex;
          gap: 1rem;
          margin: 0;
        }
        nav ul li {
          display: flex;
          align-items: center;
        }
        .navButton {
          padding: 0.5rem 1rem;
          background-color: teal;
          color: white;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          text-align: center;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }
        .navButton:hover {
          background-color: #218838;
        }
          .navbar-brand {
          font-weight: bold;
        }
        .nav-link {
          padding: 0.5rem 1rem;
          color: #000;
        }
        .nav-link:hover {
          color: #fff;
          background-color: #218838;
          border-radius: 4px;
      `}</style>
    </header>
  );
};

export default Header;

