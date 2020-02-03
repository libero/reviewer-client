import React from 'react';
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
    const { t } = useTranslation();
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
    const controls = (
        <div
            className={`modal__buttons_container ${
                fullscreen && fixedPositionButtons ? 'modal__buttons_container--fullscreen' : ''
            }`}
        >
            <div className={`modal__buttons ${fullscreen ? 'modal__buttons--fullscreen main-content--centered' : ''}`}>
                <Button onClick={(): void => cancel()}>Cancel</Button>
                <Button onClick={(): void => accept()} type={buttonType} disabled={buttonDisabled}>
                    {buttonText || t('ui:modal--default-button')}
                </Button>
            </div>
        </div>
    );

    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal__overlay">
                      <div
                          className={`modal__wrapper ${wrapperClass}`}
                          aria-modal
                          aria-hidden
                          tabIndex={-1}
                          role="dialog"
                      >
                          <div className={`modal ${fullscreen ? 'modal__fullscreen' : ''}`} ref={ref}>
                              <div className={`modal__content ${contentClass}`}>
                                  {children}
                                  {!fixedPositionButtons && controls}
                              </div>
                              {fixedPositionButtons && controls}
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.getElementById('app'),
          )
        : null;
};

export default React.forwardRef(Modal);
