import React from 'react'
import { useState, useContext } from 'react';
import {Box,TextField,Button , styled, Typography} from '@mui/material'
import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 2px 2px 10px 2px rgba(0,0,0,0.1);
`;
const Image = styled('img')({
    width: '100px',
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;

    & > div, & > button, & > p{
        margin: 20px 0 0;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background-color: #2B3A55;
    border-radius: 2px;
    color: #fff;
    height:48px;

    &:hover {
        background-color: #2B3A55CC;
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background-color: #fff;
    color: #2B3A55;
    border-radius: 2px;
    height:48px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2)
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const signupInitials = {
    name: '',
    username: '',
    password: ''
}

const loginInitials = {
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitials)
    const [login, setLogin] = useState(loginInitials)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const {setAccount} = useContext(DataContext);

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name]:e.target.value})
    }

    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]:e.target.value})
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup).then(res => res).catch(err => err);
        // console.log(response);
        
        if(response?.isSuccess){
            setSignup(signupInitials);
            toggleAccount('login');
            setError("");
        }
        else{
            setError('Something went wrong. Please try again later.')
        }
    }

    const userLogin = async () => {
        let response = await API.userLogin(login).then(res => res).catch(err => err);
        
        if(response?.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({username: response.data.username, name:response.data.name});

            isUserAuthenticated(true);
            navigate('/');
        }
        else{
            setError("Something went wrong. Please try again later");
        }
    }


  return (
    <Component style={{ marginTop: "10%" }}>
        <Box>
            <Image src={imageURL} alt="Login"/>
            {account === 'login' 
            ?
                <Wrapper>
                    <TextField className="standard-basic" onChange={onValueChange} name='username' label="Username" variant="standard" />
                    <TextField className="standard-basic" onChange={onValueChange} name='password' label="Password" variant="standard" />
                    {error && <Error>{error}</Error>}
                    <LoginButton variant='contained' onClick={userLogin}>Login</LoginButton>
                    <Typography style={{'textAlign':'center'}}>OR</Typography>
                    <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                </Wrapper>
            :
                <Wrapper>
                    <TextField className="standard-basic" onChange={onInputChange} name='name' label="Enter Name" variant="standard" />
                    <TextField className="standard-basic" onChange={onInputChange} name='username' label="Enter Username" variant="standard" />
                    <TextField className="standard-basic" onChange={onInputChange} name='password' label="Enter Password" variant="standard" />
                    {error && <Error>{error}</Error>}
                    <SignupButton onClick={signupUser}>Sign Up</SignupButton>
                    <Typography style={{'textAlign':'center'}}>OR</Typography>
                    <LoginButton variant='contained' onClick={toggleSignup}>Already have an account</LoginButton>
                </Wrapper>
            }
        </Box>
    </Component>
  )
}

export default Login;