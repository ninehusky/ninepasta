import React from 'react';
import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const logout = async () => {
    const response = await fetch(
      'https://ninepasta.herokuapp.com/users/logout',
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      console.error(response);
    }
    const json = await response.json();
    history.push('/');
  };

  return (
    <Button colorScheme="facebook" onClick={logout}>
      Log out
    </Button>
  );
};

export default LogoutButton;
