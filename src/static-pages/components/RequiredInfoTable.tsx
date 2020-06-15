import React from 'react';
import { useTranslation } from 'react-i18next';

const RequiredInfoTable = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="table-guide">
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>{t('initial-submission.manuscript.table.cols.journal')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.book')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.website')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.data-citation')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.software')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.pre-print')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.conference-proceedings')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.periodical')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.technical-report')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.thesis')}</th>
                        <th>{t('initial-submission.manuscript.table.cols.patent')}</th>
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.authors')}</th>
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓°</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.editors')}</th>
                        <td />
                        <td>✓†</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.year')}</th>
                        <td>✓</td>
                        <td>✓</td>
                        <td />
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓§</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.pub-date')}</th>
                        <td />
                        <td />
                        <td>✓</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>✓</td>
                        <td />
                        <td />
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.title')}</th>
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td />
                        <td />
                        <td>✓</td>
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.pub-title')}</th>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.vol')}</th>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>✓*</td>
                        <td />
                        <td />
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.page-range')}</th>
                        <td>✓</td>
                        <td>✓†</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>✓*</td>
                        <td>✓</td>
                        <td />
                        <td />
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.id')}</th>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td />
                        <td>✓*</td>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td />
                        <td>✓*</td>
                        <td>✓*</td>
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.location')}</th>
                        <td />
                        <td>✓*</td>
                        <td />
                        <td />
                        <td>✓*</td>
                        <td />
                        <td>✓*</td>
                        <td />
                        <td>✓*</td>
                        <td>✓</td>
                        <td>✓</td>
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.publisher')}</th>
                        <td />
                        <td>✓</td>
                        <td />
                        <td />
                        <td>✓*</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>✓*</td>
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.edition')}</th>
                        <td />
                        <td>✓*</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>✓*</td>
                        <td />
                        <td>✓*</td>
                        <td />
                        <td />
                    </tr>
                    <tr>
                        <th>{t('initial-submission.manuscript.table.rows.edition')}</th>
                        <td />
                        <td />
                        <td>✓</td>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td>✓*</td>
                        <td>✓</td>
                        <td />
                        <td>✓*</td>
                        <td>✓*</td>
                        <td>✓</td>
                    </tr>
                </tbody>
            </table>

            <ul>
                <li>{t('initial-submission.manuscript.table.footer.bullet1')}</li>
                <li>{t('initial-submission.manuscript.table.footer.bullet2')}</li>
                <li>{t('initial-submission.manuscript.table.footer.bullet3')}</li>
                <li>{t('initial-submission.manuscript.table.footer.bullet4')}</li>
                <li>{t('initial-submission.manuscript.table.footer.bullet5')}</li>
            </ul>
        </div>
    );
};

export default RequiredInfoTable;
