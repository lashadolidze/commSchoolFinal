import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './Signup.props';

import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import {UserContext} from "../../context/UserContext.jsx"

const RegisterButton = styled(Button)({
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

function Signup(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
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
        if(data && !errors.fullname?.message && !errors.email?.message && !errors.password?.message){
          const response = await fetch('http://localhost:8000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": data.fullname,
            "email": data.email,
            "password": data.password
          }),
        })
        const message = await response.json();
        console.log(message);
        if(typeof message === 'string'){
          throw message
        }else{
          setUser(prev => {
            return {...prev, loading: false}
          })
          setTimeout(() => {
            navigate('/')
          }, 1200);
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
        navigate('/')
      }, 1200);
    }

    return(
      <div className={styles.main}>
        <Fade in={user.loading} timeout={1700}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.loginArea}>
              <div className={styles.formElements}>
                <label className={styles.texts}>Full Name:</label>
                <input {...register("fullname")} className={styles.inputs} />
                <p className={styles.error}>{errors.fullname?.message}</p>
              </div>
              <div className={styles.formElements}>
                <label className={styles.texts}>Email:</label>
                <input {...register("email")} className={styles.inputs}/>
                <p className={styles.error}>{errors.email?.message}</p>
              </div>

              <div className={styles.formElements}>
                <label className={styles.texts}>Password:</label>
                <input type="password" {...register("password")} className={styles.inputs}/>
                <p className={styles.error}>{errors.password?.message}</p>
              </div>
              <p className={styles.error}>{error}</p>
              <RegisterButton variant="contained" type="submit" >Register</RegisterButton >
              <p className={styles.texts}>Already have an accaunt? <Link onClick={handleClickLink}>Sign in</Link></p>
          </form>
        </Fade>
      </div>
    )
}

export default Signup