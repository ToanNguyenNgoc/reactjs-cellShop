import React, { useRef } from 'react';
import {Card, Form, Button} from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css'

function SignIn(props) {
      const emailRef = useRef();
      const passwordRef = useRef();
      const {signIn} = useAuth();
      const history = useHistory();
      async function handleSubmit(e){
            e.preventDefault();
            try{
                  await signIn(emailRef.current.value, passwordRef.current.value);
                  history.push('/Admin/home');
            }catch{
                  toast.error("Sign in failed !")
            }
      }
      return (
            <div className="card_sign-in">
                  <Card>
                        <Card.Body>
                              <h2 className="text-center mb-4">Đăng nhập</h2>
                              <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                          <Form.Label>Email</Form.Label>
                                          <Form.Control type='email' placeholder="Email: admin123@gmail.com" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                          <Form.Label>Password</Form.Label>
                                          <Form.Control type='password' placeholder="Password: admin123" ref={passwordRef} required />
                                    </Form.Group>
                                    <div className="card__sign-in__btn">
                                          <Button type='submit'>Đăng nhập</Button>
                                    </div>
                              </Form>
                        </Card.Body>
                  </Card>
                  <ToastContainer/>
            </div>
      );
}

export default SignIn;