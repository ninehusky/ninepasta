import { React, useEffect, useState } from 'react';

import { Table, Thead, Tbody, Tr, Th, Button } from '@chakra-ui/react';

import EntryRow from './EntryRow';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const EntryTable = () => {
  const [table, setTable] = useState(null);

  useEffect(async () => {
    const response = await fetch(
      'https://ninepasta.herokuapp.com/api/v1/entries',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const json = await response.json();
    setTable(json);
  }, []);

  return (
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
                <EntryRow
                  word={entry.word}
                  emoji={entry.emoji}
                  absurdity={entry.absurdity}
                  description={entry.description}
                  key={index}
                />
              );
            })
          : null}
      </Tbody>
    </Table>
  );
};

export default EntryTable;
