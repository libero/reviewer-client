import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import ExpandingTextField from './ExpandingTextField';

describe('ExpandingTextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ExpandingTextField id="test" />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(<ExpandingTextField id="test" helperText="helper text" invalid={true} labelText="label" />),
        ).not.toThrow();
    });

    it('should render the label text', (): void => {
        const labelText = 'some label text';
        const { getByText } = render(<ExpandingTextField id="test" invalid={false} labelText={labelText} />);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const helperText = 'some helper text';
        const { getByText } = render(
            <ExpandingTextField id="test" invalid={false} labelText="some label" helperText={helperText} />,
        );
        expect(getByText(helperText)).toBeInTheDocument();
    });

    it('should render the error state', (): void => {
        const { getByText, getByLabelText } = render(
            <ExpandingTextField id="test" invalid={true} labelText="some label" helperText="helper text" />,
        );
        expect(getByText('helper text')).toHaveClass('typography__label--error');
        expect(getByLabelText('some label')).toHaveClass('text-field__input--invalid');
    });

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container } = render(
            <ExpandingTextField
                id="test"
                invalid={true}
                labelText="some label"
                helperText="helper text"
                onChange={onChangeFn}
            />,
        );
        await fireEvent.change(container.querySelector('textarea'), { target: { value: 'test' } });
        expect(onChangeFn).toHaveBeenCalled();
    });
});
