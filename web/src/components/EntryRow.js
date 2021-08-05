import { Tr, Td } from '@chakra-ui/react';
import React from 'react';

const EntryRow = props => (
  <Tr>
    <Td>{props.word}</Td>
    <Td>{props.emoji}</Td>
    <Td>{props.absurdity}</Td>
    <Td>{props.description}</Td>
  </Tr>
);

export default EntryRow;
