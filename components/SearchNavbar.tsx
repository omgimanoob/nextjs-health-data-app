//  components\SearchNavbar.tsx
"use client";
import React from 'react';
import SearchableDatalist from '../components/SearchableDatalist';

interface User {
  UserName: string;
  UserID: string;
  DeviceCompany: string;
}


interface SearchableDatalistProps {
  users: User[];
  placeholder : string;
}

const SearchNavbar: React.FC<SearchableDatalistProps> = ({users, placeholder}) => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between fixed-top">
       <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
              <SearchableDatalist
          users={users}
          placeholder={placeholder}
        />
      </div>
    </nav>
  );
};

export default SearchNavbar;