import React from 'react';
import './style.css'
import {Container} from 'react-bootstrap'
import { useAuth } from '../../../context/AuthContext';
import {useHistory} from 'react-router-dom'

function Header(props) {
      const {currentUser, signOut} = useAuth();
      const history = useHistory();
      async function handleSignOut(){
            try{
                  await signOut();
                  history.push('/sign-in')
            }catch(error){
                  console.log(error)
            }
      }
      const handleActiveNav=()=>{
            document.querySelector('.cus-nav').classList.toggle('cus-nav-active')
      }
      return (
            <div className="cus-header">
                  <Container>
                        <div className="cus-header__content">
                              <div className="cus-header__content-left">
                                    <button onClick={handleActiveNav} className="cus-header__content-btn">
                                          <i className="fas fa-bars"></i>
                                    </button>
                                    <button className="cus-header__btn">Dashboard Home</button>
                              </div>
                              <div className="cus-header__content-right">
                                    <h5>{currentUser?.email}<i className="fas fa-sort-down"></i></h5>
                                    <button onClick={handleSignOut} className="btn-cus__log-out">Đăng xuất</button>
                              </div>
                        </div>
                  </Container>
            </div>
      );
}

export default Header;