import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import { User } from './entities/User';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'reddit-clone',
  type: 'postgresql',
  user: 'postgres',
  password: '1234567890',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
