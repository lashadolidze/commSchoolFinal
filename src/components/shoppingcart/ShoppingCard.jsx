import Rating from '@mui/material/Rating';

import styles from './ShoppingCard.module.css'
import { useContext, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Fade from '@mui/material/Fade';
import { UserContext } from '../../context/UserContext';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DeleteButton = styled(Button)({
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

function ShoppingCard(props) {
    
    const {user, setUser } = useContext(UserContext);
    // const [dup, setDup]  = useState(props.duplicate);
    return(
        <Fade in={user.loading} timeout={Number(props.fade)}>
            <div className={styles.card}>
                <div className={styles.imageSection}>
                    <Carousel className={styles.carousel}>
                      {props.image.map((img, index) => { 
                        return <Carousel.Item  className={styles.carouselTwo} key={index}>
                                <img src={img} alt="" className=" w-50" />
                              </Carousel.Item>
                      })}
                    </Carousel>
                  
                </div>
                <div className={styles.section}>
                    <h3>{props.title}</h3>
                    <Rating name="read-only" value={props.rating} readOnly precision={0.1}/>
                    <p>{props.info}</p>
                    <div className={styles.bottom}>
                        <h4>{props.price}$ {props.duplicate[0] ? ` X ${props.duplicate.length + 1} `: null}</h4>
                        <DeleteButton onClick={() => props.delete(props.id)}>Delete</DeleteButton>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default ShoppingCard