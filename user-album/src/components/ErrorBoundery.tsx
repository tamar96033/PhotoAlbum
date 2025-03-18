import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state to display fallback UI
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      // Log error information
      console.error('Error caught by Error Boundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Render fallback UI
        return (
          <div>
            <h1>Something went wrong.</h1>
            <p>{this.state.error?.message}</p>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;