import React from 'react';

interface Props {
    src: string;
    style?: { border: number };
    height: number;
    width: number;
}

export default ({ src, style = { border: 0 }, height, width }: Props) => (
    <div id="chart_embed_one">
        <iframe
            allowFullScreen
            frameBorder="0"
            height={height}
            src={src}
            style={style}
            title="Number of eLife submissions"
            width={width}
        />
    </div>
);
