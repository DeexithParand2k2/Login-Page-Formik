import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import '../../src/App.css'
import { TextField, Button, Link } from '@mui/material'

function Login({ setChoice, renderRole }) {


  const handleSubmit = async () => {

    console.log("Submission element",formik.values)

    try {
      const response = await fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      });

      if(response.status === 200){
        const responseData = await response.json();
        renderRole(responseData.role)
        setChoice('')
        alert('User registered successfully:', responseData);
      } else if(response.status === 401){
        alert('Invalid cred');
      } else{
        throw new Error('LOGIN ERROR');
      }
      
    } catch (error) {
      alert('Error login user:',error.message);
    }

  }

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      handleSubmit()
    },
  });

  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh'
    }}>
      <form onSubmit={formik.handleSubmit} style={{
        display:'flex',
        gap:'10px',
        flexDirection: 'column',
      }}>

        <TextField
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          label="Name"
          variant="outlined"
        />


        <TextField
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          label="Password"
          variant="outlined"
        />

        <Button type="submit" variant="contained">Submit</Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            setChoice('reg')
          }}
        >
          New User
        </Link>
      </form>
    </div>
  )
}

export default Login;
