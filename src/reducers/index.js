// import Rx from 'rxjs';
import { combineReducers } from 'rxr';
import actionStreams from '../actions';
import {
  IS_LOADING,
  CLIENTS_DATA_URL,
} from '../utils/constants';
import asyncFetchDataRx from '../utils/asyncFetchDataRx';

const clientsDataLoadingReducer$ = actionStreams.clientsDataLoading$
  .map((ts) => state => ({ ...state, clients: { ...state.clients, status: IS_LOADING, ts } }));

const setFilterReducer$ = actionStreams.setFilter$
  .map((val = '') => state => ({ ...state, filter: val }));

const selectClientReducer$ = actionStreams.selectClient$
  .map((id = '') => state => ({ ...state, selectedClient: id.toString() }));

const receivedClientsDataReducer$ = actionStreams.receivedClientsData$
  .map(({ data, error, ts }) => state => {
    if (error) {
      const err = typeof error === 'object' ? error.message : error;
      return { ...state, clients: { ...state.clients, status: err, ts } };
    }
    if (Array.isArray(data)) {
      return { ...state, clients: { data, status: undefined, ts } };
    }
    return state;
  });

const fetchClientsReducer$ = actionStreams.fetchClients$
  .flatMap((url = CLIENTS_DATA_URL) => {
    const ts = Date.now();
    // notify about the loading
    actionStreams.clientsDataLoading$.next(ts);
    return asyncFetchDataRx(url);
  }).map(val => {
    const ts = Date.now();
    const error = (val instanceof Error) ? val.message : undefined;
    const data = error ? undefined : val;
    // update state
    actionStreams.receivedClientsData$.next({ data, error, ts });
    return (state) => state;
  });

const reducer$ = combineReducers(
  clientsDataLoadingReducer$,
  setFilterReducer$,
  selectClientReducer$,
  receivedClientsDataReducer$,
  fetchClientsReducer$
);

export default reducer$;
