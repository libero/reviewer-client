import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValueType } from 'react-select/src/types';
import { SelectField, Paragraph, Button } from '../../ui/atoms';
import { Value } from '../../ui/atoms/SelectField';

const ArticleType = (): JSX.Element => {
    const { t } = useTranslation();
    const articleTypes = [
        {
            label: t('article-type:research-article.label'),
            value: 'researchArticle',
        },
        {
            label: t('article-type:feature-article.label'),
            value: 'featureArticle',
        },
        {
            label: t('article-type:research-advance.label'),
            value: 'researchAdvance',
        },
    ];
    const researchArticleCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('article-type:research-article.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-type:research-article.paragraph-2')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('article-type:author-guide')}
                </a>
                .
            </Paragraph>
        </Fragment>
    );
    const featureArticleCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('article-type:feature-article.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-type:feature-article.paragraph-2')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-type:feature-article.paragraph-3')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('article-type:author-guide')}
                </a>
            </Paragraph>
        </Fragment>
    );
    const researchAdvanceCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('article-type:research-advance.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('article-type:research-advance.paragraph-2')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('article-type:author-guide')}
                </a>
            </Paragraph>
        </Fragment>
    );
    const descriptionTypeMap: Record<string, () => JSX.Element> = {
        researchArticle: researchArticleCopy,
        featureArticle: featureArticleCopy,
        researchAdvance: researchAdvanceCopy,
    };
    const [description, setDescription] = useState(researchArticleCopy());
    const changeArticleType = (value: ValueType<Value>): void => {
        const newArticleType: string = (value as Value).value;

        if (descriptionTypeMap[newArticleType]) {
            setDescription(descriptionTypeMap[newArticleType]());
        }
    };
    return (
        <div className="article-type">
            <h1 className="typography__heading typography__heading--h1">{t('article-type:heading')}</h1>
            <SelectField
                labelText="Choose and article type"
                id="articleType"
                values={articleTypes}
                onChange={changeArticleType}
                defaultValue={articleTypes[0]}
            />
            {description}
            <div className="article-type__buttons">
                <Button>{`close`}</Button>
                <Button type="primary">{`next`}</Button>
            </div>
        </div>
    );
};

export default ArticleType;
