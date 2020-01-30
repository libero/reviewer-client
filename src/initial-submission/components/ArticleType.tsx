import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ValueType } from 'react-select/src/types';
import { SelectField } from '../../ui/atoms';
import { Value } from '../../ui/atoms/SelectField';
import ResearchArticleCopy from './ResearchArticleCopy';
import FeatureArticleCopy from './FeatureArticleCopy';
import ResearchAdvanceCopy from './ResearchAdvanceCopy';

interface Props {
    handleChange?: (articleType: string) => void;
}

const ArticleType = ({ handleChange }: Props): JSX.Element => {
    const { t } = useTranslation();
    const articleTypes = [
        {
            label: t('article-types:research-article.label'),
            value: 'researchArticle',
        },
        {
            label: t('article-types:feature-article.label'),
            value: 'featureArticle',
        },
        {
            label: t('article-types:research-advance.label'),
            value: 'researchAdvance',
        },
    ];

    const descriptionTypeMap: Record<string, () => JSX.Element> = {
        researchArticle: ResearchArticleCopy,
        featureArticle: FeatureArticleCopy,
        researchAdvance: ResearchAdvanceCopy,
    };

    const [currentArticleType, setCurrentArticleType] = useState<string>(articleTypes[0].value);

    useEffect(() => {
        typeof handleChange !== 'undefined' && handleChange(currentArticleType);
    }, [currentArticleType]);

    const getCopy = (a: string): JSX.Element => (descriptionTypeMap[a] ? descriptionTypeMap[a]() : null);

    const changeArticleType = (value: ValueType<Value>): void => {
        setCurrentArticleType((value as Value).value);
    };

    return (
        <div>
            <h1 className="typography__heading typography__heading--h1">{t('article-types:heading')}</h1>
            <SelectField
                labelText="Choose and article type"
                id="articleType"
                values={articleTypes}
                onChange={changeArticleType}
                defaultValue={articleTypes[0]}
            />
            {getCopy(currentArticleType)}
        </div>
    );
};

export default ArticleType;
