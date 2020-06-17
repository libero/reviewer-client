import '../../../test-utils/i18n-mock';
import * as yup from 'yup';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import DisclosureForm from './DisclosureForm';
import { Submission } from '../types';
import { DisclosureSchema } from '../utils/validationSchemas';

const mutationMock = jest.fn();

jest.mock('../hooks/useAutoSave', () => (cb: () => void, deps: DependencyList): void => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            cb();
        } else {
            initialRender.current = false;
        }
    }, deps);
});

jest.mock('@apollo/react-hooks', () => ({
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
}));

const ButtonComponent = ({
    triggerValidation,
}: {
    _: Function;
    triggerValidation: () => Promise<boolean>;
}): JSX.Element => (
    <button
        onClick={(): void => {
            triggerValidation();
        }}
    >
        TEST BUTTON
    </button>
);

const initialValues: Submission = {
    author: {
        firstName: 'Conker',
        lastName: 'The Squirrel',
        email: 'conker@squirrelking.com',
        institution: 'All the Lands',
    },
    id: 'foo',
    articleType: 'Proclomation',
    updated: 0,
    manuscriptDetails: {
        title: 'Squirrels Rule',
    },
};

describe('DisclosureForm', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(
                <DisclosureForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={initialValues} />,
            );
        }).not.toThrow();
    });

    describe('Submission infomation', () => {
        it('should render the author name', () => {
            const { getByText } = render(
                <DisclosureForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={initialValues}
                    ButtonComponent={ButtonComponent}
                />,
            );
            expect(getByText('Conker The Squirrel')).toBeInTheDocument();
        });

        it('should render the manuscript title', () => {
            const { getByText } = render(
                <DisclosureForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={initialValues}
                    ButtonComponent={ButtonComponent}
                />,
            );
            expect(getByText('Squirrels Rule')).toBeInTheDocument();
        });

        it('should render the article type', () => {
            const { getByText } = render(
                <DisclosureForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={initialValues}
                    ButtonComponent={ButtonComponent}
                />,
            );
            expect(getByText('Proclomation', { exact: false })).toBeInTheDocument();
        });
    });

    describe('validation', () => {
        it('shows error for empty signature and consent checkbox', async (): Promise<void> => {
            const { getByText, container } = render(
                <DisclosureForm
                    schemaFactory={DisclosureSchema}
                    initialValues={initialValues}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(2);
            expect(getByText('disclosure.validation.signature')).toBeInTheDocument();
            expect(getByText('disclosure.validation.consent')).toBeInTheDocument();
        });
    });
});
