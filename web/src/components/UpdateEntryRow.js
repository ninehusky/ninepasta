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
    <Tr>
      <Formik initialValues={{ word: 'asdf' }} onSubmit={console.log}>
        {({ values, isSubmitting }) => (
          <Form>
            <Field name="word">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor="word">Word</FormLabel>
                  <Input {...field} id="word" placeholder="fuck" />
                  <Text>asdf</Text>
                </FormControl>
              )}
            </Field>
            <Button />
          </Form>
        )}
      </Formik>
    </Tr>
  );
};

export default UpdateEntryRow;
