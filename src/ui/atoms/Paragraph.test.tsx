import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Paragraph', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Paragraph type="writing" />)).not.toThrow();
    });

    it('should render with the correct classes', (): void => {
        const { getByText } = render(
            <div>
                <Paragraph type="writing">writing</Paragraph>
                <Paragraph type="reading">reading</Paragraph>
                <Paragraph type="small">small</Paragraph>
                <Paragraph type="footer">footer</Paragraph>
                <Paragraph type="small" secondary={true}>
                    secondary
                </Paragraph>
            </div>,
        );
        expect(getByText('writing')).toHaveClass('paragraph', 'typography__body', 'typography__body--primary');
        expect(getByText('reading')).toHaveClass('paragraph', 'typography__serif', 'typography__serif--primary');
        expect(getByText('small')).toHaveClass('paragraph', 'typography__small', 'typography__small--primary');
        expect(getByText('footer')).toHaveClass(
            'paragraph',
            'typography__small',
            'typography__small--secondary',
            'paragraph--footer',
        );
        expect(getByText('secondary')).toHaveClass('paragraph', 'typography__small', 'typography__small--secondary');
    });

    it('should render the children', (): void => {
        const { getByText } = render(
            <Paragraph type="writing">
                <span>test</span>
                <span>test2</span>
            </Paragraph>,
        );
        expect(getByText('test')).toBeInTheDocument();
        expect(getByText('test2')).toBeInTheDocument();
    });
});
