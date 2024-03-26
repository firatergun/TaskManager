import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Copyright from '../components/Copyright';

const LOGIN_USER = gql`
  mutation login($input: LoginInput!){
    login(loginInput: $input){
        user {
            id
            email
            username
        }
        access_token
    }
}
`

function LoginPage() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  let navigate = useHistory();
  
  async function loginUserCallback() {
    console.log('Callback hit');
    const data = await loginUser().then(data => data);
    console.log(data);
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      navigate.push("/dashboard");
    },
    onError({ graphQLErrors }) {
      console.log("onError...");
      console.log(graphQLErrors); //TODO Remove later!..
      setErrors(graphQLErrors);
    },
    variables: { input: values }
  });
  return (
    <Container spacing={2} maxWidth="sm">
      <Stack spacing={2} paddingBottom={2} marginTop={2}>
        <Typography variant='h4' align="center">Login</Typography>
        <TextField
          label='Email'
          name='email'
          type='email'
          onChange={onChange}
          onBlur={onChange}
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          onChange={onChange}
          onBlur={onChange}
        />
      {errors.map(function(error){
        return (
          <Alert severity='error'>
            {error.message}
          </Alert>
        )
      })}
      <Button variant='contained' onClick={onSubmit}>Login</Button>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Stack>
    </Container>
  )
}

export default LoginPage