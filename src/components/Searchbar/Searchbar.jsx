import { useState  } from 'react';
import { toast } from 'react-toastify';


function Searchbar({ onHandleSubmit }) {
    const [query, setQuery] = useState('');
  
    const onSubmit = e => {
      e.preventDefault();
      if (query.trim() === '') {
        return toast.info('😱 Please enter a value for search images!');
      }
      onHandleSubmit(query);
      setQuery('');
    };
  
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={onSubmit}>
                    <input
                        className="SearchForm-input"
                        type="text"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search image"
                        onChange={({ target }) => setQuery(target.value)}
                    />
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                </form>
            </header>
        );
}

export default Searchbar;