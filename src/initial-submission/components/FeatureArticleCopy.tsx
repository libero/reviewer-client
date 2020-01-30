import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const FeatureArticleCopy = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('article-types:feature-article.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-types:feature-article.paragraph-2')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-types:feature-article.paragraph-3')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('article-types:author-guide')}
                </a>
            </Paragraph>
        </Fragment>
    );
};

export default FeatureArticleCopy;
