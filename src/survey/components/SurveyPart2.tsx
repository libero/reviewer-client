import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContentToggle, TextField, RadioButton, SelectField, Button } from '../../ui/atoms';

export interface SurveyPageAnswers {
    genderIdentity?: string;
    genderSelfDescribe?: string;
    countryOfResidence?: string;
    secondCountryOfResidence?: string;
    countryIndentifyAs?: string;
    raceOrEthnicity?: string;
}

interface Props {
    id?: string;
    next?: (answers: SurveyPageAnswers) => void;
    previous?: () => void;
    defaultValues?: SurveyPageAnswers;
}

const SurveyPart2 = ({ id = 'survey-part-2', previous, next, defaultValues = {} }: Props): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyPageAnswers>({ defaultValues });
    const { t } = useTranslation('survey');

    const [selfDescribeInvalid, setSelfDescribeInvalid] = useState(false);
    const [showGenderSelfDescribe, setShowGenderSelfDescribe] = useState(false);

    const answers = watch();

    useEffect(() => {
        setShowGenderSelfDescribe(answers['genderIdentity'] === 'self-describe');
    }, [answers]);

    const onSkipOrNext = (): void => {
        let responses = {};
        if (formState.dirty) {
            // Validate
            setSelfDescribeInvalid(showGenderSelfDescribe && answers['genderSelfDescribe'] === '');

            // Prepare Answers
            responses = answers;
        }
        // If Valid, submit responses.
        if (!selfDescribeInvalid && next) next(responses);
    };

    return (
        <div id={id} className="survey">
            <h3 className="typography__heading typography__heading--h3">{t('genderIdentity.label')}</h3>
            <RadioButton
                id="genderIdentity"
                name="genderIdentity"
                options={t('genderIdentity.options', { returnObjects: true })}
                register={register}
            ></RadioButton>
            {showGenderSelfDescribe && (
                <TextField
                    id="genderSelfDescribe"
                    labelText={t('genderSelfDescribe.label')}
                    placeholder={t('genderSelfDescribe.placeholder')}
                    helperText={t('genderSelfDescribe.helperText')}
                    invalid={selfDescribeInvalid}
                    register={register}
                />
            )}
            <h3 className="typography__heading typography__heading--h3">{t('countryOfResidence.label')}</h3>
            <SelectField
                id="countryOfResidence"
                labelText=""
                values={t('countryOfResidence.countries', { returnObjects: true })}
            ></SelectField>
            <ContentToggle
                id="secondCountryOfResidenceToggle"
                collapsedText={t('countryOfResidence.collapsedText')}
                openText={t('countryOfResidence.expandedText')}
            >
                <SelectField
                    id="secondCountryOfResidence"
                    labelText={t('countryOfResidence.labelSecondary')}
                    values={t('countryOfResidence.countries', { returnObjects: true })}
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
                id="raceOrEthnicity"
                placeholder={t('raceOrEthnicity.placeholder')}
                helperText={t('raceOrEthnicity.helperText')}
                register={register}
            />
            <Button type="secondary" onClick={previous}>
                {t('navigation.back')}
            </Button>
            <Button type="primary" onClick={onSkipOrNext}>
                {formState.dirty ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default SurveyPart2;
