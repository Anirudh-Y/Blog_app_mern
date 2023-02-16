import { AppBar, Toolbar, styled } from '@mui/material'
import {Link} from 'react-router-dom';
import React from 'react'

const Header = () => {

    const Component = styled(AppBar)`
        background-color: #2B3A55;
    `;

    const Container = styled(Toolbar)`
        justify-content: center;

        & > a{
            text-decoration: none;
            color: #fff;
            padding: 10px;
        }
    `;

  return (
    <Component>
        <Container>
            <Link to='/' >HOME</Link>
            <Link to='/about' >ABOUT</Link>
            <Link to='/contact' >CONTACT</Link>
            <Link to='/login' >LOGOUT</Link>
        </Container>
    </Component>
  )
}

export default Header