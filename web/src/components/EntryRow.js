import { Tr, Td, Button, HStack } from '@chakra-ui/react';
import React from 'react';

const EntryRow = props => (
  <Tr>
    <Td>{props.word}</Td>
    <Td>{props.emoji}</Td>
    <Td>{props.absurdity}</Td>
    <Td>{props.description}</Td>
    <HStack>
      {props.update ? <Button id={props.id}>Update</Button> : null}
      {props.delete ? (
        <Button colorScheme="red" id={props.id}>
          Delete
        </Button>
      ) : null}
    </HStack>
  </Tr>
);

export default EntryRow;
