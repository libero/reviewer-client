import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, AppBarIcon, Paragraph } from '../../ui/atoms';
import Logo from '../../core/assets/elife-logo.svg';
import Chrome from '../../core/assets/browsers/chrome.png';
import Edge from '../../core/assets/browsers/edge.png';
import Firefox from '../../core/assets/browsers/firefox.png';
import Opera from '../../core/assets/browsers/opera.png';
import Safari from '../../core/assets/browsers/safari.png';
import Interweave from 'interweave';

const NotSupportedBrowser = (): JSX.Element => {
    const { t } = useTranslation('browser-not-supported');

    return (
        <div className="not-supported-browser">
            <AppBar>
                <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            </AppBar>
            <h1 className="typography__heading typography__heading--h1">{t('heading')}</h1>
            <Paragraph type="writing" secondary={true}>
                {t('sub-heading')}
            </Paragraph>
            <div className="browser-container">
                <div className="browser">
                    <img src={Chrome} />
                    <Paragraph type="writing" secondary={true}>
                        <Interweave content={t('chrome')} />
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Firefox} />
                    <Paragraph type="writing" secondary={true}>
                        <Interweave content={t('firefox')} />
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Edge} />
                    <Paragraph type="writing" secondary={true}>
                        <Interweave content={t('edge')} />
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Safari} />
                    <Paragraph type="writing" secondary={true}>
                        <Interweave content={t('safari')} />
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Opera} />
                    <Paragraph type="writing" secondary={true}>
                        <Interweave content={t('opera')} />
                    </Paragraph>
                </div>
            </div>
            <Link to="/" className="typography__body--link">
                {"Return to eLife's homepage"}
            </Link>
        </div>
    );
};

export default NotSupportedBrowser;
