import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, Item, SearchContainer, Paragraph } from './extendedList.styles';

export const ExtendedList = ({ data = [], renderItem, onAddClick }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setFilteredItems(data.filter((item) => {
      return !query || `${Object.values(item).join(' ').toLowerCase()}`.includes(query);
    }));
  }, [data, query]);

  const renderEmptyList = renderWhenTrue(() => (
    <Paragraph>
      Lista rekordów jest pusta
    </Paragraph>
  ));

  const renderAddButton = renderWhenTrue(() => (
    <Button color="primary" variant="contained" onClick={onAddClick}>
      <AddIcon />
    </Button>
  ));

  return (
    <>
      <SearchContainer>
        <TextField
          placeholder="Wpisz frazę, aby wyszukać"
          fullWidth
          value={query}
          onChange={handleSearchChange}
        />
        {renderAddButton(!!onAddClick)}
      </SearchContainer>
      <Container>
        {filteredItems.map((item, index) => (
          <Item key={index}>{renderItem(item)}</Item>
        ))}
        {renderEmptyList(!filteredItems.length)}
      </Container>
    </>
  );
};

ExtendedList.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onAddClick: PropTypes.func,
};
