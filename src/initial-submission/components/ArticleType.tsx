import React, { Fragment, useState } from 'react';
import { ValueType } from 'react-select/src/types';
import { SelectField, Paragraph } from '../../ui/atoms';
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
        {
            label: 'Research Advance',
            value: 'researchAdvance',
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
                of article. For more information on our article types please read our{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    Author guide.
                </a>
            </Paragraph>
        </Fragment>
    );
    const featureArticleCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                Feature Articles should offer fresh insights into topics of broad interest to readers working in the
                life and biomedical sciences and should be written in an active/engaging style.
            </Paragraph>
            <Paragraph type="writing" secondary>
                There are no strict limits on length, but authors are advised to stay below 2000 words, two display
                items (figures, tables etc) and 20 references if possible.
            </Paragraph>
            <Paragraph type="writing" secondary>
                For more information on our article types please read our{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    Author guide.
                </a>
            </Paragraph>
        </Fragment>
    );
    const researchAdvanceCopy = (): JSX.Element => (
        <Fragment>
            <Paragraph type="writing" secondary>
                This format is for substantial developments that directly build upon a Research Article, Short Report or
                Tools and Resources article published previously by eLife.
            </Paragraph>
            <Paragraph type="writing" secondary>
                For more information on our article types please read our{' '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reviewer.elifesciences.org/author-guide/editorial-process"
                >
                    Author guide.
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
        <div>
            <h1 className="typography__heading typography__heading--h1">What would you like to submit?</h1>
            <SelectField
                labelText="Choose and article type"
                id="articleType"
                values={articleTypes}
                onChange={changeArticleType}
            />
            {description}
        </div>
    );
};
