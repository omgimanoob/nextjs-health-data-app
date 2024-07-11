// components\SearchNavbar.tsx
import React from 'react';
import { User } from '@/lib/definitions';
import SearchableDatalist from "../components/SearchableDatalist";

interface SearchNavbarProps {
  users: User[];
  placeholder: string;
}

const SearchNavbar: React.FC<SearchNavbarProps> = ({ users, placeholder }) => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between fixed-top">
      <div className="container">
        <a className="navbar-brand">Navbar</a>
        <SearchableDatalist users={users} placeholder={placeholder} />
      </div>
    </nav>
  );
};

export default SearchNavbar;
