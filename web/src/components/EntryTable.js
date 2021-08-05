import { React, useEffect, useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

import EntryRow from './EntryRow';

const EntryTable = () => {
  const [table, setTable] = useState(null);

  useEffect(async () => {
    const response = await fetch('http://localhost:3141/api/v1/entries', {
      method: 'GET',
      credentials: 'include',
    });
    const json = await response.json();
    setTable(json);
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>word</Th>
          <Th>emoji</Th>
          <Th>absurdity</Th>
          <Th>description</Th>
        </Tr>
      </Thead>
      <Tbody>
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
