import { React, useEffect, useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Text,
  Stack,
  Heading,
  Center,
} from '@chakra-ui/react';

import UpdateEntryRow from './UpdateEntryRow';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import EntryForm from './EntryForm';

const UpdateTable = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [table, setTable] = useState(null);
  const [entry, setEntry] = useState(null);
  const [deleting, setDeleting] = useState(false);
  let apiError = null;

  const loadTable = async () => {
    const response = await fetch(
      'http://localhost:3141/api/v1/entries?userId=' + props.userId,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const json = await response.json();
    setTable(json);
  };

  const deleteEntry = async () => {
    try {
      const response = await fetch(
        `http://localhost:3141/api/v1/entries/${entry._id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const json = await response.json();
      if (!response.ok) {
        apiError = json.message;
      } else {
        apiError = null;
        toast({
          title: 'Entry deleted.',
          description: 'Thanks for your contribution!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        loadTable();
        onClose();
      }
    } catch (err) {
      apiError = 'There was an error.';
    }
  };

  useEffect(loadTable, []);

  const toast = useToast();
  const onSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        `http://localhost:3141/api/v1/entries/${entry._id}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            word: values.word,
            emoji: values.emoji,
            absurdity: values.absurdity,
            description: values.description,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        apiError = json.message;
      } else {
        apiError = null;
        toast({
          title: 'Entry updated.',
          description: 'Thanks for your contribution!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        loadTable();
        onClose();
      }
    } catch (err) {
      apiError = 'There was an error.';
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {!deleting ? (
          <ModalContent>
            <ModalHeader>Update Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EntryForm
                word={entry?.word}
                emoji={entry?.emoji}
                absurdity={entry?.absurdity}
                description={entry?.description}
                apiError={apiError}
                onSubmit={onSubmit}
              />
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Delete Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Heading as="h2" fontSize="md" mb={5}>
                  Are you sure you want to delete the following entry?
                </Heading>
              </Center>
              <Stack spacing={2}>
                <Text>Word: {entry.word}</Text>
                <Text>Emoji: {entry.emoji}</Text>
                <Text>Absurdity: {entry.absurdity}</Text>
                <Text>Description: {entry.description}</Text>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={deleteEntry}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
      <Table height="30px">
        <Thead>
          <Tr>
            <Th>word</Th>
            <Th>emoji</Th>
            <Th>absurdity</Th>
            <Th>description</Th>
          </Tr>
        </Thead>
        <Tbody height="30px">
          <Tr>
            <Link to="/create">
              <Button
                marginTop={5}
                marginBottom={5}
                leftIcon={<BsFillPlusCircleFill />}
                colorScheme="teal"
              >
                Create your own entry!
              </Button>
            </Link>
          </Tr>
          {table
            ? table.map((entry, index) => {
                return (
                  <UpdateEntryRow
                    word={entry.word}
                    emoji={entry.emoji}
                    absurdity={entry.absurdity}
                    description={entry.description}
                    id={entry._id}
                    key={index}
                    onOpen={operation => {
                      console.log(operation);
                      if (operation === 'update') {
                        setDeleting(false);
                      } else {
                        // operation === 'delete'
                        setDeleting(true);
                      }
                      setEntry(entry);
                      onOpen();
                    }}
                  />
                );
              })
            : null}
        </Tbody>
      </Table>
    </>
  );
};

export default UpdateTable;
