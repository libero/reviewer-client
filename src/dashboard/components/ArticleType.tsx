import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectField, Paragraph, Button } from '../../ui/atoms';
import { Value } from '../../ui/atoms/SelectField';

interface Props {
    loading: boolean;
    onCancel: () => void;
    onConfirm: (articleType: string) => void;
}

const ArticleType = ({ loading, onCancel, onConfirm }: Props): JSX.Element => {
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
    const researchArticleCopy = (
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
    const featureArticleCopy = (
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
    const researchAdvanceCopy = (
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
    const descriptionTypeMap: Record<string, JSX.Element> = {
        researchArticle: researchArticleCopy,
        featureArticle: featureArticleCopy,
        researchAdvance: researchAdvanceCopy,
    };
    const [selectedArticleType, setSelectedArticleType] = useState<Value>(articleTypes[0]);

    return (
        <div className="article-type">
            <h1 className="typography__heading typography__heading--h1">{t('article-type:heading')}</h1>
            <div className="article-type__content">
                <SelectField
                    labelText="Choose and article type"
                    id="articleType"
                    values={articleTypes}
                    onChange={(value: Value): void => setSelectedArticleType(value)}
                    defaultValue={articleTypes[0]}
                    searchable={false}
                />
                {descriptionTypeMap[selectedArticleType.value]}
            </div>
            <div className="article-type__buttons">
                <Button onClick={onCancel}>{t('article-type:cancel-button')}</Button>
                <Button onClick={(): void => onConfirm(selectedArticleType.value)} type="primary" loading={loading}>
                    {t('article-type:confirm-button')}
                </Button>
            </div>
        </div>
    );
};

export default ArticleType;
