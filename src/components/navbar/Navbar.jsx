import styles from './Navbar.module.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from 'react';
import {UserContext} from "../../context/UserContext.jsx"
import Badge from '@mui/material/Badge';
import Fade from '@mui/material/Fade';

function Navbar(props){
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {user, setUser } = useContext(UserContext);
    const { onLogout, ShoppingCart, Products } = props;
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    },[])

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return(
        <div className={styles.main}>
            <Fade in={loading} timeout={1700}>
                <div className={styles.navbar}>
                    <div className={styles.navbarItems}>
                        <img src="https://www.nicepng.com/png/full/247-2475175_ecommerce-e-commerce-website-logo.png" 
                        alt="logo" 
                        className={styles.logo}/>
                        <span onClick={Products}>Products</span>
                    </div>
                    <div className={styles.navbarItems}>
                        <Badge badgeContent={user.cartNum} color="primary" onClick={ShoppingCart}>
                            <AddShoppingCartIcon />
                        </Badge>
                        <p onClick={handleOpenUserMenu}>Hello, {user.name}</p>
                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                              <p onClick={() => {
                                onLogout()
                                setLoading(false)
                                }}>Log out</p>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default Navbar