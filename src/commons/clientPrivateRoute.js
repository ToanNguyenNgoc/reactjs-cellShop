import { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContextClient} from '../context/AuthContextClient';

export default function ClientPrivateRoute({component: Component, ...rest}){
      const {user:{uid}} = useContext(AuthContextClient);
      return (
            <Route
                  {...rest}
                  render={props =>{
                        return uid ? <Component {...props}/> : <Redirect to="/Home/Cart"/>
                  }}
            >
            </Route>
      )
}