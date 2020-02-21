import React from 'react';
import { render, RenderResult, fireEvent, cleanup, act } from '@testing-library/react';
import FileUpload from './FileUpload';

function dispatchEvt(node: Document | Element | Window, type: string, data: unknown): void {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, data);
    fireEvent(node, event);
}

function mockData(files: File[]): Record<string, unknown> {
    return {
        dataTransfer: {
            files,
            items: files.map(
                (file): Record<string, unknown> => ({
                    kind: 'file',
                    type: file.type,
                    getAsFile: (): File => file,
                }),
            ),
            types: ['Files'],
        },
    };
}

describe('FileUpload', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<FileUpload />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult => render(<FileUpload inactiveContent={<div />} activeContent={<div />} />),
        ).not.toThrow();
    });

    it('should render default inactive content when inactive', (): void => {
        const { getByText, queryByText } = render(<FileUpload />);

        expect(getByText('manuscript-upload.inactive-content')).not.toBeNull();
        expect(queryByText('manuscript-upload.active-content')).toBeNull();
    });

    it('should render default active content when active', async (): Promise<void> => {
        const ui = <FileUpload />;
        const { container, getByText, queryByText } = render(ui);
        const dropzone = container.querySelector('.manuscript-upload__dropzone');
        const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        await act(
            async (): Promise<void> => {
                dispatchEvt(dropzone, 'dragenter', data);
            },
        );

        expect(getByText('manuscript-upload.active-content')).not.toBeNull();
        expect(queryByText('manuscript-upload.inactive-content')).toBeNull();
    });

    it('should render custom inactive content when inactive', (): void => {
        const { getByText, queryByText } = render(<FileUpload inactiveContent="custom inactive content" />);

        expect(getByText('custom inactive content')).not.toBeNull();
        expect(queryByText('manuscript-upload.active-content')).toBeNull();
    });

    it('should render custom active content when active', async (): Promise<void> => {
        const ui = <FileUpload activeContent="custom active content" />;
        const { container, getByText, queryByText } = render(ui);
        const dropzone = container.querySelector('.manuscript-upload__dropzone');
        const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        await act(
            async (): Promise<void> => {
                dispatchEvt(dropzone, 'dragenter', data);
            },
        );

        expect(getByText('custom active content')).not.toBeNull();
        expect(queryByText('manuscript-upload.inactive-content')).toBeNull();
    });
});
