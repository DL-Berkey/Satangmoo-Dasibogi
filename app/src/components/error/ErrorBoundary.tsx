import { ReactNode, Component, ErrorInfo } from "react";
import Error from "./ErrorPage";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    constructor(props: Props) {
        super(props);

        this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    }

    static getDerivedStateFromError(error: unknown) {
        console.error(error);

        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Uncaught error: ", error, errorInfo);
    }

    resetErrorBoundary() {
        this.setState(() => ({
            hasError: false,
        }));
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <Error resetErrorBoundary={this.resetErrorBoundary} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
