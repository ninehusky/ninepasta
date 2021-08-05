import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import EntryTable from '../components/EntryTable';

const Glossary = () => {
  return (
    <Container maxW="container.lg">
      <Heading as="h1" mb={3}>
        Glossary
      </Heading>
      <EntryTable />
    </Container>
  );
};

export default Glossary;
