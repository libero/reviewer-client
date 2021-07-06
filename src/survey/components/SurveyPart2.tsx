import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SurveyInput, SurveyAnswer } from '../types';
import { ContentToggle, TextField, RadioButton, SelectField, Button } from '../../ui/atoms';

interface Props {
    id?: string;
    next?: (answers: SurveyAnswer[]) => void;
    previous?: () => void;
}

const SurveyPart2 = ({ id = 'survey-part-2', previous, next }: Props): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyInput>();
    const { t } = useTranslation('survey');

    const [selfDescribeInvalid, setSelfDescribeInvalid] = useState(false);
    const [showGenderSelfDescribe, setShowGenderSelfDescribe] = useState(false);

    const answers = watch();

    useEffect(() => {
        setShowGenderSelfDescribe(answers['genderIdentity'] === 'self-describe');
    }, [answers]);

    const onSkipOrNext = (): void => {
        const responses = [];
        if (formState.dirty) {
            // Validate
            setSelfDescribeInvalid(showGenderSelfDescribe && answers['genderSelfDescribe'] === '');

            // Prepare Answers
            for (const [key, value] of Object.entries(answers)) {
                responses.push({
                    questionId: key,
                    answer: value,
                });
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
