import { useState } from "react";
import style from './Searchbar.module.css'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

function SearchBar({ searchTerm, onChange }){
    const [search, setSearch] = useState(searchTerm);

    const SearchButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        width: '10rem',
        lineHeight: 1.5,
        backgroundColor: '#E7473C',
        color: '#F0F0F0',
        '&:hover': {
          backgroundColor: '#E7473C',
          boxShadow: 'none',
        }
      });

    return(
        <div className={style.main}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <SearchButton onClick={() => onChange(search)}>Search</SearchButton>
        </div>
    )
}

export default SearchBar