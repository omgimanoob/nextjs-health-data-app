// components/SearchableDatalist.tsx
"use client";
import React, { useState } from 'react';

interface User {
  UserName: string;
  UserID: string;
  DeviceCompany: string;
}

interface SearchableDatalistProps {
  users: User[];
  placeholder : string;
}

const SearchableDatalist: React.FC<SearchableDatalistProps> = ({ users, placeholder }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const user = users.find(u => u.UserName === selectedValue);
    setSelectedUser(user || null);
  };

  return (
    <div className="form-group">
      <input
        list="userOptions"
        id="userDatalist"
        className="form-control"
        onChange={handleSelect}
        placeholder={placeholder}
      />
      <datalist id="userOptions">
        {users.map(user => (
          <option key={user.UserID} value={user.UserName}>
            {user.UserName} - {user.DeviceCompany}
          </option>
        ))}
      </datalist>
      {selectedUser && (
        <div className="mt-3">
          <h5>Selected User:</h5>
          <p>Name: {selectedUser.UserName}</p>
          <p>UserID: {selectedUser.UserID}</p>
          <p>Device Company: {selectedUser.DeviceCompany}</p>
        </div>
      )}
    </div>
  );
};

export default SearchableDatalist;
