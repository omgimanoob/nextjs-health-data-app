// components/SearchableDatalist.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/definitions';

interface SearchableDatalistProps {
  users: User[];
  placeholder: string;
}

const SearchableDatalist: React.FC<SearchableDatalistProps> = ({ users, placeholder }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();
  
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setInputValue(selectedValue);
    const user = users.find(u => u.UserName === selectedValue);
    setSelectedUser(user || null);
    console.log(user)
    if (user) {
      const encodedUserID = encodeURIComponent(user.UserID);
      router.push(`/user/${encodedUserID}`);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setSelectedUser(null);
  };

  return (
    <div className="form-group position-relative">
      <input
        list="userOptions"
        id="userDatalist"
        className="form-control"
        value={inputValue}
        onChange={handleSelect}
        placeholder={placeholder}
      />
      <datalist id="userOptions">
        {users.map(user => (
          <option key={user.UserID} value={user.UserName}>
            {user.DeviceCompany} - {user.UserID}
          </option>
        ))}
      </datalist>
      {inputValue && (
        <div onClick={clearInput} className="position-absolute rounded-full cursor-pointer d-flex align-items-center justify-content-center" 
        style={{ width: '30px', height: '30px', top:'50%', right:'0.2em', transform:'translateY(-50%)' }}>
          <svg className="w-5 h-5 text-blue-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ccc">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </div>
      )}
      {/* {selectedUser && (
        <div className="mt-3">
          <h5>Selected User:</h5>
          <p>Name: {selectedUser.UserName}</p>
          <p>UserID: {selectedUser.UserID}</p>
          <p>Device Company: {selectedUser.DeviceCompany}</p>
        </div>
      )} */}
    </div>
  );
};

export default SearchableDatalist;
