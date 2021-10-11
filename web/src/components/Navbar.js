import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useColorMode,
  Text,
  Divider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  let [body, setBody] = useState(null);
  let location = useLocation();

  useEffect(async () => {
    let response;
    try {
      response = await fetch('https://ninepasta.herokuapp.com/users/me', {
        credentials: 'include',
      });
    } catch (err) {}
    if (!response?.ok) {
      setBody(
        <HStack spacing={3}>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="teal">Sign up</Button>
          </Link>
        </HStack>
      );
    } else {
      response = await response.json();
      setBody(
        <HStack spacing={3}>
          <Text color="tomato">
            <Link to="/me">
              <Text fontWeight="bold" _hover={{ fontWeight: 'extrabold' }}>
                {response.name}
              </Text>
            </Link>
          </Text>
          <LogoutButton />
        </HStack>
      );
    }
  }, [location]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      height="5vh"
      mb="5vh"
      paddingLeft="20vh"
      paddingRight="20vh"
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg" letterSpacing="tight">
            ninepasta!
          </Heading>
        </Link>
        <HStack spacing={3} ml={10}>
          <Link to="/playground">
            <Text fontSize="lg" _hover={{ fontWeight: 'extrabold' }}>
              playground
            </Text>
          </Link>
          <Link to="/glossary">
            <Text fontSize="lg" _hover={{ fontWeight: 'extrabold' }}>
              glossary
            </Text>
          </Link>
        </HStack>
      </Flex>
      <HStack spacing={3} height="5vh">
        <Box onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Box>
        <Divider orientation="vertical" />
        <Box>{body}</Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;
