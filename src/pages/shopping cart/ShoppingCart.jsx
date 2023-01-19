import { useContext, useEffect, useState } from "react";
import ShoppingCard from "../../components/shoppingcart/ShoppingCard";
import {UserContext} from "../../context/UserContext.jsx"
import { parseJwt } from "../../jwt/Jwt";
import styles from './ShoppingCart.module.css'

function ShoppingCart() {
    const [cards,setCards] = useState()
    const [loading,setLoading] = useState(true)
    const {user, setUser } = useContext(UserContext);
    const [id,setId] = useState()
    const [reaload,setReaload] = useState(false)
    const [duplicate,setDuplicate] = useState(null)

    useEffect(()=> {
        const token = localStorage.getItem('authToken');
        const { sub } = parseJwt(token);

        fetchProducts(sub)
        setUser(prev => {
            return {...prev, loading: true}
        })
    },[reaload])


    const fetchProducts = async (userId) => {
        try {
            const responseCart = await fetch(`http://localhost:8000/user/${userId}/carts`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              },
            });
            const dataCart = await responseCart.json();

            const info = dataCart.map((info) => {
                return `id=${info.productId}&`
            }).join('').slice(0, -1)
            setId(dataCart);

            const dupl = dataCart.map((info) => {
                return info.productId
            }).filter((e, i, a) => a.indexOf(e) !== i)
            setDuplicate(dupl)

            if(info){
                const response = await fetch(`http://localhost:8000/products?${info}`, {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                })
                const data = await response.json();
                setCards(data)
                setLoading(false)
            }else{
                setLoading(true)
            }

        }catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (productId) => {
        setUser(prev => {
            return {...prev,cartNum: user.cartNum - 1}
        })
        const response = await fetch(`http://localhost:8000/carts/${productId.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
        const data = await response.json()
        setReaload(reaload ? false : true)
    }
    return(
        <div className={styles.main}>
            {loading ? <h1>No Items </ h1> 
            : cards.map((card, index) => {
                return(
                    <ShoppingCard 
                    image = {card.photos}
                    title = {card.title}
                    rating = {card.review}
                    info = {card.description}
                    id = {id.find(cart => {
                        if(cart.productId === card.id){
                            return cart.id
                        }
                    })}
                    key = {card.id}
                    price = {card.price}
                    delete = {handleDelete}
                    fade = {`${index+1}700`}
                    duplicate = {duplicate.filter(dup => {
                        if(dup === card.id){
                            return dup
                        }
                    })}
                    />
                )
            })}
        </div>
    )
}

export default ShoppingCart