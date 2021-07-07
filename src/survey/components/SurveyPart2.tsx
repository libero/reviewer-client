import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContentToggle, TextField, RadioButton, SelectField, Button, Paragraph } from '../../ui/atoms';
import Interweave from 'interweave';

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
    const { register, watch, formState, control } = useForm<SurveyPageAnswers>({ defaultValues });
    const { t } = useTranslation('survey');
    const [selfDescribeInvalid, setSelfDescribeInvalid] = useState(false);
    const [showGenderSelfDescribe, setShowGenderSelfDescribe] = useState(false);
    const answers = watch();

    useEffect(() => {
        setShowGenderSelfDescribe(answers['genderIdentity'] === 'self-describe');
    }, [answers]);

    const onSkipOrNext = (): void => {
        const responses = {};
        if (formState.dirty) {
            // Make sure if the selected self describe, that it has a value set.
            setSelfDescribeInvalid(showGenderSelfDescribe && answers['genderSelfDescribe'] === '');

            // SelectFields return the value as an object, hence we need to extract the value from that object.
            for (const [key, value] of Object.entries(answers)) {
                responses[key] = typeof value === 'object' ? value.value : value;
            }
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
                placeholder={t('countryOfResidence.placeholder')}
                values={t('countryOfResidence.countries', { returnObjects: true })}
                control={control}
                formComponent={true}
            ></SelectField>
            <ContentToggle
                id="secondCountryOfResidenceToggle"
                collapsedText={t('countryOfResidence.collapsedText')}
                openText={t('countryOfResidence.expandedText')}
            >
                <SelectField
                    id="secondCountryOfResidence"
                    labelText={t('countryOfResidence.labelSecondary')}
                    placeholder={t('countryOfResidence.placeholder')}
                    values={t('countryOfResidence.countries', { returnObjects: true })}
                    control={control}
                    formComponent={true}
                ></SelectField>
            </ContentToggle>
            <h3 className="typography__heading typography__heading--h3">{t('countryIndentifyAs.label')}</h3>
            <Paragraph type="small" secondary>
                <Interweave content={t('countryIndentifyAs.helperText')} />
            </Paragraph>
            <RadioButton
                id="countryIndentifyAs"
                name="countryIndentifyAs"
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
                {formState.dirty || Object.keys(defaultValues).length > 0 ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default SurveyPart2;
