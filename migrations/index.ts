import * as migration_20260414_071208_add_quote_requests from './20260414_071208_add_quote_requests';

export const migrations = [
  {
    up: migration_20260414_071208_add_quote_requests.up,
    down: migration_20260414_071208_add_quote_requests.down,
    name: '20260414_071208_add_quote_requests'
  },
];
