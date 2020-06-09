import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import PeoplePicker from './PeoplePicker';
import appContainer from '../../../test-utils/appContainer';

describe('PeoplePicker', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<PeoplePicker onRemove={jest.fn()} label="" setSelectedPeople={jest.fn()} />),
        ).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker
                        people={[{ id: '1', name: 'Bob 1' }]}
                        selectedPeople={['1']}
                        required={true}
                        min={1}
                        max={2}
                        onRemove={jest.fn()}
                        label=""
                        setSelectedPeople={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('SelectedPeopleList button toggles the PeoplePickerSelector', async (): Promise<void> => {
        const { getByText, baseElement } = render(
            <PeoplePicker onRemove={jest.fn()} label="" setSelectedPeople={jest.fn()} />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
        fireEvent.click(getByText('selected_people_list--open'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });

    it('handles selected people not in the peoples prop', () => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker
                        people={[{ id: '1', name: 'Bob 1' }]}
                        selectedPeople={['someunknownuser']}
                        required={true}
                        min={1}
                        max={2}
                        onRemove={jest.fn()}
                        label=""
                        setSelectedPeople={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('should show the external label when hideLabel is not passed in or false', () => {
        const { getByText } = render(
            <PeoplePicker onRemove={jest.fn()} label="testLabel" setSelectedPeople={jest.fn()} />,
        );
        expect(getByText('testLabel')).toBeInTheDocument();
    });

    it('should hide the external label when hideLabel is passed in', () => {
        const { container, getByText } = render(
            <PeoplePicker onRemove={jest.fn()} label="testLabel" setSelectedPeople={jest.fn()} />,
        );
        expect(container.querySelector('typography__heading typography__heading--h3')).not.toBeInTheDocument();
        fireEvent.click(getByText('people_picker--open-selector', { exact: false }));
        expect(getByText('testLabel')).toBeInTheDocument();
    });
});
