import {
  Input,
  Container,
  Stack,
  Button,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  FormHelperText,
  Heading,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters!')
    .max(20, 'Username must be at most 20 characters!')
    .matches(
      /^[A-Za-z0-9]+$/,
      'Username must contain only alphanumeric characters'
    )
    .required('Please enter a username.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
    .matches(
      /^[\x00-\x7F]+$/,
      'Password should only consist of letters, numbers, and special chars'
    )
    .required('Please enter a password.'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required('Please confirm your password.'),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPass = () => setShowPassword(!showPassword);

  let apiError = null;

  return (
    <Container m={5} p={10}>
      <Center>
        <VStack>
          <Heading as="h1">Sign Up</Heading>
          <Text as="h2">It's quick and easy.</Text>
        </VStack>
      </Center>
      <Divider m={5} />
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await fetch('http://localhost:3141/users', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: values.username,
                password: values.password,
              }),
            });
            if (!response.ok) {
              const json = await response.json();
              apiError = json.message;
              console.log(apiError);
            } else {
              apiError = null;
            }
          } catch (err) {
            apiError = 'There was an error.';
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Stack spacing={4}>
              {apiError ? (
                <Alert status="error">
                  <AlertIcon />
                  {apiError}
                </Alert>
              ) : null}
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input {...field} id="username" placeholder="Username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    <FormHelperText>
                      Username should consist of 5-20 alphanumeric characters.
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        id="password"
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText>
                      Password should be at least 8 characters long.
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirm">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.confirm && form.touched.confirm}
                  >
                    <FormLabel htmlFor="password">Confirm Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        id="confirm"
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText>
                      We'll never ask you for your password ever.
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.confirm}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                onClick={() => console.log(values)}
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;
