import Carousel from 'react-bootstrap/Carousel';
import Fade from '@mui/material/Fade';
import Rating from '@mui/material/Rating';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';

import styles from './ProductsCard.module.css'
import { generatePath, useNavigate } from 'react-router-dom';
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

function ProductCard(props){
    const {user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate(generatePath('/products/:productId', { productId: props.id }))
      setUser(prev => {
        return {...prev, loading: false}
      })
    }

    return (
          <Card sx={{ maxWidth: 245 }}>
            <CardActionArea onClick={handleRedirect} className={styles.main}>
              <CardMedia>
                  <Carousel className={styles.carousel} controls={false} indicators={false}>
                    {props.image.map((img, index) => { 
                      return <Carousel.Item className={styles.carouselTwo} key={index}>
                              <img src={img} alt="" className=" w-50" />
                            </Carousel.Item>
                    })}
                  </Carousel>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {props.title}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  <Rating name="read-only" value={props.rating} readOnly precision={0.1}/>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {props.price}$
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <AddButton size="small" color="primary" onClick={() => props.add(user.id,props.id)}>
                Add to cart
              </AddButton>
            </CardActions>
          </Card>
    )
}

export default ProductCard