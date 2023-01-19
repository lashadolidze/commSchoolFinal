import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/signup/Signup';
import Products from '../pages/products/Products';
import { authPagesLoader } from '../loaders/AuthPagesLoader';
import { protectedPagesLoader } from '../loaders/ProtectedPagesLoader';
import ProductsLayout from '../components/productspage/ProductsLayout';
import ShoppingCart from '../pages/shopping cart/ShoppingCart';
import ProductDetail from '../pages/productdetail/ProductDetail';


export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Login/>,
          loader: authPagesLoader,
        },
        {
          path: '/signup',
          element: <Signup/>,
          loader: authPagesLoader,
        },
        {
          path: '/products',
          element: <Products/>,
          loader: protectedPagesLoader,
          children: [
            {
              index: true,
              element: <ProductsLayout/>,
            },
            {
              path: '/products/shopping-cart',
              element: <ShoppingCart/>,
            },
            {
              path: '/products/:productId',
              element: <ProductDetail />
            }
            
          ]
        }
      ]
    }
  ]);