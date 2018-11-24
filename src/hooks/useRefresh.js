import { useState, useEffect, useRef } from 'react';

function useRefresh(intervalMillies, handler) {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);
  const share = useRef();

  useEffect(() => {
    // Sharing function and last refresh value because they can't be recaptured by checkRefresh
    share.current = { sHandler: handler, sLastRefresh: lastRefresh };

    const checkRefresh = () => {
      const { sHandler, sLastRefresh } = share.current;

      if (sLastRefresh + intervalMillies < Date.now()) {
        setLastRefresh(Date.now());
        if (sHandler) {
          sHandler();
        }
      }

      setTimeout(checkRefresh, 500);
    };

    if (!isRunning) {
      checkRefresh(Date.now() - 1);
      setIsRunning(true);
    }
  });

  return lastRefresh;
}


export default useRefresh;
