// Setup Jest to mock fetch

import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies

jest.setMock('node-fetch', fetch);
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies
