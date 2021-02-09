import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
{/* Nav Bar HTML Present on every page  */}
const Nav = () => {
    return (
       <div align="center">
          <NavLink to="/">Home </NavLink>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
}
 
export default Nav;