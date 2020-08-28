import React, { ErrorInfo } from 'react';
import ErrorPage from './ErrorPage';
import { AppBar, AppBarIcon, Footer } from '../../ui/atoms';
import Logo from '../assets/elife-logo.svg';

interface State {
    error?: Error;
}

interface Props {
    children: JSX.Element;
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = {};

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error });
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error-boundary">
                    <AppBar>
                        <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
                    </AppBar>
                    <div className="grid">
                        <div className="error-page">
                            <ErrorPage error={this.state.error} />
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
