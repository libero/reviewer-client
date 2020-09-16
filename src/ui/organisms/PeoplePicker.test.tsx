import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import PeoplePicker from './PeoplePicker';

describe('PeoplePicker', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<PeoplePicker onChange={jest.fn()} label="" />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker
                        people={[{ id: '1', name: 'Bob 1' }]}
                        initialSelectedPeople={['1']}
                        required={true}
                        min={1}
                        max={2}
                        onChange={jest.fn()}
                        label=""
                    />,
                ),
        ).not.toThrow();
    });

    it('handles selected people not in the peoples prop', () => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker
                        people={[{ id: '1', name: 'Bob 1' }]}
                        initialSelectedPeople={['someunknownuser']}
                        required={true}
                        min={1}
                        max={2}
                        onChange={jest.fn()}
                        label=""
                    />,
                ),
        ).not.toThrow();
    });

    it('should show the external label when hideLabel is not passed in or false', () => {
        const { getByText } = render(<PeoplePicker onChange={jest.fn()} label="testLabel" />);
        expect(getByText('testLabel')).toBeInTheDocument();
    });

    it('should hide the external label when hideLabel is passed in', () => {
        const { container, getByText } = render(<PeoplePicker onChange={jest.fn()} label="testLabel" />);
        expect(container.querySelector('typography__heading typography__heading--h3')).not.toBeInTheDocument();
        fireEvent.click(getByText('people_picker--open-selector', { exact: false }));
        expect(getByText('testLabel')).toBeInTheDocument();
    });

    it("Sould show picker as required when the min hasn't been met", () => {
        const { container } = render(
            <PeoplePicker
                people={[{ id: '1', name: 'Bob 1' }, { id: '2', name: 'Bob 2' }]}
                initialSelectedPeople={['1']}
                required={true}
                min={2}
                max={6}
                onChange={jest.fn()}
                label=""
            />,
        );

        expect(container.querySelector('.pod:last-child .selected_people_list__pod-content').textContent).toBe(
            'people_picker--open-selector (validation--required)',
        );
    });
    it('Sould show picker as optional when the min has been met', () => {
        const { container } = render(
            <PeoplePicker
                people={[{ id: '1', name: 'Bob 1' }, { id: '2', name: 'Bob 2' }, { id: '3', name: 'Bob 3' }]}
                initialSelectedPeople={['1', '2']}
                required={true}
                min={2}
                max={6}
                onChange={jest.fn()}
                label=""
            />,
        );

        expect(container.querySelector('.pod:last-child .selected_people_list__pod-content').textContent).toBe(
            'people_picker--open-selector (validation--optional)',
        );
    });
});
