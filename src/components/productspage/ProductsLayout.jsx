import { useContext, useEffect, useReducer, useState } from "react";
import {UserContext} from "../../context/UserContext.jsx"
import Sidebar from "./Sidebar.jsx";
import ProductCard from "./ProductsCard.jsx";
import SearchBar from "./Searchbar.jsx";
import { fetchProducts } from "./helpers/Products.service.js";
import { productReducer } from "./helpers/Products.reducer.js";
import { SET_FILTER, SET_ORDERING, SET_PAGE, SET_PRODUCTS, SET_SEARCH } from './helpers/Product.constants';
import { initialValue } from './helpers/Products.props';

import { Button, Grid, Pagination } from '@mui/material';
import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./ProductsLayout.module.css"

import { styled } from '@mui/material/styles';


const totalPages = 3;

const SortButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  width: '6rem',
  lineHeight: 1.5,
  backgroundColor: '#E7473C',
  color: '#F0F0F0',
  '&:hover': {
    backgroundColor: '#E7473C',
    boxShadow: 'none',
  }
});

function ProductsLayout(){
    const {user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [data, dispatch] = useReducer(productReducer, initialValue);
    const { page, limit, ordering, maxPrice, minPrice, products, search } = data;

    useEffect(() => {
        setUser(prev => {
            return {...prev, loading: true}
        })
    }, [])

    useEffect(() => {
        getProducts(page, limit, ordering, maxPrice, minPrice, search);
      }, [page, limit, ordering, maxPrice, minPrice, search]);
    

    const getProducts = async (nextPage, nextLimit, nextOrder, maxValue, minValue, search) => {
      const data = await fetchProducts(nextPage, nextLimit, nextOrder, maxValue, minValue, search);

      dispatch({
        type: SET_PRODUCTS,
        payload: data,
      });
      setLoading(false)
    }


    const handlePaginationChange = (event, nextPage) => {
        dispatch({
          type: SET_PAGE,
          payload: nextPage,
        });
    }

    const handleSortProducts = () => {
      const newOrder = ordering === 'asc' ? 'desc' : 'asc';

      dispatch({
        type: SET_ORDERING,
        payload: newOrder,
      });
    };

    const hanldeFilter = (max, min) => {
      dispatch({
        type: SET_FILTER,
        payload: {
          maxPrice: max,
          minPrice: min,
        },
      });
    }

    const hanldeSearch = (search) => {
      dispatch({
        type: SET_SEARCH,
        payload: search
      });
    }

    const handleAdd = async (userId, productId) => {
        setUser(prev => {
            return {...prev, cartNum: prev.cartNum + 1}
        })
        try {
          const response = await fetch('http://localhost:8000/carts',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
              "productId": productId,
              "userId": userId
            }),
          })
        } catch (error) {
          console.log(error);
        }
    };

    return(
      <Fade in={user.loading} timeout={2700}>
          <div className={styles.main}>
            <Sidebar maxPrice={0} minPrice={0} onChange={hanldeFilter}/>
            <div className={styles.right}>
                <Grid container  columnSpacing={{ xs: 1, sm: 1, md: 35 }} className={styles.top}>
                  <Grid item xs={9}>
                    <SearchBar searchTerm={''} onChange={hanldeSearch}/>
                  </Grid>
                  <Grid item xs={3}>
                    <SortButton variant="outlined" className="sort-button" onClick={handleSortProducts}>
                      Price
                      {ordering === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </SortButton>
                  </Grid>
                </Grid>
                <div className={styles.productsLayout}>
                  <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 10 }} className={styles.products}>
                        {loading ? <p>Loading...</p> 
                        : products.map(card => {
                            return <Grid item xs={3} key = {card.id}>
                            <ProductCard
                                image = {card.photos}
                                title = {card.title}
                                rating = {card.review}
                                price = {card.price}
                                id = {card.id}
                                key = {card.id}
                                add = {handleAdd}
                            />
                            </Grid>
                        })}
                    </Grid>
                    <Pagination count={totalPages} page={page} onChange={handlePaginationChange} />
                </div>
            </div>
          </div>
        </Fade>
    )
}

export default ProductsLayout;