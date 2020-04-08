import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

import NoSubmissions from './NoSubmissions';

describe('NoSubmissions', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<NoSubmissions onStartClick={(): void => {}} />)).not.toThrow();
    });

    it('should call the onStartClick callback when the button is clicked', (): void => {
        const onStartClick = jest.fn();
        const { getByText } = render(<NoSubmissions onStartClick={onStartClick} />);
        fireEvent.click(getByText('new-submission'));
        expect(onStartClick).toHaveBeenCalledTimes(1);
    });
});
