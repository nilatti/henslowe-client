import React from 'react'
import {
  Col,
  Container
} from 'react-bootstrap'

import {MainApp} from './Components/MainApp'
import SignUpInOut from './Components/SignUpInOut'
import './App.css';
import 'react-widgets/dist/css/react-widgets.css';

export const AuthContext = React.createContext();
const localAuthStore = localStorage.getItem('user') ? true : false
const localUser = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')
const initialState = {
  isAuthenticated: localAuthStore,
  user: localUser,
  token: token,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", action.payload.headers.authorization)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        token: action.payload.headers.authorization
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <Container fluid={true}>
        <div className="App">
          <AuthContext.Provider
            value={{
              state,
              dispatch
            }}
          >
            <div className="App">
              <SignUpInOut />
              {
                state.isAuthenticated ?
                <MainApp /> : <span></span>
              }
            </div>
          </AuthContext.Provider>
        </div>
      </Container>
    )
}
