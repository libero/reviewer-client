import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ContactUsNavigation = (): JSX.Element => {
    const { t } = useTranslation('contactus');

    return (
        <div>
            <p>
                <Link to="/contact-us/contact-elife" className="typography__body--link">
                    Contact eLife
                </Link>
            </p>
            <p>
                <Link to="/contact-us/editorial-staff" className="typography__body--link">
                    Editorial Staff
                </Link>
            </p>
            <p>
                <Link to="/contact-us/production-staff" className="typography__body--link">
                    Production Staff
                </Link>
            </p>
        </div>
    );
};

export default ContactUsNavigation;
