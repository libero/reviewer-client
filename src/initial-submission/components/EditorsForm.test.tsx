import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render } from '@testing-library/react';
import EditorsForm from './EditorsForm';
import { Submission } from '../types';

const mutationMock = jest.fn();
const testInitialValues: Submission = {
    id: 'blah',
    articleType: '',
    updated: Date.now(),
};

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
    useQuery: (
        _: unknown,
        variables: { role: string },
    ): { data: Array<Record<string, object | string>>; loading: boolean } => {
        if (variables.role === 'seniorEditors') {
            return {
                data: [
                    {
                        id: '1',
                        name: 'Bob',
                        aff: 'Institution 1',
                        focuses: ['Tag 1', 'Tag 2'],
                        expertises: ['Tag 3'],
                    },
                    {
                        id: '2',
                        name: 'Batman',
                        aff: 'Institution 2',
                        focuses: ['Tag 1', 'Tag 2'],
                        expertises: ['Tag 3'],
                    },
                ],
                loading: false,
            };
        }
        return {
            data: [
                {
                    id: '3',
                    name: 'Jack',
                    aff: 'Institution 1',
                    focuses: ['Tag 1', 'Tag 2'],
                    expertises: ['Tag 3'],
                },
                {
                    id: '4',
                    name: 'James',
                    aff: 'Institution 2',
                    focuses: ['Tag 1', 'Tag 2'],
                    expertises: ['Tag 3'],
                },
            ],
            loading: false,
        };
    },
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
}));

describe('DetailsForm', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<EditorsForm initialValues={testInitialValues} />);
        }).not.toThrow();
    });
});
