import { useState } from 'react';
import styles from './Sidebar.module.css'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

function Sidebar({ maxPrice, minPrice, onChange }){
    const [max, setMax] = useState(maxPrice);
    const [min, setMin] = useState(minPrice);

    const SearchButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        width: '100%',
        lineHeight: 1.5,
        backgroundColor: '#E7473C',
        color: '#F0F0F0',
        '&:hover': {
          backgroundColor: '#E7473C',
          boxShadow: 'none',
        }
      });


    return(
        <div className={styles.main}>
            <div className={styles.section}>
                <h5>Price</h5>
                <label htmlFor="">Max</label>
                <input value={max} placeholder="Max" onChange={e => setMax(e.target.value)}/>
                <label htmlFor="">Min</label>
                <input value={min} placeholder="Min" onChange={e => setMin(e.target.value)}/>
                <SearchButton  onClick={() => onChange(max, min)}>Search</SearchButton>
            </div>
        </div>
    )
}

export default Sidebar