export default function(): void {
    if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView();
            }, 200);
        }
    }
}
