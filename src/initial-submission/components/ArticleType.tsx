import React, { Fragment } from 'react';
import { SelectField, Paragraph } from '../../ui/atoms';
import { ValueType } from 'react-select/src/types';
import { Value } from '../../ui/atoms/SelectField';

export const ArticleType = (): JSX.Element => {
    const articleTypes = [
        {
            label: 'Research Article',
            value: 'researchArticle',
        },
        {
            label: 'Feature Article',
            value: 'featureArticle',
        },
    ];
    const researchArticleCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                Research Articles published by eLife are full-length studies that present important breakthroughs across
                the life sciences and biomedicine.
            </Paragraph>
            <Paragraph type="writing" secondary>
                There is no maximum length and no limits on the number of display items, and is our most submitted type
                of article. For more information on our article types please read our Author guide.
            </Paragraph>
        </Fragment>
    );
    const descriptionTypeMap: Record<string, () => JSX.Element> = {
        researchArticle: researchArticleCopy,
    };
    let description: () => JSX.Element = researchArticleCopy;
    const changeArticleType = (value: ValueType<Value>): void => {
        const newArticleType: string = (value as Value).value;
        description = descriptionTypeMap[newArticleType];
    };
    return (
        <div>
            <h1 className="typography__heading typography__heading--h1">What would you like to submit?</h1>
            <SelectField
                labelText="Choose and article type"
                id="articleType"
                values={articleTypes}
                onChange={changeArticleType}
            />
            {description()}
        </div>
    );
};
