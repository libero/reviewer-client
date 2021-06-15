import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ToggleComponent from './ToggleComponent';

describe('ToggleComponent', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <ToggleComponent
                        id=""
                        selectId=""
                        openText=""
                        collapsedText=""
                        labelText=""
                        questionTitle=""
                    ></ToggleComponent>,
                ),
        ).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <ToggleComponent
                        id="Test"
                        selectId=""
                        openText="This is some open text"
                        collapsedText="This is some collapsed Text"
                        labelText="Label Text"
                        questionTitle="question title"
                    ></ToggleComponent>,
                ),
        ).not.toThrow();
    });

    it('should render question title correctly', (): void => {
        const questionTitle = 'Question title';
        const { getByText } = render(
            <ToggleComponent
                id=""
                selectId=""
                openText=""
                collapsedText=""
                labelText=""
                questionTitle={questionTitle}
            ></ToggleComponent>,
        );
        expect(getByText(questionTitle)).toBeInTheDocument();
    });

    it('should be empty in the primary select field', (): void => {
        const { container } = render(
            <ToggleComponent
                id="SelectField"
                selectId=""
                openText=""
                collapsedText=""
                labelText=""
                questionTitle=""
            ></ToggleComponent>,
        );

        expect(container.querySelector('.select-field__placeholder')).toBeInTheDocument();
    });

    it('should be empty in the secondary select field', (): void => {
        const { container } = render(
            <ToggleComponent
                id="SelectFieldTwo"
                selectId=""
                openText=""
                collapsedText=""
                labelText=""
                questionTitle=""
            ></ToggleComponent>,
        );

        expect(container.querySelector('.select-field__placeholder')).toBeInTheDocument();
    });

    it('should have a value in the primary select dropdown field', (): void => {
        const { container } = render(
            <ToggleComponent
                id="selectField"
                selectId=""
                openText=""
                collapsedText=""
                labelText=""
                questionTitle=""
                values={[{ label: 'test-option', value: 'test' }]}
                defaultValue={{ label: 'Argentina', value: 'Argentina' }}
            ></ToggleComponent>,
        );

        expect(container.querySelector('#selectField').textContent).toContain('Argentina');
    });

    it('should have a value in the secondary select dropdown field', (): void => {
        const { container } = render(
            <ToggleComponent
                id="selectFieldTwo"
                selectId=""
                openText=""
                collapsedText=""
                labelText=""
                questionTitle=""
                values={[{ label: 'test-option', value: 'test' }]}
                defaultValue={{ label: 'Canada', value: 'Canada' }}
            ></ToggleComponent>,
        );

        expect(container.querySelector('#selectFieldTwo').textContent).toContain('Canada');
    });
});
