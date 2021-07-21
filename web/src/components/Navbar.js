import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useColorMode,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg">
            ninepasta!
          </Heading>
        </Link>
        <HStack spacing={3} ml={10}>
          <Text>about</Text>
          <Text>playground</Text>
          <Text>glossary</Text>
        </HStack>
      </Flex>
      <HStack spacing={3}>
        <Box onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Box>
        <Link to="/login">
          <Button>Log in</Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="teal">Sign up</Button>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Navbar;
