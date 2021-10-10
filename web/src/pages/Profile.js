import { Container, Text, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UpdateTable from '../components/UpdateTable';

const Profile = () => {
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const history = useHistory();
  useEffect(async () => {
    let response = await fetch('https://ninepasta.herokuapp.com/users/me', {
      credentials: 'include',
    });
    if (!response.ok) {
      history.push('/');
    } else {
      response = await response.json();
      setName(response.name);
      setId(response.id);
    }
  }, []);
  return (
    <Container maxWidth="container.lg">
      <Heading as="h1">
        <Text>Hello, {name}!</Text>
      </Heading>
      <Heading as="h2">Your entries:</Heading>
      {id ? <UpdateTable userId={id} /> : null}
    </Container>
  );
};

export default Profile;
