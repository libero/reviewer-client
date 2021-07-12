import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContentToggle, TextField, RadioButton, SelectField, Button, Paragraph } from '../../ui/atoms';
import Interweave from 'interweave';
import { getOptions } from '../utils';

export interface SurveyPageAnswers {
    genderIdentity?: string;
    genderSelfDescribe?: string;
    countryOfResidence?: { label: string; value: string };
    secondCountryOfResidence?: { label: string; value: string };
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
    const [selfDescribeInvalid, setSelfDescribeInvalid] = useState(
        defaultValues['genderIdentity'] === 'self-describe' && defaultValues['genderSelfDescribe'] === '',
    );
    const [showGenderSelfDescribe, setShowGenderSelfDescribe] = useState(
        defaultValues['genderIdentity'] === 'self-describe',
    );
    const answers = watch();

    useEffect(() => {
        setShowGenderSelfDescribe(answers['genderIdentity'] === 'self-describe');
    }, [answers]);

    const isDirty = (): boolean => {
        let retVal = false;
        if (formState.dirty) {
            retVal = true;
        } else {
            const opts = [
                'genderIdentity',
                'genderSelfDescribe',
                'countryOfResidence',
                'secondCountryOfResidence',
                'countryIndentifyAs',
                'raceOrEthnicity',
            ];
            for (const key of Object.keys(defaultValues)) {
                if (opts.includes(key)) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    };

    const onSkipOrNext = (): void => {
        const responses = {};
        let invalid = selfDescribeInvalid;
        if (isDirty()) {
            // Make sure if the user selected self describe, that it has a value set.
            invalid = showGenderSelfDescribe && answers['genderSelfDescribe'] === '';
            setSelfDescribeInvalid(invalid);

            // FIXME: This filters out undefined values that we get from the select controls.
            for (const [key, value] of Object.entries(answers)) {
                if (value) {
                    responses[key] = value;
                }
            }
        }
        // If Valid, submit responses.
        if (!invalid && next) next(responses);
    };

    return (
        <div id={id} className="survey">
            <h3 className="typography__heading typography__heading--h3">{t('genderIdentity.label')}</h3>
            <RadioButton
                id="genderIdentity"
                name="genderIdentity"
                options={getOptions(t('genderIdentity.options', { returnObjects: true }), [
                    'man',
                    'non-binary',
                    'woman',
                    'self-describe',
                    'prefer-not-to-say',
                ])}
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
            <h3 id="countryOfResidence-label" className="typography__heading typography__heading--h3">
                {t('countryOfResidence.label')}
            </h3>
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
                open={defaultValues['secondCountryOfResidence'] ? true : false}
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
                options={getOptions(t('countryIndentifyAs.options', { returnObjects: true }), [
                    'yes',
                    'no',
                    'prefer-not-to-say',
                ])}
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
                {isDirty() ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default SurveyPart2;
