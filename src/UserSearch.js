// src/UserSearch.js

import React, { useState } from 'react';
import DebouncedInput from './DebouncedInput';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [empty, setEmpty] = useState(null);
  
    const searchUsers = async (value) => {
      setQuery(value);
      setError(null); // Reset error state
      if(value.length === 0){
        setEmpty(true)
        setLoading(false);
        setResults([]);
        return
      }else {
        setEmpty(false)
        setLoading(true);
      }

  // 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
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${value}&sort=followers`, {
          headers: {
            'Authorization': 'Bearer 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',
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.items) {

          for(let i=0;i<data.items.length;i++){
            const fresponse = await fetch(data.items[i].followers_url, {
              headers: {
                'Authorization': 'Bearer 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',
              }
            });
            if (!fresponse.ok) {
            throw new Error(`HTTP error! status fresp: ${fresponse.status}`);
            }
            const fdata = await fresponse.json();
            const usersWithFollowersCount = fdata.length;
            data.items[i]["followers"] = usersWithFollowersCount;
          }
            
          setResults(data.items);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.'); // Set error message
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
         <DebouncedInput onInputChange={searchUsers} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="2">{error}</td>
              </tr>
            )}
            {!loading && !error && results.map(user => (
              <tr key={user.id} >
                <td class="table-row">
                  <img src={user.avatar_url} alt="Avatar"  class="circular-image"/>
                  <span class="user-name">{user.login}</span></td>
                <td>{user.followers}</td>
              </tr>
            ))}
            {!loading && !error && (results.length === 0 || empty) && (
              <tr>
                <td colSpan="2">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserSearch;