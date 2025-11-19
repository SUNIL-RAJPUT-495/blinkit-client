import React, { useState } from 'react'
import {Container,Row,Col} from "react-bootstrap"
import { Header } from '../Component/Header'

export const AdminPage = () => {
    const [Image,setImage]=useState(null)
    const handleImageChange = (e)=>{
        const file =e.target.file[0];
        if (file){
            setImage(URL.createObjectURL(file));
        }
    }
  return (
    <>
    <Header/>
    <Container>
        <Row>
        <Col md={3}>
        <div><p className='fw-bold'>My Account</p>
        <p>Amit Prajapati </p>
        <div>
            <ul>
            <li>MY Order</li>
            <li>Save Address</li>
            <li>Log Out</li>
            </ul>
        </div>
        </div>
        
        </Col>  
        <Col md={9}>
        <div className='mt-3'>
            <form action="">
                <input type="file" id='fileUplod' accept='image/*'onChange={handleImageChange} />
                <label htmlFor="fileUplod" > {Image?(<img src={image} alt='preview' style={{height:"150px"}}/>):(<div style={{height:"150px"}}> Uplod Image</div>)}</label>
                <br />
                <label >Name</label>
                <br />
                <input type="text" placeholder='Enter your Name'className='w-100 border-0 bg-body-secondary' />
                <br />
                <label>Email</label>
                <br />
                <input type="text" placeholder='Enter your Email'className='w-100 border-0 bg-body-secondary' />
                <br />
                <label >Mobile</label>
                <br />
                <input type="text" placeholder='Enter your Mobil Number'className='w-100 border-0 bg-body-secondary' />
                <br />
                <input type="submit"className='w-100 mt-3 fw-bold' style={{border:"1px solid yellow", background:"white" ,}} />
            </form>
        </div>
        </Col>      
        </Row>
    </Container>
    </>
  )
}
