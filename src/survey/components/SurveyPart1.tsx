import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SurveyInput } from '../types';
import { Paragraph, TextField, RadioButton, Button } from '../../ui/atoms';
import Interweave from 'interweave';

interface Props {
    id?: string;
    next?: () => void;
    previous?: () => void;
}

const SurveyPart1 = ({ next, id = 'survey-part-1' }: Props): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyInput>();
    const { t } = useTranslation('survey');

    const [showIndependentResearcherYear, setshowIndependentResearcherYear] = useState(false);

    const answers = watch();

    useEffect(() => {
        setshowIndependentResearcherYear(answers['independentResearcher'] === 'yes');
    }, [answers]);

    const onClick = (): void => {
        console.log(answers);
        if (formState.dirty) {
            // Validate
            // Prepare Answers
            // Store results via callback
            // Next()
            if (next) next();
        } else {
            // Skip;
        }
    };

    return (
        <div id={id} className="survey">
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
                options={t('submittingAs.options', { returnObjects: true })}
                register={register}
            ></RadioButton>
            <h3 className="typography__heading typography__heading--h3">{t('independentResearcher.label')}</h3>
            <RadioButton
                id="independentResearcher"
                name="independentResearcher"
                helperText={t('independentResearcher.helperText')}
                options={t('independentResearcher.options', { returnObjects: true })}
                register={register}
            ></RadioButton>
            {showIndependentResearcherYear && (
                <TextField
                    name="independentResearcherYear"
                    id="independentResearcherYear"
                    labelText={t('independentResearcherYear.label')}
                    placeholder="Enter text"
                    helperText={t('independentResearcherYear.helperText')}
                    register={register}
                />
            )}
            <Button type="primary" onClick={onClick}>
                {formState.dirty ? t('navigation.next') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default SurveyPart1;
