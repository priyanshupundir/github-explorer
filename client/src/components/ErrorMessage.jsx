const ErrorMessage = ({ message, className = "" }) =>
  !message ? null : (
    <div
      className={`mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 ${className}`}
    >
      {message}
    </div>
  );

export default ErrorMessage;