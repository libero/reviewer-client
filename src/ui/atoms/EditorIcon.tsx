import boldIcon from '../../core/assets/editor/bold.svg';
import underlineIcon from '../../core/assets/editor/underline.svg';
import italicIcon from '../../core/assets/editor/italic.svg';
import subscriptIcon from '../../core/assets/editor/sub.svg';
import superscriptIcon from '../../core/assets/editor/super.svg';

const lookup: { [key: string]: string } = {
    bold: boldIcon,
    underline: underlineIcon,
    italic: italicIcon,
    subscript: subscriptIcon,
    superscript: superscriptIcon,
};

export default function(name: string): HTMLImageElement {
    const source = lookup[name];
    const svg = document.createElement('img');
    svg.setAttribute('src', source);
    return svg;
}
