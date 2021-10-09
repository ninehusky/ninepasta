import {
  Tr,
  Td,
  Button,
  Text,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Select,
  FormHelperText,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import React from 'react';

import * as Yup from 'yup';

const UpdateEntryRow = props => {
  return (
    <Tr>
      <Td>{props.word}</Td>
      <Td>{props.emoji}</Td>
      <Td>{props.absurdity}</Td>
      <Td>{props.description}</Td>
      <HStack>
        <Button
          id={props.id}
          onClick={() => {
            props.onOpen('update');
          }}
        >
          Update
        </Button>
        <Button
          colorScheme="red"
          id={props.id}
          onClick={() => {
            props.onOpen('delete');
          }}
        >
          Delete
        </Button>
      </HStack>
    </Tr>
  );
};

export default UpdateEntryRow;
