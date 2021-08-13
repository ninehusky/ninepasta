import { React, useEffect, useState } from 'react';

import { Table, Thead, Tbody, Tr, Th, Button } from '@chakra-ui/react';

import UpdateEntryRow from './UpdateEntryRow';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UpdateTable = props => {
  const [table, setTable] = useState(null);

  useEffect(async () => {
    console.log(props);
    const response = await fetch(
      'http://localhost:3141/api/v1/entries?userId=' + props.userId,
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
                <UpdateEntryRow
                  word={entry.word}
                  emoji={entry.emoji}
                  absurdity={entry.absurdity}
                  description={entry.description}
                  id={entry.id}
                  update={true}
                  delete={true}
                  key={index}
                />
              );
            })
          : null}
      </Tbody>
    </Table>
  );
};

export default UpdateTable;
