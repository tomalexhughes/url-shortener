import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import nock from 'nock';
import App from '.';
import * as apiRequest from '../../utils/apiRequest';

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has an input field', () => {
        const { queryByLabelText } = render(<App />);
        const input = queryByLabelText('Long URL');
        expect(input).not.toBeNull();
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('has a submit button', () => {
        const { queryByText } = render(<App />);
        expect(queryByText('Submit')).not.toBeNull();
    });

    it('shows the shortened URL on submission', async () => {
        const link = 'http://bit.ly/32fE6xW';
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link });
        const { getByText, queryByText } = render(<App />);
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        await waitForElement(() => queryByText(link));
    });

    it('should submit the URL inputted by the user', () => {
        const apiRequestSpy = jest
            .spyOn(apiRequest, 'default')
            .mockImplementation(() => null);
        const value = 'aTestURL';
        const { getByLabelText, getByText } = render(<App />);
        fireEvent.change(getByLabelText('Long URL'), { target: { value } });
        fireEvent.click(getByText('Submit'));
        expect(apiRequestSpy.mock.calls[0][0].payload.long_url).toEqual(value);
    });

    it('should show an error message if the API returns a response with ok as false', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});
        const { getByText, queryByText } = render(<App />);
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        await waitForElement(() =>
            queryByText('please try again', { exact: false })
        );
    });

    it('should remove the displayed error on input', async () => {
        jest.spyOn(apiRequest, 'default').mockImplementation(() =>
            Promise.reject()
        );
        const { getByLabelText, getByText, queryByText } = render(<App />);
        fireEvent.click(getByText('Submit'));
        await waitForElement(() =>
            queryByText('please try again', { exact: false })
        );
        fireEvent.change(getByLabelText('Long URL'), {
            target: { value: 'foo' }
        });
        expect(queryByText('please try again', { exact: false })).toBeNull();
    });
});
