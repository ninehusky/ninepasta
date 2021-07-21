import { Center, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => (
  <Container maxW="container.lg" mt={5}>
    <Center>
      <LoginForm />
    </Center>
  </Container>
);

export default Login;
