import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Alert, Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright';

const REGISTER_USER = gql`
  mutation Mutation($input: SignUpInput!){
    signup(signUpInput: $input){
      id,
      email,
      username,
    }
  }
`

function SignUpPage() {
  const [errors, setErrors] = useState([]);
  let navigate = useHistory();
  
  async function registerUserCallback() {
    console.log('Callback hit');
    const data = await registerUser().then(data => data);
    console.log(data);
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: ''
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { signup: userData } }) {
      // context.login(userData);
      navigate.push("/login");
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
      <Typography variant='h4' align="center">Register</Typography>
      <Typography component='p' align="center">Register to create an account!</Typography>
      <Stack spacing={2} paddingBottom={2} marginTop={2}>
        <TextField
          label='Username'
          name='username'
          onChange={onChange}
          onBlur={onChange}
        />
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
        <Button variant='contained' onClick={onSubmit}>Register</Button>
        <Link href='#' onClick={() => navigate.push("/login")} align="center" variant="body2">
                  Already have an account? Sign in
        </Link>
      </Stack>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignUpPage