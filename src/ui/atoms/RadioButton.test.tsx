import React from 'react';
import RadioButton from './RadioButton';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

describe('Pod', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<RadioButton options={[]} name="radioButton" />)).not.toThrow();
    });
    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <RadioButton
                        register={(): void => {}}
                        options={[
                            { value: 'chicken wings', label: 'Chicken Wings' },
                            { value: 'baconburger', label: 'Bacon Burger' },
                        ]}
                        name="radioButton"
                    />,
                ),
        ).not.toThrow();
    });

    it('displays correct label for each radio button', (): void => {
        const { getByText } = render(
            <RadioButton
                register={(): void => {}}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                ]}
                name="radioButton"
            />,
        );
        expect(getByText('Chicken Wings')).toBeInTheDocument();
        expect(getByText('Bacon Burger')).toBeInTheDocument();
    });
    it('checks radio button if selected', (): void => {
        const { container } = render(
            <RadioButton
                register={(): void => {}}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                ]}
                name="radioButton"
            />,
        );
        const radioInput = container.querySelector('.radio-button__input[value="chicken wings"]') as HTMLInputElement;
        expect(radioInput.checked).toBe(false);
        fireEvent.click(radioInput);
        expect(radioInput.checked).toBe(true);
    });
    it('renders radio with correct value', (): void => {
        const { container } = render(
            <RadioButton
                register={(): void => {}}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                ]}
                name="radioButton"
            />,
        );
        expect(container.querySelector('.radio-button__input[value="chicken wings"]')).toBeInTheDocument();
        expect(container.querySelector('.radio-button__input[value="baconburger"]')).toBeInTheDocument();
    });
    it('renders radio with correct name', (): void => {
        const { container } = render(
            <RadioButton
                register={(): void => {}}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                ]}
                name="radioButton"
            />,
        );
        expect(container.querySelectorAll('.radio-button__input[name="radioButton"]')).toHaveLength(2);
    });
    it('registers each input', (): void => {
        const mockRegister = jest.fn();
        expect(mockRegister).toBeCalledTimes(0);
        const { rerender } = render(
            <RadioButton
                register={mockRegister}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                ]}
                name="radioButton"
            />,
        );
        expect(mockRegister).toBeCalledTimes(2);
        rerender(
            <RadioButton
                register={mockRegister}
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                    { value: 'chicken fajitas', label: 'Chicken Fajitas' },
                ]}
                name="radioButton"
            />,
        );
        expect(mockRegister).toBeCalledTimes(3);
    });
    it('sets inital value to checked', (): void => {
        const { container } = render(
            <RadioButton
                initialValue="baconburger"
                options={[
                    { value: 'chicken wings', label: 'Chicken Wings' },
                    { value: 'baconburger', label: 'Bacon Burger' },
                    { value: 'chicken fajitas', label: 'Chicken Fajitas' },
                ]}
                name="radioButton"
            />,
        );
        const radioInput = container.querySelector('.radio-button__input[value="baconburger"]') as HTMLInputElement;
        expect(radioInput.checked).toBe(true);
    });
});
