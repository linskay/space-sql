import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  // Не показываем хедер на главной странице
  if (location.pathname === '/') return null;
  
  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="logo-link">Space SQL</Link>
        <div className="nav-links">
          <Link to="/lessons" className={location.pathname.startsWith('/lessons') ? 'active' : ''}>
            Уроки
          </Link>
          <Link to="/practice" className={location.pathname === '/practice' ? 'active' : ''}>
            Практика
          </Link>
        </div>
      </nav>
    </header>
  );
}
