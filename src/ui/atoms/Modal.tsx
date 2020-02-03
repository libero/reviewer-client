import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './index';
import { useTranslation } from 'react-i18next';

interface Props {
    isShowing: boolean;
    hide: Function;
    children?: JSX.Element[] | JSX.Element;
    onAccept?: Function;
    onCancel?: Function;
    buttonText?: string;
    fullscreen?: boolean;
    buttonType?: string;
    buttonDisabled?: boolean;
}

const Modal = (
    {
        isShowing,
        hide,
        children,
        onAccept,
        onCancel,
        fullscreen = false,
        buttonType = 'danger',
        buttonText,
        buttonDisabled = false,
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
    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal__overlay">
                      <div className="modal__wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                          <div className={`modal ${fullscreen ? 'modal__fullscreen' : ''}`} ref={ref}>
                              <div className="modal__content">{children}</div>
                              <div
                                  className={`modal__buttons_container ${
                                      fullscreen ? 'modal__buttons_container--fullscreen' : ''
                                  }`}
                              >
                                  <div
                                      className={`modal__buttons ${
                                          fullscreen ? 'modal__buttons--fullscreen main-content--centered' : ''
                                      }`}
                                  >
                                      <Button onClick={(): void => cancel()}>Cancel</Button>
                                      <Button
                                          onClick={(): void => accept()}
                                          type={buttonType}
                                          disabled={buttonDisabled}
                                      >
                                          {buttonText || t('ui:modal--default-button')}
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.getElementById('app'),
          )
        : null;
};

export default React.forwardRef(Modal);
