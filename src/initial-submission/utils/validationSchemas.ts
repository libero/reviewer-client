import * as yup from 'yup';
import { ReviewerAlias } from '../types';
import i18next from 'i18next';

const MIN_SUGGESTED_SENIOR_EDITORS = 2;
const MAX_SUGGESTED_SENIOR_EDITORS = 6;
const MIN_SUGGESTED_REVIEWING_EDITORS = 2;
const MAX_SUGGESTED_REVIEWING_EDITORS = 6;
const MAX_SUGGESTED_REVIEWERS = 6;
const MAX_OPPOSED_REVIEWERS = 2;
const MAX_OPPOSED_REVIEWING_EDITORS = 2;
const MAX_OPPOSED_SENIOR_EDITORS = 1;

const AuthorDetailsSchema = (t: i18next.TFunction): yup.ObjectSchema =>
    yup.object().shape({
        firstName: yup.string().required(t('author.validation.first-name-required')),
        lastName: yup.string().required(t('author.validation.last-name-required')),
        email: yup
            .string()
            .trim()
            .email(t('author.validation.email-format'))
            .required(t('author.validation.email-required')),
        institution: yup.string().required(t('author.validation.institution-required')),
    });

const DetailsSchema = (t: i18next.TFunction): yup.ObjectSchema =>
    yup.object().shape({
        title: yup.string().required(t('details.validation.title-required')),
        subjects: yup.array().when('articleType', {
            is: (articleType: string) => articleType && articleType === 'feature',
            then: yup
                .array()
                .of(yup.string())
                .max(2, t('details.validation.subjects-max'))
                .nullable(),
            otherwise: yup
                .array()
                .of(yup.string())
                .min(1, t('details.validation.subjects-min'))
                .max(2, t('details.validation.subjects-max'))
                .required(t('details.validation.subjects-required'))
                .nullable(),
        }),
        previouslyDiscussed: yup
            .string()
            .notOneOf(['', undefined], t('details.validation.previously-discussed-required'))
            .nullable(),
        previouslySubmitted: yup
            .string()
            .notOneOf(['', undefined], t('details.validation.previously-submitted-required'))
            .nullable(),
        firstCosubmissionTitle: yup
            .string()
            .notOneOf(['', undefined], t('details.validation.cosubmission-required'))
            .nullable(),
    });

const DisclosureSchema = (t: i18next.TFunction): yup.ObjectSchema =>
    yup.object().shape({
        submitterSignature: yup.string().required(t('disclosure.validation.signature')),
        disclosureConsent: yup
            .bool()
            .required()
            .oneOf([true], t('disclosure.validation.consent')),
    });

const EditorsSchema = (t: i18next.TFunction): yup.ObjectSchema =>
    yup.object().shape({
        suggestedSeniorEditors: yup.array().when('articleType', {
            is: (articleType: string) => articleType && articleType === 'feature',
            then: yup.array().max(MAX_SUGGESTED_SENIOR_EDITORS, t('editors.validation.suggested-senior-editors-max')),
            otherwise: yup
                .array()
                .min(MIN_SUGGESTED_SENIOR_EDITORS, t('editors.validation.suggested-senior-editors-min'))
                .max(MAX_SUGGESTED_SENIOR_EDITORS, t('editors.validation.suggested-senior-editors-max')),
        }),

        suggestedReviewers: yup
            .array(
                yup.object().shape(
                    {
                        name: yup
                            .string()
                            .trim()
                            .when('email', {
                                is: email => email && email.length > 0,
                                then: yup.string().required(t('editors.validation.reviewers-name-required')),
                                otherwise: yup.string(),
                            }),
                        email: yup
                            .string()
                            .trim()
                            .when('name', {
                                is: name => name && name.length > 0,
                                then: yup
                                    .string()
                                    .email(t('editors.validation.reviewers-email-valid'))
                                    .required(t('editors.validation.reviewers-email-required')),
                                otherwise: yup.string().email(t('editors.validation.reviewers-email-valid')),
                            }),
                    },
                    [['name', 'email']],
                ),
            )
            .max(MAX_SUGGESTED_REVIEWERS, t('editors.validation.suggested-reviewers-max')),
        opposedReviewers: yup
            .array(
                yup.object().shape(
                    {
                        name: yup
                            .string()
                            .trim()
                            .when('email', {
                                is: email => email && email.length > 0,
                                then: yup.string().required(t('editors.validation.reviewers-name-required')),
                                otherwise: yup.string(),
                            }),
                        email: yup
                            .string()
                            .trim()
                            .when('name', {
                                is: name => name && name.length > 0,
                                then: yup
                                    .string()
                                    .email(t('editors.validation.reviewers-email-valid'))
                                    .required(t('editors.validation.reviewers-email-required')),
                                otherwise: yup.string().email(t('editors.validation.reviewers-email-valid')),
                            }),
                    },
                    [['name', 'email']],
                ),
            )
            .max(MAX_OPPOSED_REVIEWERS),
        opposedReviewersReason: yup.string().when('opposedReviewers', {
            is: (editors: ReviewerAlias[]) => editors.some(editor => editor.name + editor.email !== ''),
            then: yup.string().required(t('editors.validation.opposed-reviewers-reason-required')),
        }),
        opposedReviewingEditors: yup
            .array()
            .max(MAX_OPPOSED_REVIEWING_EDITORS, t('editors.validation.opposed-reviewing-editors-max')),
        opposedReviewingEditorsReason: yup.string().when('opposedReviewingEditors', {
            is: editors => !!editors.length,
            then: yup.string().required(t('editors.validation.opposed-reviewing-editors-reason-required')),
        }),
        opposedSeniorEditors: yup.array().max(MAX_OPPOSED_SENIOR_EDITORS, t('opposed-senior-editors-max')),
        opposedSeniorEditorsReason: yup.string().when('opposedSeniorEditors', {
            is: editors => !!editors.length,
            then: yup.string().required(t('editors.validation.opposed-senior-editors-reason-required')),
        }),
        suggestedReviewingEditors: yup.array().when('articleType', {
            is: (articleType: string) => articleType && articleType === 'feature',
            then: yup
                .array()
                .max(MAX_SUGGESTED_REVIEWING_EDITORS, t('editors.validation.suggested-reviewing-editors-max')),
            otherwise: yup
                .array()
                .min(MIN_SUGGESTED_REVIEWING_EDITORS, t('editors.validation.suggested-reviewing-editors-min'))
                .max(MAX_SUGGESTED_REVIEWING_EDITORS, t('editors.validation.suggested-reviewing-editors-max')),
        }),
    });

const FileDetailsSchema = (t: i18next.TFunction): yup.ObjectSchema =>
    yup.object().shape({
        coverLetter: yup
            .string()
            .required(t('files.validation.coverletter-required'))
            .notOneOf(['<p></p>'], t('files.validation.coverletter-required')),
        manuscriptFile: yup
            .object()
            .required(t('files.validation.manuscript-required'))
            .nullable(),
        uploadingSupportingFiles: yup.boolean().oneOf([false], t('files.validation.uploading-supporting-files')),
    });

export { AuthorDetailsSchema, DetailsSchema, DisclosureSchema, EditorsSchema, FileDetailsSchema };
