import React, { ErrorInfo } from 'react';
import ErrorPage from './ErrorPage';

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
            return <ErrorPage error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
