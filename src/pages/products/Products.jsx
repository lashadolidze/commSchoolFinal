import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar.jsx"
import {UserContext} from "../../context/UserContext.jsx"
import { parseJwt } from '../../jwt/Jwt.js';

function Products(){
    const {user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const { sub } = parseJwt(token);
        fetchUser(sub);
    }, []);

    const fetchUser = async (userId) => {
        try {
          const response = await fetch(`http://localhost:8000/users/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
          const data = await response.json();
          const responseCart = await fetch(`http://localhost:8000/user/${userId}/carts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const dataCart = await responseCart.json();
        setUser(prev => {
          return {...prev, name: data.name, cartNum: dataCart.length, cartInfo: dataCart, id: userId}
        })
        // console.log(dataCart);
        } catch (e) {
          console.error(e);
          setUser(prev => {
            return {...prev, name: null, cartNum: null}
          })
        }
    }
    
    const handleLogout = () => {
      localStorage.removeItem('authToken'); 
      setUser(prev => {
        return {...prev, loading: false}
      })  
      setTimeout(() => {
        navigate('/')
        setUser(prev => {
          return {
            id: null,
            name: null,
            email:null,
            cartNum: null,
            cartInfo: null
          }
        })
      }, 1200);
    } 
    
    const handleCart = () => {
      setUser(prev => {
        return {...prev, loading: location.pathname === "/products/shopping-cart" ? true : false}
      })  
      setTimeout(() => {
        navigate('/products/shopping-cart')
      }, 1800);
    } 
    const handleProducts = () => {
      setUser(prev => {
        return {...prev, loading: location.pathname === "/products" || "/products/" ? true : false}
      })  
      setTimeout(() => {
        navigate('/products')
      }, 1800);
    } 

    return(
        <div>
            <Navbar onLogout={handleLogout} ShoppingCart={handleCart} Products={handleProducts}/>
            <Outlet/>
        </div>
    )
}

export default Products