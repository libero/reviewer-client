import React, { useState } from 'react';
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

const countryCodes = [
    'AF',
    'AX',
    'AL',
    'DZ',
    'AS',
    'AD',
    'AO',
    'AI',
    'AQ',
    'AG',
    'AR',
    'AM',
    'AW',
    'AU',
    'AT',
    'AZ',
    'BS',
    'BH',
    'BD',
    'BB',
    'BY',
    'BE',
    'BZ',
    'BJ',
    'BM',
    'BT',
    'BO',
    'BQ',
    'BA',
    'BW',
    'BV',
    'BR',
    'IO',
    'BN',
    'BG',
    'BF',
    'BI',
    'KH',
    'CM',
    'CA',
    'CV',
    'KY',
    'CF',
    'TD',
    'CL',
    'CN',
    'CX',
    'CC',
    'CO',
    'KM',
    'CG',
    'CD',
    'CK',
    'CR',
    'CI',
    'HR',
    'CU',
    'CW',
    'CY',
    'CZ',
    'DK',
    'DJ',
    'DM',
    'DO',
    'EC',
    'EG',
    'SV',
    'GQ',
    'ER',
    'EE',
    'ET',
    'FK',
    'FO',
    'FJ',
    'FI',
    'FR',
    'GF',
    'PF',
    'TF',
    'GA',
    'GM',
    'GE',
    'DE',
    'GH',
    'GI',
    'GR',
    'GL',
    'GD',
    'GP',
    'GU',
    'GT',
    'GG',
    'GN',
    'GW',
    'GY',
    'HT',
    'HM',
    'VA',
    'HN',
    'HK',
    'HU',
    'IS',
    'IN',
    'ID',
    'IR',
    'IQ',
    'IE',
    'IM',
    'IL',
    'IT',
    'JM',
    'JP',
    'JE',
    'JO',
    'KZ',
    'KE',
    'KI',
    'KP',
    'KR',
    'KW',
    'KG',
    'LA',
    'LV',
    'LB',
    'LS',
    'LR',
    'LY',
    'LI',
    'LT',
    'LU',
    'MO',
    'MK',
    'MG',
    'MW',
    'MY',
    'MV',
    'ML',
    'MT',
    'MH',
    'MQ',
    'MR',
    'MU',
    'YT',
    'MX',
    'FM',
    'MD',
    'MC',
    'MN',
    'ME',
    'MS',
    'MA',
    'MZ',
    'MM',
    'NA',
    'NR',
    'NP',
    'NL',
    'NC',
    'NZ',
    'NI',
    'NE',
    'NG',
    'NU',
    'NF',
    'MP',
    'NO',
    'OM',
    'PK',
    'PW',
    'PS',
    'PA',
    'PG',
    'PY',
    'PE',
    'PH',
    'PN',
    'PL',
    'PT',
    'PR',
    'QA',
    'RE',
    'RO',
    'RU',
    'RW',
    'BL',
    'SH',
    'KN',
    'LC',
    'MF',
    'PM',
    'VC',
    'WS',
    'SM',
    'ST',
    'SA',
    'SN',
    'RS',
    'SC',
    'SL',
    'SG',
    'SX',
    'SK',
    'SI',
    'SB',
    'SO',
    'ZA',
    'GS',
    'SS',
    'ES',
    'LK',
    'SD',
    'SR',
    'SJ',
    'SZ',
    'SE',
    'CH',
    'SY',
    'TW',
    'TJ',
    'TZ',
    'TH',
    'TL',
    'TG',
    'TK',
    'TO',
    'TT',
    'TN',
    'TR',
    'TM',
    'TC',
    'TV',
    'UG',
    'UA',
    'AE',
    'GB',
    'US',
    'UM',
    'UY',
    'UZ',
    'VU',
    'VE',
    'VN',
    'VG',
    'VI',
    'WF',
    'EH',
    'YE',
    'ZM',
    'ZW',
];

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
        if (!invalid && next) next(responses);
    };

    return (
        <div id={id} className="survey">
            <form onSubmit={handleSubmit(onSkipOrNext)}>
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
                    values={getOptions(t('countryOfResidence.countries', { returnObjects: true }), countryCodes)}
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
                        values={getOptions(t('countryOfResidence.countries', { returnObjects: true }), countryCodes)}
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
                <Button type="primary" isSubmit>
                    {isDirty() ? t('navigation.done') : t('navigation.skip')}
                </Button>
            </form>
        </div>
    );
};

export default SurveyPart2;
