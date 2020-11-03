import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, AppBarIcon, Paragraph } from '../../ui/atoms';
import Logo from '../assets/elife-logo.svg';
import Chrome from '../assets/browsers/chrome.png';
import Edge from '../assets/browsers/edge.png';
import Firefox from '../assets/browsers/firefox.png';
import Opera from '../assets/browsers/opera.png';
import Safari from '../assets/browsers/safari.png';

const NotSupportedBrowser = (): JSX.Element => {
    const { t } = useTranslation('browser-not-supported');

    return (
        <div className="not-supported-browser">
            <AppBar>
                <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            </AppBar>
            <h1 className="typography__heading typography__heading--h1">Your browser is not supported</h1>
            <Paragraph type="writing" secondary={true}>
                We recommed using one of the following browsers to submit your research
            </Paragraph>
            <div className="browser-container">
                <div className="browser">
                    <img src={Chrome} />
                    <Paragraph type="writing" secondary={true}>
                        Google
                        <br />
                        Chrome
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Firefox} />
                    <Paragraph type="writing" secondary={true}>
                        Mozilla
                        <br />
                        Firefox
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Edge} />
                    <Paragraph type="writing" secondary={true}>
                        Microsoft
                        <br />
                        Edge
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Safari} />
                    <Paragraph type="writing" secondary={true}>
                        Safari
                    </Paragraph>
                </div>

                <div className="browser">
                    <img src={Opera} />
                    <Paragraph type="writing" secondary={true}>
                        Opera
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
