import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Button />)).not.toThrow();
    });

    it('should render correctly when passed all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <Button type="primary" className="some-class" loading={false} disabled={false}>
                        test
                    </Button>,
                ),
        ).not.toThrow();
    });

    it('should append the type string passed to a button-- class', (): void => {
        const { container } = render(<Button type="primary">test</Button>);
        expect(container.querySelector('.button--primary')).toBeInTheDocument();
    });

    it('should call function when clicked', (): void => {
        const mockFn = jest.fn();
        const { container } = render(<Button onClick={mockFn} />);
        fireEvent.click(container.querySelector('button'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should append passed className to button styling classes', (): void => {
        const { container } = render(<Button className="some-class">test</Button>);
        expect(container.querySelector('.some-class')).toBeInTheDocument();
    });

    it('should be disabled if the disabled prop is true', (): void => {
        const { container } = render(<Button disabled={true}>test</Button>);
        expect(container.querySelector('.button')).toBeDisabled();
    });

    it('should be have the button--loading class on the text if the prop is true', (): void => {
        const { container } = render(<Button loading={true}>test</Button>);
        expect(container.querySelector('.button__text')).toHaveClass('button--loading');
    });

    it('should have a submit attribute if isSubmit is set', (): void => {
        const { container } = render(<Button isSubmit>test</Button>);
        expect(container.querySelector('[type="submit"]')).toBeInTheDocument();
    });
});
