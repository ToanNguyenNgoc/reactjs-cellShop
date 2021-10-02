import React, { useRef} from 'react';
import {Card, Form, Button, Container} from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addDocument} from '../../../firebase/services'

function SignUp(props) {
     const emailRef = useRef();
     const passwordRef = useRef();
     const passwordConfirmRef= useRef();
     const {signUp} = useAuth();
     async function handleSubmit(e){
           e.preventDefault();
           if(passwordRef.current.value !== passwordConfirmRef.current.value){
                 return toast.warn('Password confirm not match !');
           }
           try{
                  await signUp(emailRef.current.value, passwordRef.current.value);
                  addDocument('admin',{
                        email: emailRef.current.value
                  })
                  toast.success('Create new admin account success !')
           }catch{
                  toast.error('The email address is already in use by another account !');
           }
           
     }
      return (
            <Container className="cus-user-page">
                  <Card className="col-10 cus-user-page__content">
                        <Card.Body>
                              <h2 className="text-center mb-4">Tạo mới tài khoản admin</h2>
                              <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                          <Form.Label>Email</Form.Label>
                                          <Form.Control type='email' ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                          <Form.Label>Password</Form.Label>
                                          <Form.Control type='password' ref={passwordRef} required />
                                    </Form.Group>
                                    <Form.Group id="password-confirm">
                                          <Form.Label>Confirm Password</Form.Label>
                                          <Form.Control type='password' ref={passwordConfirmRef} required />
                                    </Form.Group>
                                    <Form.Group
                                          style={{display:'flex', flexDirection:'row', justifyContent:'center'}}
                                    >
                                          <Button type='submit'
                                                style={{marginTop:'10px', width:'50%'}}
                                          >
                                                Tạo mới
                                          </Button>
                                    </Form.Group>
                              </Form>
                        </Card.Body>
                  </Card>
                  <ToastContainer/>
            </Container>
      );
}

export default SignUp;