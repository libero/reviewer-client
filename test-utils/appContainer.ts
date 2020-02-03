export default () => {
    const wrapperEl = document.createElement('div');
    wrapperEl.id = 'app';
    document.body.appendChild(wrapperEl);
    return wrapperEl;
};
