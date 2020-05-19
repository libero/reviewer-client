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
                        register={jest.fn()}
                        name="test"
                        inputRows={[{ name: '', email: '' }]}
                        maxRows={1}
                    />,
                ),
        ).not.toThrow();
    });

    it('should render 2 field rows if passed in at the start', () => {
        const inputRows = [{ name: 'bob', email: 'bob@email.com' }];
        const { getByText } = render(<ExpandingEmailField maxRows={6} register={jest.fn()} name={'test'} inputRows={inputRows} />);
    });
});
