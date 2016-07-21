import { createMessageStreams } from 'rxr';

const actionStreams = createMessageStreams([
  'clientsDataLoading',
  'setFilter',
  'selectClient',
  'receivedClientsData',
  'fetchClients'
]);

export default actionStreams;
