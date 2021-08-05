import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Heading,
  Textarea,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';

const Playground = () => {
  const [plaintext, setPlainText] = useState('');
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState(null);

  useEffect(async () => {
    const response = await fetch('http://localhost:3141/api/v1/entries', {
      method: 'GET',
      credentials: 'include',
    });
    const json = await response.json();
    setTable(json);
    setLoading(false);
  }, []);

  const emojify = plaintext => {
    const words = plaintext.split(/\s+/);
    let result = '';
    for (const word of words) {
      result += word;
      for (let i = 0; i < table.length; i++) {
        if (table[i].word === word) {
          result += table[i].emoji;
          break;
        }
      }
      result += ' ';
    }
    return result;
  };

  const handleInputChange = e => {
    const inputValue = e.target.value;
    setPlainText(emojify(inputValue));
  };

  return (
    <Box width="100%">
      <Container height="80vh" maxW="container.xl">
        <Heading as="h1" mb={10}>
          Playground
        </Heading>
        {loading ? <Text>Loading...</Text> : null}
        <HStack>
          <Textarea
            color="black"
            bg="gray.500"
            placeholder="begin typing here..."
            onChange={handleInputChange}
            height="lg"
            fontSize="xl"
          />
          <FaArrowCircleRight size={60} />
          <Textarea
            bg="gray.500"
            isDisabled
            placeholder="...and watch as your emojified text appears here!"
            value={plaintext}
            height="lg"
            fontSize="xl"
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Playground;
