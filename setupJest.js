// Setup Jest to mock fetch

import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

jest.setMock('node-fetch', fetch);
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies

Enzyme.configure({ adapter: new Adapter() });
