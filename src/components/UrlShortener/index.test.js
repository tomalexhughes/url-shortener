import React from 'react';
import {
    render,
    fireEvent,
    getByLabelText,
    getByText,
    waitForElementToBeRemoved,
    queryByTestId
} from '@testing-library/react';
import nock from 'nock';
import UrlShortener from '.';
import * as apiRequest from '../../utils/apiRequest';

describe('UrlShortener', () => {
    function fillField(container, value = 'http://example.com') {
        const field = getByLabelText(container, 'Long URL');
        fireEvent.change(field, { target: { value } });
    }

    function submitForm(container) {
        fireEvent.click(getByText(container, 'Submit'));
    }

    async function waitForLoading(container) {
        return waitForElementToBeRemoved(() =>
            queryByTestId(container, 'loader')
        );
    }

    /**
     * Mocks restored on a per suite basis
     * As Create-React-App does not allow global restoreMocks option
     */
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('has an input field', () => {
        const { queryByLabelText } = render(<UrlShortener />);
        const input = queryByLabelText('Long URL');
        expect(input).not.toBeNull();
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('has a submit button', () => {
        const { queryByText } = render(<UrlShortener />);
        expect(queryByText('Submit')).not.toBeNull();
    });

    it('shows the shortened URL on submission', async () => {
        const link = 'http://bit.ly/32fE6xW';
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link });
        const { container, findByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(await findByText(link)).toBeInTheDocument();
    });

    it('should submit the URL inputted by the user', async () => {
        const apiRequestSpy = jest
            .spyOn(apiRequest, 'default')
            .mockImplementation(() => null);
        const value = 'aTestURL';
        const { container } = render(<UrlShortener />);
        fillField(container, value);
        submitForm(container);
        await waitForLoading(container);
        expect(apiRequestSpy.mock.calls[0][0].payload.long_url).toEqual(value);
    });

    it('should show an error message if the API returns a response with ok as false', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});
        const { container, findByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(
            await findByText('please try again', { exact: false })
        ).toBeInTheDocument();
    });

    it('should remove the displayed error on input', async () => {
        jest.spyOn(apiRequest, 'default').mockImplementation(() =>
            Promise.reject()
        );
        const { container, findByText, queryByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(
            await findByText('please try again', { exact: false })
        ).toBeInTheDocument();
        fillField(container, 'aNewValue');
        expect(queryByText('please try again', { exact: false })).toBeNull();
    });

    it('should clear the error on submission', async () => {
        const link = 'http://bit.ly/32fE6xW';

        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});
        const { container, findByText, queryByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(
            await findByText('please try again', { exact: false })
        ).toBeInTheDocument();

        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link });
        submitForm(container);
        expect(await findByText(link)).toBeInTheDocument();
        expect(queryByText('please try again', { exact: false })).toBeNull();
    });

    it('should show a reset button after receiving a shortened link', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link: 'foobar' });
        const { container, findByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(await findByText('Reset')).toBeInTheDocument();
    });

    it('should show the form after pressing the reset button', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link: 'foobar' });
        const { container, findByText, queryByLabelText } = render(
            <UrlShortener />
        );
        fillField(container);
        submitForm(container);
        expect(await findByText('Reset')).toBeInTheDocument();
        fireEvent.click(getByText(container, 'Reset'));
        expect(queryByLabelText('Long URL')).not.toBeNull();
    });

    it('should show the error description returned via the API', async () => {
        const description = 'an error message';
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, { description });
        const { container, findByText } = render(<UrlShortener />);
        fillField(container);
        submitForm(container);
        expect(await findByText(description)).toBeInTheDocument();
    });

    it('should send a trimmed string', async () => {
        const apiRequestSpy = jest
            .spyOn(apiRequest, 'default')
            .mockImplementation(() => null);
        const { container } = render(<UrlShortener />);
        fillField(container, 'abc   ');
        submitForm(container);
        await waitForLoading(container);
        expect(apiRequestSpy.mock.calls[0][0].payload.long_url).toEqual('abc');
    });

    it('should show an error if the user attempts to send an empty string', () => {
        const { container, queryByText } = render(<UrlShortener />);
        submitForm(container);
        expect(queryByText('URL cannot be empty.')).not.toBeNull();
    });
});
