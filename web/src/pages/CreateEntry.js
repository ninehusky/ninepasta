import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useToast, Container } from '@chakra-ui/react';
import EntryForm from '../components/EntryForm';

const CreateEntry = () => {
  let apiError = null;
  const toast = useToast();
  const onSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        'https://ninepasta.herokuapp.com/api/v1/entries/',
        {
          method: 'POST',
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
        console.log(json);
        apiError = null;
        toast({
          title: 'Action completed.',
          description: 'Thanks for your contribution!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      apiError = 'There was an error.';
    }
  };

  return (
    <Container>
      <EntryForm apiError={apiError} onSubmit={onSubmit} />
    </Container>
  );
};

export default CreateEntry;
