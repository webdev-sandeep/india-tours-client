import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem 
} from "mdb-react-ui-kit";
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { signup } from "../redux/features/authSlice";

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Signup = () => {
    const [formValue,setFormValue] = useState(initialState)
    const {email,password,firstName,lastName,confirmPassword} = formValue
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error} = useSelector((state)=>({...state.auth}))
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!==confirmPassword){
          return toast.error('Password should match')
        }
        if(email && password && firstName && lastName && lastName){
            dispatch(signup({formValue,navigate,toast}))
        }
    }
    const onInputChange = (e) => {
        const {name,value} = e.target
        setFormValue({...formValue,[name]:value})
    }

    useEffect(()=>{
        error && toast.error(error)
    },[error])
  return (
        <div className="login">
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x"/>
                <h5>Signup</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-6">
                            <MDBValidationItem feedback="please provide your first name!" invalid>
                                <MDBInput label="First Name" type="text" value={firstName} name="firstName" onChange={onInputChange} required/>
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-6">
                            <MDBValidationItem feedback="please provide your last name!" invalid>
                                <MDBInput label="Last Name" type="text" value={lastName} name="lastName" onChange={onInputChange} required/>
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-12">
                            <MDBValidationItem feedback="please provide email!" invalid>
                                <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required/>
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-12">
                            <MDBValidationItem feedback="please provide password!" invalid>
                                <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange} required />
                            </MDBValidationItem>    
                        </div>
                        <div className="col-md-12">
                            <MDBValidationItem feedback="please provide confirm password!" invalid>
                                <MDBInput label="Confirm password" type="password" value={confirmPassword} name="confirmPassword" onChange={onInputChange} required />
                            </MDBValidationItem>    
                        </div>
                        <div className="col-md-12">
                            {loading && <MDBSpinner size="sm" role='status' tag='span' className="me-2" />}
                            <MDBBtn className="btn mt-2">Signup</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/login'>
                    <p>Already have an account? login</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Signup;