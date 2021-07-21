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
import Login from '../pages/Login';

const LoginSchema = Yup.object().shape({
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
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPass = () => setShowPassword(!showPassword);

  let apiError = null;

  return (
    <Container m={5} p={10}>
      <Center>
        <VStack>
          <Heading as="h1">Log in</Heading>
        </VStack>
      </Center>
      <Divider m={5} />
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await fetch('http://localhost:3141/users/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                username: values.username,
                password: values.password,
              }),
            });
            const json = await response.json();
            if (!response.ok) {
              apiError = json.message;
              console.log(apiError);
            } else {
              console.log(json);
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
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                onClick={() => console.log(values)}
              >
                Log In
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
