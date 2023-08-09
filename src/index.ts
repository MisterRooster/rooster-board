#!/usr/bin/env node

import dontev from 'dotenv-safe'
import Server from './server';

// load environment variables
dontev.config();

const server = new Server();
server.listen();