import * as migration_20260414_071208_add_quote_requests from './20260414_071208_add_quote_requests';
import * as migration_20260414_081215_add_contact_submissions from './20260414_081215_add_contact_submissions';

export const migrations = [
  {
    up: migration_20260414_071208_add_quote_requests.up,
    down: migration_20260414_071208_add_quote_requests.down,
    name: '20260414_071208_add_quote_requests',
  },
  {
    up: migration_20260414_081215_add_contact_submissions.up,
    down: migration_20260414_081215_add_contact_submissions.down,
    name: '20260414_081215_add_contact_submissions'
  },
];
