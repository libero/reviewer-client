import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ImageWithAttribution from './ImageWithAttribution';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<ImageWithAttribution image={''} artistName={''} artistUrl={''} align={'left'} />),
        ).not.toThrow();
    });

    it('should append the type string passed to a button-- class', (): void => {
        const { getByText } = render(<ImageWithAttribution image={''} artistName={''} artistUrl={''} align={'left'} />);
        expect(getByText('image-attribution')).toBeInTheDocument();
    });

    it('should append the alignment to the classname', (): void => {
        const { container } = render(<ImageWithAttribution image={''} artistName={''} artistUrl={''} align={'left'} />);
        expect(container.querySelector('.image-attributed__image--left')).toBeInTheDocument();
    });
});
