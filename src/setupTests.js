/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import nock from 'nock';
import '@testing-library/jest-dom/extend-expect';

global.fetch = fetch;

// Prevents fetch requests being made in tests
nock.disableNetConnect();
