interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="cyber-loading">
      <div className="cyber-spinner"></div>
      <span>{message}</span>
    </div>
  );
}