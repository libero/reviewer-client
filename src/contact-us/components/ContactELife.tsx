import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('contactus');

    return (
        <div>
            <h1>Contact eLife</h1>

            <Paragraph type="writing">
                You can use the &quot;Check Status&quot; link under Manuscript Tasks to find information about your
                article and how long different parts of the editorial and review process can take. You can also read
                about the system&apos;s requirements regarding browsers, emails, and PDFs if you are having
                difficulties. If you have any further questions about submitting, submitted, or accepted articles,
                please contact our editorial or production teams:
            </Paragraph>

            <ul>
                <li>editorial [at] elifesciences [dot] org</li>
                <li>production [at] elifesciences [dot] org</li>
            </ul>

            <Paragraph type="writing">Media inquiries may be addressed to our communications team at:</Paragraph>

            <ul>
                <li>press [at] elifesciences [dot] org</li>
            </ul>
        </div>
    );
};

export default ContactUsElife;
