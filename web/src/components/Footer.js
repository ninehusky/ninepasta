import React from 'react';
import { Link, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { FaGithubAlt, FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
    >
      <Stack align="center" mr={5}>
        <Link href="https://ninehusky.github.io">
          <Heading as="h4" size="md">
            &copy; nine media
          </Heading>
        </Link>
      </Stack>
      <HStack align="center" mr={5} spacing={5}>
        <Text as="sub">made with love in portland, oregon</Text>
        <Link href="https://github.com/ninehusky">
          <FaGithubAlt size={25} />
        </Link>
        <Link href="https://twitter.com/ninedawg">
          <FaTwitter size={25} />
        </Link>
        <Link href="mailto:acheung8@uw.edu">
          <FiMail size={25} />
        </Link>
      </HStack>
    </Flex>
  );
};

export default Footer;
