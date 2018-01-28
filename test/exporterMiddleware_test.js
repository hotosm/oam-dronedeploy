import test from 'tape';
import { getDateRange } from '../src/store/exporterMiddleware';

test('exporterMiddleware getDateRange returns min max object', (t) => {
  const images = [
    {
      date_creation:
      {
        $date: '2015:08:01 15:03:39'
      }
    },
    {
      date_creation:
      {
        $date: '2015:08:02 15:03:39'
      }
    }
  ];

  const range = getDateRange(images);
  t.equal(range.min, '2015-08-01T15:03:39.000Z');
  t.equal(range.max, '2015-08-02T15:03:39.000Z');
  t.end();
});
