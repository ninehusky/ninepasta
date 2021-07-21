import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box height="90vh">
          <Navbar />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users">users</Route>
            <Route path="/">home</Route>
          </Switch>
        </Box>
      </Router>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
