import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import styles from './ProductDetail.module.css'
import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const AddButton = styled(Button)({
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

function ProductDetail(props){
    const params = useParams();
    const {user, setUser } = useContext(UserContext);
    const [product, setProduct] = useState()
    const [rating, setRating] = useState(1)
    const [mainPhoto, setMainPhoto] = useState('')


    useEffect(() => {
        setUser(prev => {
            return {...prev, loading: true}
        })
        fetchProduct(params.productId)
    }, [])

    const fetchProduct = async id => {
        const response = await fetch(`http://localhost:8000/products?id=${id}`, {
            method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        const data = await response.json()
        setProduct(data[0]);
        setMainPhoto(data[0].photos[0])
        setRating(data[0].review)
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
        <div>
          <Fade in={user.loading} timeout={2700}>
                <div className={styles.main}>
                    <div className={styles.imageSection}>
                        <Stack direction="column" spacing={2} className={styles.stack}>
                          {product?.photos.map((photo,index) => {
                            return <Avatar src={photo} onClick={() => setMainPhoto(photo)} sx={{ width: 56, height: 56 }} key={index}/>
                          })}
                        </Stack>
                        <img src={mainPhoto} alt="product" className={styles.image}/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.first}>
                            <h2>{product?.title}</h2>
                            <Rating name="read-only" value={rating} readOnly precision={0.1}/>
                            <p>{product?.description}</p>
                        </div>
                        <div className={styles.last}>
                            <h3>{product?.price}$</h3>
                            <AddButton onClick={() => handleAdd(user.id,product?.id)}>Add to Cart</AddButton>
                        </div>
                    </div>
                </div>
          </Fade>
        </div>
    )
}

export default ProductDetail