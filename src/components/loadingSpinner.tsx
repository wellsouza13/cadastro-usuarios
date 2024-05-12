import { SpinnerProps } from "../interface/components/loadingSpinner";

export const LoadingSpinner = ({ isLoading }: SpinnerProps) => {
  if (!isLoading) return null;

  return (
    <div className="spinner-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
};

