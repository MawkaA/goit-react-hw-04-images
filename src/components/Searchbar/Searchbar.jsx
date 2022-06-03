import { useState  } from 'react';



function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('');
  
    const handleSubmit= e => {
      e.preventDefault();
      if (query.trim() === '') {
        return alert('Please enter a value for search images!');
      }
      onSubmit(query);
      setQuery('');
    };
    const handleChange = e => {
        const { value } = e.target;
    
        setQuery(value);
      };
  
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <input
                        className="SearchForm-input"
                        type="text"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search image"
                        onChange={handleChange}
                    />
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                </form>
            </header>
        );
}

export default Searchbar;