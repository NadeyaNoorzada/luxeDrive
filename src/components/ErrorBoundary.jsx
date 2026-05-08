import { Component } from 'react';

const styles = {
  container: 'min-h-screen flex items-center justify-center bg-luxury-black px-4',
  wrapper: 'text-center max-w-md',
  icon: 'text-6xl mb-6',
  title: 'text-2xl font-bold mb-3',
  message: 'text-white/50 mb-6',
  button: 'btn-gold px-8 py-4 text-sm',
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.icon}>⚠️</div>
            <h1 className={styles.title} style={{ color: '#fff' }}>Something went wrong</h1>
            <p className={styles.message}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className={styles.button}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
