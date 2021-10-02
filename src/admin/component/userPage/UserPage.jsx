import React, {useContext} from 'react';
import './style.css'
import { AppContext } from '../../../context/AppProvider';
import UserList from './UserList';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'

function UserPage(props) {
      const {userList} = useContext(AppContext)
      const history = useHistory();
      const gotoSignUpPage=()=>{
            history.push('/Admin/sign-up');
      }
      
      return (
            <div className="cus-user-page">
                  <div className="col-10 cus-user-page__content">
                        <Button
                              onClick={gotoSignUpPage}
                              variant="contained"
                              color="secondary"
                        >
                              Tạo mới admin
                        </Button>
                        <UserList
                              users={userList}
                        />
                  </div>
            </div>
      );
}

export default UserPage;