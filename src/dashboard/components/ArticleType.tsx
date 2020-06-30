import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Interweave from 'interweave';
import { SelectField, Paragraph, Button } from '../../ui/atoms';
import { Value } from '../../ui/atoms/SelectField';

interface Props {
    loading: boolean;
    onCancel: () => void;
    onConfirm: (articleType: string) => void;
}

const ArticleType = ({ loading, onCancel, onConfirm }: Props): JSX.Element => {
    const { t } = useTranslation('article-type');
    const articleTypes = [
        {
            label: t('research-article.label'),
            value: 'research-article',
        },

        {
            label: t('short-report.label'),
            value: 'short-report',
        },

        {
            label: t('tools-resources.label'),
            value: 'tools-resources',
        },

        {
            label: t('scientific-correspondence.label'),
            value: 'scientific-correspondence',
        },
        {
            label: t('feature.label'),
            value: 'feature',
        },
    ];
    const researchArticleCopy = (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('research-article.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('research-article.paragraph-2')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('author-guide')}
                </a>
                .
            </Paragraph>
        </Fragment>
    );
    const shortReportCopy = (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('short-report.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('short-report.paragraph-2')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('author-guide')}
                </a>
                .
            </Paragraph>
        </Fragment>
    );

    const toolsResourcesCopy = (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('tools-resources.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('tools-resources.paragraph-2')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('tools-resources.paragraph-3')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('author-guide')}
                </a>
                .
            </Paragraph>
        </Fragment>
    );

    const scientificCorrespondenceCopy = (
        <Fragment>
            <Paragraph type="writing" secondary>
                <Interweave content={t('scientific-correspondence.paragraph-1')} />
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('scientific-correspondence.paragraph-2')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('author-guide')}
                </a>
                .
            </Paragraph>
        </Fragment>
    );

    const featureArticleCopy = (
        <Fragment>
            <Paragraph type="writing" secondary>
                {t('feature.paragraph-1')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('feature.paragraph-2')}
            </Paragraph>
            <Paragraph type="writing" secondary>
                {t('feature.paragraph-3')}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    {t('author-guide')}
                </a>
            </Paragraph>
        </Fragment>
    );
    // const researchAdvanceCopy = (
    //     <Fragment>
    //         <Paragraph type="writing" secondary>
    //             {t('research-advance.paragraph-1')}
    //         </Paragraph>
    //         <Paragraph type="writing" secondary>
    //             {t('research-advance.paragraph-2')}
    //             <a
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 href="https://reviewer.elifesciences.org/author-guide/editorial-process"
    //             >
    //                 {t('author-guide')}
    //             </a>
    //         </Paragraph>
    //     </Fragment>
    // );
    const descriptionTypeMap: Record<string, JSX.Element> = {
        'research-article': researchArticleCopy,
        'short-report': shortReportCopy,
        'tools-resources': toolsResourcesCopy,
        feature: featureArticleCopy,
        'scientific-correspondence': scientificCorrespondenceCopy,
        // 'research-advance': researchAdvanceCopy,
    };
    const [selectedArticleType, setSelectedArticleType] = useState<Value>(articleTypes[0]);

    return (
        <div className="article-type">
            <h1 className="typography__heading typography__heading--h1">{t('heading')}</h1>
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
                <Button onClick={onCancel}>{t('cancel-button')}</Button>
                <Button onClick={(): void => onConfirm(selectedArticleType.value)} type="primary" loading={loading}>
                    {t('confirm-button')}
                </Button>
            </div>
        </div>
    );
};

export default ArticleType;
