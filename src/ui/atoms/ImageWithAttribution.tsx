import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    image: string;
    artistName: string;
    artistUrl: string;
    align: 'left' | 'right';
    className?: string;
}

const ImageWithAttribution = ({ image, artistName, artistUrl, align, className }: Props): JSX.Element => {
    const { t } = useTranslation('ui');

    return (
        <div
            className={`image-attributed__image image-attributed__image--${align}${!className ? '' : ' ' + className}`}
        >
            <img className="image-attributed__image--image" alt="Login Page Art" src={image} />
            <p className="image-attributed__image--credit">
                {t('image-attribution')}
                <a href={artistUrl}>{artistName}</a>
            </p>
        </div>
    );
};

export default ImageWithAttribution;
