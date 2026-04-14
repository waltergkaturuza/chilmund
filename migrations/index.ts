import * as migration_20260414_071208_add_quote_requests from './20260414_071208_add_quote_requests';
import * as migration_20260414_081215_add_contact_submissions from './20260414_081215_add_contact_submissions';
import * as migration_20260414_085148_add_events_and_user_roles from './20260414_085148_add_events_and_user_roles';
import * as migration_20260414_095050_add_resources_collection from './20260414_095050_add_resources_collection';
import * as migration_20260414_113848_add_awards_and_csr from './20260414_113848_add_awards_and_csr';

export const migrations = [
  {
    up: migration_20260414_071208_add_quote_requests.up,
    down: migration_20260414_071208_add_quote_requests.down,
    name: '20260414_071208_add_quote_requests',
  },
  {
    up: migration_20260414_081215_add_contact_submissions.up,
    down: migration_20260414_081215_add_contact_submissions.down,
    name: '20260414_081215_add_contact_submissions',
  },
  {
    up: migration_20260414_085148_add_events_and_user_roles.up,
    down: migration_20260414_085148_add_events_and_user_roles.down,
    name: '20260414_085148_add_events_and_user_roles',
  },
  {
    up: migration_20260414_095050_add_resources_collection.up,
    down: migration_20260414_095050_add_resources_collection.down,
    name: '20260414_095050_add_resources_collection',
  },
  {
    up: migration_20260414_113848_add_awards_and_csr.up,
    down: migration_20260414_113848_add_awards_and_csr.down,
    name: '20260414_113848_add_awards_and_csr'
  },
];
