import React from 'react';
import { storiesOf } from '@storybook/react';
import ArticleType from '../components/ArticleType';
import '../../core/styles/index.scss';

storiesOf('Initial Submission | Components/ArticleType', module).add(
    'With Components',
    (): JSX.Element => {
        return <ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} loading={false} />;
    },
);
