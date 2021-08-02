import {
  Box,
  Container,
  Heading,
  Button,
  Center,
  Divider,
  Text,
  HStack,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const Landing = () => {
  const heroColor = useColorModeValue('gray.300', 'gray.700');
  return (
    <>
      <Box width="100%" height="90vh" backgroundColor={heroColor}>
        <Container maxW="container.lg" paddingTop="20vh">
          <HStack
            spacing={10}
            marginTop={10}
            justifyContent="center"
            justifyItems="center"
          >
            <Box>
              <Heading
                as="h1"
                size="3xl"
                letterSpacing="tight"
                fontWeight="extrabold"
              >
                emojipastas made easy.
              </Heading>
              <Heading as="h2" size="md">
                a nine radio project
              </Heading>
            </Box>
            <Text fontSize="xl">
              ninepasta uses cutting-edge technology to host the world's first
              full-stack repository of word-emoji pairs.
            </Text>
          </HStack>
          <Center marginTop={100} marginBottom={10}>
            <Button size="lg">Get Started</Button>
          </Center>
          <Center marginTop="15%" marginBottom={7}>
            <Text as="sub">scroll down</Text>
          </Center>
          <Center>
            <FaArrowDown size={30} />
          </Center>
        </Container>
      </Box>
      <Box width="100%" height="90vh" paddingTop="5vh">
        <Container maxW="container.lg">
          <Center mb="10">
            <Heading as="h1">What is an emojipasta?</Heading>
          </Center>
          <Stack>
            <Text fontSize="lg">
              an emojipasta is a variation of the copypasta, defined by
              Wikipedia as “a block of text which is copied and pasted across
              the internet by individuals through online forums.” type something
              crazy into our playground and watch your text get seasoned in real
              time!
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Landing;
