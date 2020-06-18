import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ThankYouPage from './ThankYouPage';
import { Submission } from '../types';
import routerWrapper from '../../../test-utils/routerWrapper';

describe('ThankYouPage', (): void => {
    const submission: Submission = {
        id: 'id',
        manuscriptDetails: {
            title: 'Science',
        },
        articleType: 'research-article',
        updated: new Date().getTime(),
    };

    const incompleteSubmission: Submission = {
        id: 'id',
        articleType: 'research-article',
        updated: new Date().getTime(),
    };

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<ThankYouPage submission={submission} />, {
                wrapper: routerWrapper(),
            });
        }).not.toThrow();
    });

    it('it should render with title', (): void => {
        const { container } = render(<ThankYouPage submission={submission} />, {
            wrapper: routerWrapper(),
        });
        expect(container.querySelector('.title').innerHTML).toBe('p1');
    });

    it('should not throw if manuscriptDetails are not present', (): void => {
        const { container } = render(<ThankYouPage submission={incompleteSubmission} />, {
            wrapper: routerWrapper(),
        });
        expect(container.querySelector('.title').innerHTML).toBe('p1');
    });
});
