import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ContactUsNavigation = ({ links }: { links: Array<{ link: string; label: string }> }): JSX.Element => {
    const { t } = useTranslation('contactus');

    return (
        <div>
            {links.map(l => (
                <p>
                    <Link to={l.link} className="typography__body--link">
                        {l.label}
                    </Link>
                </p>
            ))}
        </div>
    );
};

export default ContactUsNavigation;
