import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Playground from './pages/Playground';
import Glossary from './pages/Glossary';
import CreateEntry from './pages/CreateEntry';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box>
            <Navbar />
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/playground">
                <Playground />
              </Route>
              <Route path="/glossary">
                <Glossary />
              </Route>
              <Route path="/create">
                <CreateEntry />
              </Route>
              <Route path="/me">
                <Profile />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </Box>
        </Router>
        <Footer />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
