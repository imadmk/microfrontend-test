import { mount } from 'auth/AuthApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }: { onSignIn: () => void }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPathName: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          // prevent infinite loop
          history.push(nextPathname);
        }
      },
      onSignIn: () => {
        onSignIn();
      }
    });

    const unregister = history.listen(({ pathname }) => {
      onParentNavigate({ pathname });
    });

    return () => {
      unregister();
    }
  }, []);

  return <div ref={ref} />
}