import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './Login.props';

import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useEffect, useState,useContext } from 'react';
import {UserContext} from "../../context/UserContext.jsx"
import { useNavigate } from 'react-router-dom';

const LoginButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  width: '70%',
  lineHeight: 1.5,
  backgroundColor: '#F0F0F0',
  color: '#E7473C',
  '&:hover': {
    backgroundColor: '#e6e1e1',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#e6e1e1',
  }
});

function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const navigate = useNavigate();
    const {user, setUser } = useContext(UserContext);
    const [error,setError] = useState()

    useEffect(()=> {
      setUser(prev => {
        return {...prev, loading: true}
      })
    }, [])

    const onSubmit = async data => {
      setError('')
      try {
        if(data && !errors.email?.message && !errors.password?.message){
          const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": data.email,
            "password": data.password
          }),
        })
        const message = await response.json();

        if(typeof message === 'string'){
          throw message
        }else{
          setUser(prev => {
            return {...prev, loading: false}
          })
          setTimeout(() => {
            navigate('/products')
          }, 1200);
          localStorage.setItem('authToken', message.accessToken);
        }
        }
      }catch(er){
        setError(er)
      }
    }

    const handleClickLink = async () => {
      setUser(prev => {
        return {...prev, loading: false}
      })
      setTimeout(() => {
        navigate('/signup')
      }, 1200);
    }
    
    return(
      <div className={styles.main}>
        <Fade in={user.loading} timeout={1700}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.loginArea}>
            <div className={styles.formElements}>
              <label className={styles.texts}>Email</label>
              <input {...register("email")} className={styles.inputs}/>
              <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div className={styles.formElements}>
              <label className={styles.texts}>Password</label>
              <input type="password" {...register("password")} className={styles.inputs}/>
              <p className={styles.error}>{errors.password?.message}</p>
            </div>
            <p className={styles.error}>{error}</p>
            <LoginButton variant="contained" type="submit">Login</LoginButton >
            <p className={styles.texts}>Don't have an accaunt? <Link onClick={handleClickLink}>Sign up</Link></p>
          </form>
        </Fade>
      </div>
    )
}

export default Login