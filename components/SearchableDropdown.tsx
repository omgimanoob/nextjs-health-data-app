// components/SearchableDropdown.tsx
"use client";
import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

interface User {
  UserName: string;
  UserID: string;
  DeviceCompany: string;
}

interface SearchableDropdownProps {
  users: User[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (user: User) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(user =>
    user.UserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedUser ? selectedUser.UserName : 'Select a user'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
          />
          {filteredUsers.map(user => (
            <Dropdown.Item
              key={user.UserID}
              onClick={() => handleSelect(user)}
            >
              {user.UserName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchableDropdown;
