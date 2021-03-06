import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from './index';
import { useTranslation } from 'react-i18next';

interface Props {
    isShowing: boolean;
    hide: Function;
    children?: React.ReactNode;
    onAccept?: () => void;
    onCancel?: () => void;
    buttonText?: string;
    fullscreen?: boolean;
    fixedPositionButtons?: boolean;
    buttonType?: string;
    buttonDisabled?: boolean;
    wrapperClass?: string;
    contentClass?: string;
}

const Modal = (
    {
        isShowing,
        hide,
        children,
        onAccept,
        onCancel,
        fullscreen = false,
        fixedPositionButtons = true,
        buttonType = 'danger',
        buttonText,
        buttonDisabled = false,
        wrapperClass,
        contentClass,
    }: Props,
    ref: React.Ref<HTMLDivElement>,
): JSX.Element => {
    const { t } = useTranslation('ui');
    const accept = (): void => {
        if (onAccept) {
            onAccept();
        }
        hide();
    };
    const cancel = (): void => {
        if (onCancel) {
            onCancel();
        }
        hide();
    };
    useEffect(() => {
        if (isShowing) {
            document.body.setAttribute('style', 'overflow: hidden;');
        } else {
            document.body.setAttribute('style', '');
        }
    }, [isShowing]);
    const controls = (
        <div
            className={`modal__buttons_container ${
                fullscreen && fixedPositionButtons ? 'modal__buttons_container--fullscreen' : ''
            }`}
        >
            <div className={`modal__buttons ${fullscreen ? 'modal__buttons--fullscreen main-content--centered' : ''}`}>
                <div>
                    <Button onClick={(): void => cancel()}>{t('modal--cancel-button')}</Button>
                    <Button onClick={(): void => accept()} type={buttonType} disabled={buttonDisabled}>
                        {buttonText || t('modal--default-button')}
                    </Button>
                </div>
            </div>
        </div>
    );

    return isShowing
        ? ReactDOM.createPortal(
              <div className="modal__overlay">
                  <div className={`modal__wrapper ${wrapperClass}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className={`modal ${fullscreen ? 'modal__fullscreen' : ''}`} ref={ref}>
                          <div className={`modal__content ${contentClass}`}>
                              {children}
                              {fullscreen && !fixedPositionButtons && controls}
                          </div>
                          {(!fullscreen || fixedPositionButtons) && controls}
                      </div>
                  </div>
              </div>,
              document.getElementById('app'),
          )
        : null;
};

export default React.forwardRef(Modal);
