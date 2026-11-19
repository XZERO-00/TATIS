import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TATIS ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center bg-card rounded-xl border border-destructive/20 m-4">
          <div className="rounded-full bg-destructive/10 p-3 text-destructive mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Something went wrong
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted-foreground">
            {this.state.error?.message ||
              'An unexpected error occurred while rendering this component.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={this.handleReset}
            className="mt-4 gap-2 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
