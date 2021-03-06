import '../../../test-utils/i18n-mock';
import React, { CSSProperties } from 'react';
import { render, cleanup, RenderResult, waitFor, fireEvent, act } from '@testing-library/react';
import PeoplePickerSelector from './PeoplePickerSelector';
import mockOffsetSize from '../../../test-utils/offsetSizeMock';
import appContainer from '../../../test-utils/appContainer';

const people = [
    {
        id: '1',
        name: 'Name 1',
        aff: 'Institution 1',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '2',
        name: 'Name 2',
        aff: 'Institution 2',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '3',
        name: 'Name 3',
        aff: 'Institution 3',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '4',
        name: 'Name 4',
        aff: 'Institution 4',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
];

describe('PeoplePickerSelector', (): void => {
    afterEach(cleanup);
    const originalGetComputedStyle = window.getComputedStyle;
    beforeAll((): void => {
        mockOffsetSize(1920, 1080);
        window.getComputedStyle = jest.fn().mockImplementation(
            (): CSSProperties => {
                return { marginTop: 50, marginBottom: 50, paddingBottom: 50 };
            },
        );
    });

    afterAll((): void => {
        window.getComputedStyle = originalGetComputedStyle;
    });

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<PeoplePickerSelector onDone={jest.fn()} label=" " toggle={jest.fn()} isShowing={true} />, {
                    container: appContainer(),
                }),
        ).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <PeoplePickerSelector
                        people={people}
                        initiallySelected={['1']}
                        onDone={jest.fn()}
                        label=" "
                        toggle={jest.fn()}
                        isShowing={true}
                        min={0}
                        max={6}
                    />,
                    {
                        container: appContainer(),
                    },
                ),
        ).not.toThrow();
    });

    it('it renders all of the passed people', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        await waitFor((): NodeListOf<Element> => baseElement.querySelectorAll('.people-picker__modal_list--item'));
        expect(baseElement.querySelectorAll('.people-picker__modal_list--item')).toHaveLength(4);
    });

    it('outputs the passed label text', (): void => {
        const { getByText } = render(
            <PeoplePickerSelector
                people={people}
                initiallySelected={[]}
                onDone={jest.fn()}
                label="SomeTestLabel"
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );

        expect(getByText('SomeTestLabel')).toBeInTheDocument();
    });

    it('it renders all of the selected people with the correct icon', (): void => {
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                initiallySelected={['1', '3']}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(2);
    });

    it('renders guidance text string with min value shown when min selected not met', (): void => {
        const min = 2;
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                min={min}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe(
            'validation--peoplepicker_guidance-prefix ' + min + ' validation--peoplepicker_guidance-suffix',
        );
    });

    it('does not render guidance text if min value is 0', (): void => {
        const min = 0;
        const { baseElement } = render(
            <PeoplePickerSelector
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                min={min}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe('');
    });

    it('does not render guidance text if no min selected is passed', (): void => {
        const { baseElement } = render(
            <PeoplePickerSelector people={people} onDone={jest.fn()} label=" " toggle={jest.fn()} isShowing={true} />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.people-picker__guidance').textContent).toBe('');
    });

    it('it adds the selected people when clicked', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );

        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        await fireEvent.click(baseElement.querySelector('.pod__button'));
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(1);
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(1);
    });

    it('it adds the selected people when clicked and confirmed', (): void => {
        // this test will be fragile, needs a rethink
        const doneMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={doneMock}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        fireEvent.click(baseElement.querySelector('.pod__button'));
        fireEvent.click(baseElement.querySelector('.modal .button--primary'));
        expect(doneMock).toHaveBeenCalledWith(['1']);
    });

    it('it does not add the selected people when clicked and confirmed', (): void => {
        const doneMock = jest.fn();
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={doneMock}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
        fireEvent.click(baseElement.querySelector('.pod__button'));
        fireEvent.click(baseElement.querySelector('.modal .button'));
        expect(doneMock).not.toHaveBeenCalled();
    });

    it('it should show the banner when the maximum selected has been reached', (): void => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={['1', '2', '3', '4']}
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
                max={4}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(4);
        expect(baseElement.querySelector('.banner')).toBeInTheDocument();
    });

    it('should disable the button if min is passed in and there are not enough people selected', async (): Promise<
        void
    > => {
        const { baseElement: baseElementEmpty } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={jest.fn()}
                label=""
                toggle={jest.fn()}
                isShowing={true}
                min={2}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElementEmpty.querySelector('.button--primary')).toBeDisabled();
        await cleanup();
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={['1', '2']}
                people={people}
                onDone={jest.fn()}
                label=""
                toggle={jest.fn()}
                isShowing={true}
                min={2}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.button--primary')).toBeEnabled();
    });

    it('filters by partial name match when searching users', async (): Promise<void> => {
        jest.useFakeTimers();
        const { baseElement, container, getByText } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={[
                    {
                        id: '1',
                        name: 'Jack',
                    },
                    {
                        id: '2',
                        name: 'Jake',
                    },
                    {
                        id: '3',
                        name: 'Bob',
                    },
                ]}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(container.querySelectorAll('.pod')).toHaveLength(3);
        await fireEvent.change(baseElement.querySelector('input'), { target: { value: 'ja' } });
        act((): void => {
            jest.advanceTimersByTime(510);
        });
        expect(container.querySelectorAll('.pod')).toHaveLength(2);
        expect(getByText('Jack')).toBeInTheDocument();
        expect(getByText('Jake')).toBeInTheDocument();
        expect(() => getByText('Bob')).toThrow();
    });
    it('filters by partial aff match when searching users', async (): Promise<void> => {
        jest.useFakeTimers();
        const { baseElement, container, getByText } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={[
                    {
                        id: '1',
                        name: 'Jack',
                        aff: 'apple',
                    },
                    {
                        id: '2',
                        name: 'Jake',
                        aff: 'banana',
                    },
                    {
                        id: '3',
                        name: 'Bob',
                        aff: 'apple',
                    },
                ]}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(container.querySelectorAll('.pod')).toHaveLength(3);
        await fireEvent.change(baseElement.querySelector('input'), { target: { value: 'app' } });
        act((): void => {
            jest.advanceTimersByTime(510);
        });
        expect(container.querySelectorAll('.pod')).toHaveLength(2);
        expect(getByText('Jack')).toBeInTheDocument();
        expect(getByText('Bob')).toBeInTheDocument();
        expect(() => getByText('Jake')).toThrow();
    });

    it('filters by partial focuses match when searching users', async (): Promise<void> => {
        jest.useFakeTimers();
        const { baseElement, container, getByText } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={[
                    {
                        id: '1',
                        name: 'Jack',
                        focuses: ['cow', 'hen'],
                    },
                    {
                        id: '2',
                        name: 'Jake',
                        focuses: ['duck'],
                    },
                    {
                        id: '3',
                        name: 'Bob',
                        focuses: ['rabbit', 'duck'],
                    },
                ]}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(container.querySelectorAll('.pod')).toHaveLength(3);
        await fireEvent.change(baseElement.querySelector('input'), { target: { value: 'du' } });
        act((): void => {
            jest.advanceTimersByTime(510);
        });
        expect(container.querySelectorAll('.pod')).toHaveLength(2);
        expect(getByText('Jake')).toBeInTheDocument();
        expect(getByText('Bob')).toBeInTheDocument();
        expect(() => getByText('Jack')).toThrow();
    });
    it('filters by partial expertises match when searching users', async (): Promise<void> => {
        jest.useFakeTimers();
        const { baseElement, container, getByText } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={[
                    {
                        id: '1',
                        name: 'Jack',
                        expertises: ['planes', 'cars'],
                    },
                    {
                        id: '2',
                        name: 'Jake',
                        expertises: ['boats', 'cars'],
                    },
                    {
                        id: '3',
                        name: 'Bob',
                        expertises: ['trains', 'boats'],
                    },
                ]}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(container.querySelectorAll('.pod')).toHaveLength(3);
        await fireEvent.change(baseElement.querySelector('input'), { target: { value: 'boa' } });
        act((): void => {
            jest.advanceTimersByTime(510);
        });
        expect(container.querySelectorAll('.pod')).toHaveLength(2);
        expect(getByText('Bob')).toBeInTheDocument();
        expect(getByText('Jake')).toBeInTheDocument();
        expect(() => getByText('Jack')).toThrow();
    });

    it('should add SelectedOption blocks for each selected person', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={[]}
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelector('.selected-option')).not.toBeInTheDocument();
        await fireEvent.click(baseElement.querySelectorAll('.pod__button')[0]);
        expect(baseElement.querySelectorAll('.selected-option')).toHaveLength(1);
    });

    it('should remove a selected person when SelectOption block button clicked', async (): Promise<void> => {
        const { baseElement } = render(
            <PeoplePickerSelector
                initiallySelected={['1']}
                people={people}
                onDone={jest.fn()}
                label=" "
                toggle={jest.fn()}
                isShowing={true}
            />,
            {
                container: appContainer(),
            },
        );
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(1);
        expect(baseElement.querySelectorAll('.selected-option')).toHaveLength(1);
        await fireEvent.click(baseElement.querySelector('.selected-option__close'));
        expect(baseElement.querySelectorAll('.selected-option')).toHaveLength(0);
        expect(baseElement.querySelectorAll('.person-pod__selected_icon')).toHaveLength(0);
    });
});
