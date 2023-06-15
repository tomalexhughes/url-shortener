import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react';
import nock from 'nock';
import UrlShortener from '.';
import * as apiRequest from '../../utils/apiRequest';

describe('UrlShortener', () => {
    function fillField(value = 'http://example.com') {
        const field = screen.getByLabelText('Long URL');
        fireEvent.change(field, { target: { value } });
    }

    function submitForm() {
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    }

    async function waitForLoading() {
        return waitForElementToBeRemoved(() => screen.queryByTestId('loader'));
    }

    /**
     * Mocks restored on a per suite basis
     * As Create-React-App does not allow global restoreMocks option
     */
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('has an input field', () => {
        render(<UrlShortener />);
        const input = screen.getByLabelText('Long URL');
        expect(input).toBeInTheDocument();
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('has a submit button', () => {
        render(<UrlShortener />);
        expect(
            screen.getByRole('button', { name: 'Submit' })
        ).toBeInTheDocument();
    });

    it('shows the shortened URL on submission', async () => {
        const link = 'http://bit.ly/32fE6xW';
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link });
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(await screen.findByText(link)).toBeInTheDocument();
    });

    it('should submit the URL inputted by the user', async () => {
        const apiRequestSpy = jest
            .spyOn(apiRequest, 'default')
            .mockImplementation(() => null);
        const value = 'aTestURL';
        render(<UrlShortener />);
        fillField(value);
        submitForm();
        await waitForLoading();
        expect(apiRequestSpy.mock.calls[0][0].payload.long_url).toEqual(value);
    });

    it('should show an error message if the API returns a response with ok as false', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(
            await screen.findByText('please try again', { exact: false })
        ).toBeInTheDocument();
    });

    it('should remove the displayed error on input', async () => {
        jest.spyOn(apiRequest, 'default').mockImplementation(() =>
            Promise.reject()
        );
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(
            await screen.findByText('please try again', { exact: false })
        ).toBeInTheDocument();
        fillField('aNewValue');
        expect(
            screen.queryByText('please try again', { exact: false })
        ).not.toBeInTheDocument();
    });

    it('should clear the error on submission', async () => {
        const link = 'http://bit.ly/32fE6xW';

        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, {});
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(
            await screen.findByText('please try again', { exact: false })
        ).toBeInTheDocument();

        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link });
        submitForm();
        expect(await screen.findByText(link)).toBeInTheDocument();
        expect(
            screen.queryByText('please try again', { exact: false })
        ).not.toBeInTheDocument();
    });

    it('should show a reset button after receiving a shortened link', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link: 'foobar' });
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(
            await screen.findByRole('button', { name: 'Reset' })
        ).toBeInTheDocument();
    });

    it('should show the form after pressing the reset button', async () => {
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(200, { link: 'foobar' });
        render(<UrlShortener />);
        fillField();
        submitForm();
        fireEvent.click(await screen.findByRole('button', { name: 'Reset' }));
        expect(screen.getByLabelText('Long URL')).toBeInTheDocument();
    });

    it('should show the error description returned via the API', async () => {
        const description = 'an error message';
        nock('https://api-ssl.bitly.com')
            .post('/v4/shorten')
            .reply(400, { description });
        render(<UrlShortener />);
        fillField();
        submitForm();
        expect(await screen.findByText(description)).toBeInTheDocument();
    });

    it('should send a trimmed string', async () => {
        const apiRequestSpy = jest
            .spyOn(apiRequest, 'default')
            .mockImplementation(() => null);
        render(<UrlShortener />);
        fillField('abc   ');
        submitForm();
        await waitForLoading();
        expect(apiRequestSpy.mock.calls[0][0].payload.long_url).toEqual('abc');
    });

    it('should show an error if the user attempts to send an empty string', () => {
        render(<UrlShortener />);
        submitForm();
        expect(screen.getByText('URL cannot be empty.')).toBeInTheDocument();
    });
});
