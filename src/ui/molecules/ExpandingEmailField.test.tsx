import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import ExpandingEmailField from './ExpandingEmailField';

describe('Expanding Email Field', () => {
    afterEach(cleanup);

    it('should render correctly', () => {
        expect(
            (): RenderResult =>
                render(
                    <ExpandingEmailField
                        name="test"
                        initialRows={[{ name: '', email: '' }]}
                        maxRows={1}
                        onChange={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('should render 1 empty field row if none passed in', () => {
        const { container } = render(
            <ExpandingEmailField
                maxRows={6}
                name={'test'}
                initialRows={[{ name: '', email: '' }]}
                onChange={jest.fn()}
            />,
        );
        expect(container.querySelector('[name="test[0].name"]')).toBeInTheDocument();
        expect(container.querySelector('[name="test[0].email"]')).toBeInTheDocument();
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(1);
    });

    it('should render 2 field rows if a populated inputRow is passed in', () => {
        const inputRows = [{ name: 'bob', email: 'bob@email.com' }];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputRows} onChange={jest.fn()} />,
        );
        expect(container.querySelector('[name="test[0].name"]')).toBeInTheDocument();
        expect(container.querySelector('[name="test[0].email"]')).toBeInTheDocument();
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(2);
    });

    it('should trim email field if passsed in', () => {
        const inputRows = [{ name: 'bob', email: '   bob@email.com' }];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputRows} onChange={jest.fn()} />,
        );
        expect(container.querySelector('[name="test[0].name"]')).toBeInTheDocument();
        expect(container.querySelector('[name="test[0].email"]')).toBeInTheDocument();
        expect((container.querySelector('[name="test[0].email"]') as HTMLInputElement).value).toBe('bob@email.com');
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(2);
    });

    it('should add a new row if text is entered into the last row', () => {
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={[]} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(1);
        fireEvent.input(container.querySelector('[name="test[0].name"]'), { target: { value: 'bob' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(2);
    });

    it('should add a new row if text is entered into the last row with multiple existing rows', () => {
        const inputFields = [
            { name: 'name: 0', email: 'email: 0' },
            { name: 'name: 1', email: 'email: 1' },
            { name: 'name: 2', email: 'email: 2' },
            { name: 'name: 3', email: 'email: 3' },
        ];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputFields} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(5);
        fireEvent.input(container.querySelector('[name="test[4].name"]'), { target: { value: 'bob' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(6);
    });

    it('should not add a new row if max rows reached', () => {
        const inputFields = [
            { name: 'name: 0', email: 'email: 0' },
            { name: 'name: 1', email: 'email: 1' },
            { name: 'name: 2', email: 'email: 2' },
            { name: 'name: 3', email: 'email: 3' },
            { name: 'name: 4', email: 'email: 4' },
            { name: '', email: '' },
        ];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputFields} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(6);
        fireEvent.input(container.querySelector('[name="test[5].name"]'), { target: { value: 'bob' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(6);
    });

    it('should remove a row if last two rows are blank', () => {
        const inputFields = [
            { name: 'name: 0', email: 'email: 0' },
            { name: 'name: 1', email: 'email: 1' },
            { name: 'name: 2', email: 'email: 2' },
            { name: 'name: 3', email: 'email: 3' },
        ];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputFields} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(5);
        fireEvent.change(container.querySelector('[name="test[3].name"]'), { target: { value: '' } });
        fireEvent.change(container.querySelector('[name="test[3].email"]'), { target: { value: '' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(4);
    });

    it('should remove multiple rows if multiple last rows are blank', () => {
        const inputFields = [
            { name: 'name: 0', email: 'email: 0' },
            { name: 'name: 1', email: 'email: 1' },
            { name: '', email: '' },
            { name: 'name: 3', email: 'email: 3' },
            { name: '', email: '' },
        ];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputFields} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(5);
        fireEvent.input(container.querySelector('[name="test[3].name"]'), { target: { value: '' } });
        fireEvent.input(container.querySelector('[name="test[3].email"]'), { target: { value: '' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(3);
    });

    it('should not remove the row if the alternate field of the row has a value', () => {
        const inputFields = [
            { name: 'name: 0', email: 'email: 0' },
            { name: 'name: 1', email: 'email: 1' },
            { name: 'name: 2', email: 'email: 2' },
            { name: 'name: 3', email: 'email: 3' },
            { name: '', email: '' },
        ];
        const { container } = render(
            <ExpandingEmailField maxRows={6} name={'test'} initialRows={inputFields} onChange={jest.fn()} />,
        );
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(5);
        fireEvent.input(container.querySelector('[name="test[3].name"]'), { target: { value: '' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(5);
        fireEvent.input(container.querySelector('[name="test[3].email"]'), { target: { value: '' } });
        expect(container.querySelectorAll('.expanding-email-field__row')).toHaveLength(4);
    });

    it('forwards the passed className', () => {
        const { container } = render(
            <ExpandingEmailField
                className="testClassName"
                maxRows={6}
                name="test"
                initialRows={[{ name: '', email: '' }]}
                onChange={jest.fn()}
            />,
        );
        expect(container.querySelector('.testClassName')).toBeInTheDocument();
    });
});
