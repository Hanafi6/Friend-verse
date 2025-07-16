'use client';

import { useState } from 'react';
import { Menu, X, Home, User, LogOut as LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import LogOut from './LogOut';

import '../commponents.css/NavBar.css';
import ToggleThemeButton from './ToggleThemeButton';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>
          <X size={24} />
        </button>


        <ul className="sidebar-links">
          <ToggleThemeButton/>
          <li>
            <Link href="/Routs/home" onClick={closeSidebar}>
              <Home size={16} style={{ marginInlineEnd: 8 }} />
              الصفحة الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/Routs/profile" onClick={closeSidebar}>
              <User size={16} style={{ marginInlineEnd: 8 }} />
              الملف الشخصي
            </Link>
          </li>
          <li>
            <LogOutIcon size={16} style={{ marginInlineEnd: 8 }} />
            <LogOut />
          </li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
}
