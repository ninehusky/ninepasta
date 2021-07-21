import { Center, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => (
  <Container maxW="container.lg" mt={5}>
    <Center>
      <RegisterForm />
    </Center>
  </Container>
);

export default Register;
