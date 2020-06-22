import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, cleanup, RenderResult, fireEvent } from '@testing-library/react';
import SelectedPeopleList from './SelectedPeopleList';

describe('SelectedPeopleList', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<SelectedPeopleList openSelectorText=" " onRemove={jest.fn()} onOpen={jest.fn()} />),
        ).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <SelectedPeopleList
                        people={[{ id: '1', name: 'Bob' }]}
                        required={true}
                        openSelectorText=" "
                        onRemove={jest.fn()}
                        onOpen={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('should render an open button with the passed in openSelectorText text', (): void => {
        const { container } = render(
            <SelectedPeopleList people={[]} openSelectorText="SomeTestText" onRemove={jest.fn()} onOpen={jest.fn()} />,
        );
        expect(container.querySelector('.selected_people_list__pod-content').textContent).toContain('SomeTestText');
    });

    it('should render optional label if not required', (): void => {
        const { container } = render(
            <SelectedPeopleList people={[]} openSelectorText="SomeTestText" onRemove={jest.fn()} onOpen={jest.fn()} />,
        );
        expect(container.querySelector('.selected_people_list__pod-content').textContent).toContain(
            'validation--optional',
        );
    });

    it('should render required label if required', (): void => {
        const { container } = render(
            <SelectedPeopleList
                people={[]}
                openSelectorText="SomeTestText"
                onRemove={jest.fn()}
                onOpen={jest.fn()}
                required
            />,
        );
        expect(container.querySelector('.selected_people_list__pod-content').textContent).toContain(
            'validation--required',
        );
    });

    it('should call the onOpen callback when open button is clicked', async (): Promise<void> => {
        const onOpenSpy = jest.fn();
        const { getByText } = render(
            <SelectedPeopleList people={[]} openSelectorText="SomeTestText" onRemove={jest.fn()} onOpen={onOpenSpy} />,
        );

        await fireEvent.click(getByText('selected_people_list--open'));
        expect(onOpenSpy).toBeCalled();
    });

    it('displays a pod for each of the passed people and one for the open button', (): void => {
        const people = [
            {
                id: '1',
                name: 'Bob 1',
            },
            {
                id: '2',
                name: 'Bob 2',
            },
            {
                id: '3',
                name: 'Bob 3',
            },
        ];
        const { container } = render(
            <SelectedPeopleList
                people={people}
                openSelectorText="SomeTestText"
                onRemove={jest.fn()}
                onOpen={jest.fn()}
            />,
        );

        expect(container.querySelectorAll('.pod')).toHaveLength(people.length + 1);
    });

    it('calls onRemove callback when person pod button is clicked', async (): Promise<void> => {
        const onRemoveSpy = jest.fn();
        const { container } = render(
            <SelectedPeopleList
                people={[{ id: '1', name: 'Bob 1' }]}
                openSelectorText="SomeTestText"
                onRemove={onRemoveSpy}
                onOpen={jest.fn()}
            />,
        );
        await fireEvent.click(container.querySelectorAll('.pod__button')[0]);
        expect(onRemoveSpy).toHaveBeenCalled();
    });

    it('should show required label if true', async (): Promise<void> => {
        const onOpenSpy = jest.fn();
        const { container } = render(
            <SelectedPeopleList
                people={[]}
                openSelectorText="SomeTestText"
                onRemove={jest.fn()}
                onOpen={onOpenSpy}
                required={true}
            />,
        );

        expect(container.querySelector('.selected_people_list__pod-content').innerHTML).toBe(
            'SomeTestText (validation--required)',
        );
    });

    it('should show optional if required is false', async (): Promise<void> => {
        const onOpenSpy = jest.fn();
        const { container } = render(
            <SelectedPeopleList
                people={[]}
                openSelectorText="SomeTestText"
                onRemove={jest.fn()}
                onOpen={onOpenSpy}
                required={false}
            />,
        );

        expect(container.querySelector('.selected_people_list__pod-content').innerHTML).toBe(
            'SomeTestText (validation--optional)',
        );
    });
});
