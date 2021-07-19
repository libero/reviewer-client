import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContentToggle, TextField, RadioButton, SelectField, Button, Paragraph } from '../../ui/atoms';
import Interweave from 'interweave';
import { getOptions } from '../utils';
import { countryIndentifyAsValues, countryOfResidenceValues, genderIdentityValues } from '../values';

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
    const { register, watch, formState, control, handleSubmit } = useForm<SurveyPageAnswers>({ defaultValues });
    const { t } = useTranslation('survey');
    const [selfDescribeInvalid, setSelfDescribeInvalid] = useState(
        defaultValues['genderIdentity'] === 'self-describe' && defaultValues['genderSelfDescribe'] === '',
    );
    const showGenderSelfDescribe = watch('genderIdentity');

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

    const onSkipOrNext = (data: SurveyPageAnswers): void => {
        const responses = {};
        let invalid = selfDescribeInvalid;
        if (isDirty()) {
            // Make sure if the user selected self describe, that it has a value set.
            invalid = showGenderSelfDescribe && data['genderSelfDescribe'] === '';
            setSelfDescribeInvalid(invalid);

            // FIXME: This filters out undefined values that we get from the select controls.
            for (const [key, value] of Object.entries(data)) {
                if (value) {
                    responses[key] = value;
                }
            }
        }
        // If Valid, submit responses.
        if (invalid) {
            document.getElementById('genderSelfDescribe').scrollIntoView();
        } else if (next) {
            next(responses);
        }
    };

    return (
        <div id={id} className="survey">
            <form onSubmit={handleSubmit(onSkipOrNext)}>
                <h3 className="typography__heading typography__heading--h3">{t('genderIdentity.label')}</h3>
                <RadioButton
                    id="genderIdentity"
                    name="genderIdentity"
                    options={getOptions(t('genderIdentity.options', { returnObjects: true }), genderIdentityValues)}
                    register={register}
                ></RadioButton>
                {showGenderSelfDescribe === 'self-describe' && (
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
                    values={getOptions(
                        t('countryOfResidence.countries', { returnObjects: true }),
                        countryOfResidenceValues,
                    )}
                    control={control}
                    formComponent={true}
                    clearable={true}
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
                        values={getOptions(
                            t('countryOfResidence.countries', { returnObjects: true }),
                            countryOfResidenceValues,
                        )}
                        control={control}
                        formComponent={true}
                        clearable={true}
                    ></SelectField>
                </ContentToggle>
                <h3 className="typography__heading typography__heading--h3">{t('countryIndentifyAs.label')}</h3>
                <Paragraph type="small" secondary>
                    <Interweave content={t('countryIndentifyAs.helperText')} />
                </Paragraph>
                <RadioButton
                    id="countryIndentifyAs"
                    name="countryIndentifyAs"
                    options={getOptions(
                        t('countryIndentifyAs.options', { returnObjects: true }),
                        countryIndentifyAsValues,
                    )}
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
                <Button type="primary" isSubmit>
                    {isDirty() ? t('navigation.done') : t('navigation.skip')}
                </Button>
            </form>
        </div>
    );
};

export default SurveyPart2;
