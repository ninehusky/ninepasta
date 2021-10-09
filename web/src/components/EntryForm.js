import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  HStack,
  Select,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';

import * as Yup from 'yup';

const EntryForm = props => {
  const EntrySchema = Yup.object().shape({
    word: Yup.string()
      .min(1)
      .matches(/^[A-za-z0-9]+$/, 'Word must be exactly one alphanumeric word!')
      .required('Please enter a word.'),
    emoji: Yup.string()
      .matches(new RegExp('^\\p{Emoji}$', 'u'), 'You must enter 1 emoji!')
      .required('Please enter an emoji.'),
    absurdity: Yup.string().required('Please select an absurdity rating'),
    description: Yup.string()
      .min(10, 'Your description should be at least 10 characters')
      .required('Please enter a description.'),
  });

  return (
    <Formik
      initialValues={{
        word: props.word,
        emoji: props.emoji,
        absurdity: props.absurdity,
        description: props.description,
      }}
      validationSchema={EntrySchema}
      onSubmit={props.onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          {props.apiError ? (
            <Alert status="error">
              <AlertIcon />
              {props.apiError}
            </Alert>
          ) : null}
          <Field name="word">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.word && form.touched.word}
                mb={5}
              >
                <FormLabel htmlFor="word">Word</FormLabel>
                <Input {...field} id="word" placeholder="word" />
                <FormErrorMessage>{form.errors.word}</FormErrorMessage>
                <FormHelperText>
                  The word should be made of alphanumeric characters.
                </FormHelperText>
              </FormControl>
            )}
          </Field>
          <HStack mb={5}>
            <Field name="emoji">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.emoji && form.touched.emoji}
                >
                  <FormLabel htmlFor="emoji">Emoji</FormLabel>
                  <Input
                    {...field}
                    id="word"
                    placeholder={props.emoji || '🐶'}
                  />
                  <FormErrorMessage>{form.errors.emoji}</FormErrorMessage>
                  <FormHelperText>Enter one emoji.</FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="absurdity">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.absurdity && form.touched.absurdity}
                >
                  <FormLabel htmlFor="absurdity">Absurdity</FormLabel>
                  <Select {...field} placeholder="Select option">
                    <option value="concrete">Concrete</option>
                    <option value="reasonable">Reasonable</option>
                    <option value="outlandish">Outlandish</option>
                  </Select>
                  <FormErrorMessage>{form.errors.absurdity}</FormErrorMessage>
                  <FormHelperText>Fill this out!</FormHelperText>
                </FormControl>
              )}
            </Field>
          </HStack>
          <Field name="description">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  {...field}
                  id="description"
                  placeholder="this emoji pair is..."
                />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                <FormHelperText>
                  Description should be at least 10 characters.
                </FormHelperText>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EntryForm;
