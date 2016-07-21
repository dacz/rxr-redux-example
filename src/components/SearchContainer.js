import { connectWithState } from 'rxr-react';
import actionStreams from '../actions';
import Search from './Search';

const selector = (state) => ({
  filter:    state.filter,
  setFilter: actionStreams.setFilter,
});

const SearchContainer = connectWithState(selector)(Search);

export default SearchContainer;
