import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Paragraph, TextField, RadioButton, Button } from '../../ui/atoms';
import Interweave from 'interweave';
import { getOptions } from '../utils';
import { independentResearcherValues, submittingAsValues } from '../values';

export interface SurveyPageAnswers {
    submittingAs?: string;
    independentResearcher?: string;
    independentResearcherYear?: string;
}

interface Props {
    id?: string;
    next?: (answers: SurveyPageAnswers) => void;
    previous?: () => void;
    defaultValues?: SurveyPageAnswers;
}

const SurveyPart1 = ({ id = 'survey-part-1', next, defaultValues = {} }: Props): JSX.Element => {
    const { register, watch, formState, handleSubmit } = useForm<SurveyPageAnswers>({ defaultValues });
    const { t } = useTranslation('survey');
    const showIndependentResearcherYear = watch('independentResearcher');

    const isDirty = (): boolean => {
        let retVal = false;
        if (formState.dirty) {
            retVal = true;
        } else {
            const opts = ['submittingAs', 'independentResearcher', 'independentResearcherYear'];
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
        let responses = {};
        if (isDirty()) {
            responses = data;
        }
        if (next) next(responses);
    };

    return (
        <div id={id} className="survey">
            <form onSubmit={handleSubmit(onSkipOrNext)}>
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
                <RadioButton
                    id="submittingAs"
                    name="submittingAs"
                    options={getOptions(t('submittingAs.options', { returnObjects: true }), submittingAsValues)}
                    register={register}
                ></RadioButton>
                <h3 className="typography__heading typography__heading--h3">{t('independentResearcher.label')}</h3>
                <Paragraph type="small" secondary>
                    <Interweave content={t('independentResearcher.helperText')} />
                </Paragraph>
                <RadioButton
                    id="independentResearcher"
                    name="independentResearcher"
                    options={getOptions(
                        t('independentResearcher.options', { returnObjects: true }),
                        independentResearcherValues,
                    )}
                    register={register}
                ></RadioButton>
                {showIndependentResearcherYear === 'yes' && (
                    <TextField
                        name="independentResearcherYear"
                        id="independentResearcherYear"
                        labelText={t('independentResearcherYear.label')}
                        placeholder="Enter text"
                        helperText={t('independentResearcherYear.helperText')}
                        register={register}
                    />
                )}
                <Button type="primary" isSubmit>
                    {isDirty() ? t('navigation.next') : t('navigation.skip')}
                </Button>
            </form>
        </div>
    );
};

export default SurveyPart1;
