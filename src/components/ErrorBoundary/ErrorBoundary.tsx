import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Something went wrong. There is an error in the component.
          <button onClick={this.handleButtonClick}>
            Trigger Error Manually
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
