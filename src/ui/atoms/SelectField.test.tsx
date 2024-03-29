import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import SelectField from './SelectField';

describe('TextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<SelectField values={[]} id="test" labelText="some label" />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <SelectField
                        values={[]}
                        id="test"
                        invalid={true}
                        labelText="some label"
                        helperText="helper text"
                        multi={true}
                        searchable={true}
                        placeholder="placeholder"
                        onChange={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('should render the label text', (): void => {
        const labelText = 'some label text';
        const { getByText } = render(<SelectField values={[]} id="test" labelText={labelText} />);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const helperText = 'some helper text';
        const { getByText } = render(
            <SelectField values={[]} id="test" labelText="some label" helperText={helperText} />,
        );
        expect(getByText(helperText)).toBeInTheDocument();
    });

    it('should render the error state', (): void => {
        const { getByText } = render(
            <SelectField values={[]} id="test" invalid={true} labelText="some label" helperText="helper text" />,
        );
        expect(getByText('helper text')).toHaveClass('typography__label--error');
    });

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container, getByText } = render(
            <SelectField
                values={[{ label: 'test-option', value: 'test' }]}
                id="test"
                invalid={true}
                labelText="some label"
                helperText="helper text"
                onChange={onChangeFn}
            />,
        );
        await fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'ArrowDown', keyCode: 40 });
        await waitFor((): Element => getByText('test-option'));
        await fireEvent.click(getByText('test-option'));
        expect(onChangeFn).toHaveBeenCalled();
    });

    it('should render default selected value', (): void => {
        const { getByText } = render(
            <SelectField
                values={[{ label: 'test-option', value: 'test' }]}
                id="test"
                invalid={true}
                labelText="some label"
                helperText="helper text"
                defaultValue={{ label: 'test-option', value: 'test' }}
            />,
        );
        expect(getByText('test-option')).toBeInTheDocument();
    });

    it('should forward className to the select-field wrapper', () => {
        const { container } = render(
            <SelectField
                className="someTestClass"
                values={[{ label: 'test-option', value: 'test' }]}
                id="test"
                labelText="some label"
            />,
        );

        expect(container.querySelector('.someTestClass')).toBeInTheDocument();
    });

    it('should clear content if clearable', async (): Promise<void> => {
        const { container, getByText } = render(
            <SelectField
                id="test"
                labelText="some label"
                placeholder="placeholder"
                values={[{ label: 'test-option', value: 'test' }]}
                defaultValue={{ label: 'test-option', value: 'test' }}
                clearable={true}
            />,
        );

        await fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'Backspace', keyCode: 8 });
        await waitFor((): Element => getByText('placeholder'));
    });
});
