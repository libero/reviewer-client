import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import PeoplePicker from './PeoplePicker';
import appContainer from '../../../test-utils/appContainer';

describe('PeoplePicker', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePicker onRemove={jest.fn()} onSearch={jest.fn()} label="" setSelectedPeople={jest.fn()} />,
                ),
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
                        onSearch={jest.fn()}
                        label=""
                        setSelectedPeople={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('SelectedPeopleList button toggles the PeoplePickerSelector', async (): Promise<void> => {
        const { getByText, baseElement } = render(
            <PeoplePicker onRemove={jest.fn()} onSearch={jest.fn()} label="" setSelectedPeople={jest.fn()} />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
        await fireEvent.click(getByText('selected_people_list--open'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });
});
