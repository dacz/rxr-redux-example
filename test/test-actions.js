import Rx from 'rxjs';
import test from 'ava';
import actionStreams from '../src/actions';
import reducer$ from '../src/reducers';

// TODO add this test to rxr

test.only('actionStreams - setFilter', t => {
  const valWanted = [
    1,
    'hi',
    { some: 'obj' },
    [ 1, 2, 4 ]
  ];
  actionStreams.setFilter$.subscribe(val => {
    t.deepEqual(val, valWanted.shift());
  });
  const valWantedCopy = [].concat(valWanted);
  valWantedCopy.forEach(item => {
    actionStreams.setFilter(item);
  });
});

test.only('actionStreams - reducer', t => {
  const s = new Rx.Subject;
  s.subscribe(v => {
    console.log('test: ', v);
    t.pass();
  });
  reducer$.map(v => {
    console.log('from reducer in index: ', v);
    s.next(v);
    return v;
  });
  actionStreams.selectClient('asjhjjhjhjasd');

  // t.pass();
});
