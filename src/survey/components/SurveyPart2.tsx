import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentToggle, TextField, RadioButton, SelectField } from '../../ui/atoms';

interface Props {
    register: () => void;
    showGenderSelfDescribe?: boolean;
    selfDescribeInvalid?: boolean;
}

const SurveyPart2 = ({ showGenderSelfDescribe, selfDescribeInvalid = false, register }: Props): JSX.Element => {
    const { t } = useTranslation('survey');

    return (
        <div className="survey">
            <h3 className="typography__heading typography__heading--h3">{t('genderIdentity.label')}</h3>
            <RadioButton
                id="genderIdentity"
                name="genderIdentity"
                options={t('genderIdentity.options', { returnObjects: true })}
                register={register}
            ></RadioButton>
            {showGenderSelfDescribe && (
                <TextField
                    name="genderSelfDescribe"
                    id="genderSelfDescribe"
                    labelText={t('genderSelfDescribe.label')}
                    placeholder={t('genderSelfDescribe.placeholder')}
                    invalid={selfDescribeInvalid}
                    register={register}
                />
            )}
            <h3 className="typography__heading typography__heading--h3">{t('countryOfResidence.label')}</h3>
            <SelectField
                id="countryOfResidence"
                labelText=""
                values={t('countryOfResidence.options', { returnObjects: true })}
            ></SelectField>
            <ContentToggle
                id="secondCountryOfResidenceToggle"
                collapsedText={t('countryOfResidence.collapsedText')}
                openText={t('countryOfResidence.expandedText')}
            >
                <SelectField
                    id="secondCountryOfResidence"
                    labelText={t('countryOfResidence.labelSecondary')}
                    values={t('countryOfResidence.options', { returnObjects: true })}
                ></SelectField>
            </ContentToggle>
            <h3 className="typography__heading typography__heading--h3">{t('countryIndentifyAs.label')}</h3>
            <RadioButton
                id="countryIndentifyAs"
                name="countryIndentifyAs"
                helperText={t('countryIndentifyAs.helperText')}
                options={t('countryIndentifyAs.options', { returnObjects: true })}
                register={register}
            ></RadioButton>
            <h3 className="typography__heading typography__heading--h3">{t('raceOrEthnicity.label')}</h3>
            <TextField
                name="genderSelfDescribe"
                id="genderSelfDescribe"
                placeholder={t('raceOrEthnicity.placeholder')}
                helperText={t('raceOrEthnicity.helperText')}
                register={register}
            />
        </div>
    );
};

export default SurveyPart2;
