/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph, TextField, RadioButton } from '../../ui/atoms';
import Interweave from 'interweave';

interface Props {
    register?: () => void;
    showIndependentResearcherYear?: boolean;
}

const SurveyPart1 = ({ showIndependentResearcherYear = false, register }: Props): JSX.Element => {
    const { t } = useTranslation('survey');

    return (
        <div className="survey">
            <Paragraph type="writing">
                <Interweave content={t('p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('p3')} />
            </Paragraph>
            <h3 className="typography__heading typography__heading--h3">{t('submittingAs.label')}</h3>
            <RadioButton id="submittingAs" name="submittingAs" options={t('submittingAs.options', { returnObjects: true })} register={register}></RadioButton>
            <h3 className="typography__heading typography__heading--h3">{t('independentResearcher.label')}</h3>
            <RadioButton id="independentResearcher" name="independentResearcher" helperText={t('independentResearcher.helperText')} options={t('independentResearcher.options', { returnObjects: true })} register={register}></RadioButton>
            {showIndependentResearcherYear && <TextField
                name="independentResearcherYear"
                id="independentResearcherYear"
                labelText={t('independentResearcherYear.label')}
                placeholder="Enter text"
                helperText={t('independentResearcherYear.helperText')}
                register={register}
            />}
        </div>
    );
};

export default SurveyPart1;
