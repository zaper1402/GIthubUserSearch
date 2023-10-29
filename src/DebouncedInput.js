import React, { useState , useEffect} from 'react';

const DebouncedInput = ({ onInputChange }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        console.log(searchTerm)
        onInputChange(searchTerm)
      }, 3000)
      setInputValue(searchTerm)
      return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name..."
    />
  );
};

export default DebouncedInput;
