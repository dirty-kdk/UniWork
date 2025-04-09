import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';

const Alert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExited = () => {
    onClose?.();
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="alert"
      unmountOnExit
      onExited={handleExited}
    >
      <div
        className="fixed top-4 right-4 z-50 p-4 rounded-lg border bg-blue-50 text-blue-800 border-blue-200 shadow-lg"
        role="alert"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 p-1 rounded-full text-blue-800 hover:bg-blue-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Alert; 