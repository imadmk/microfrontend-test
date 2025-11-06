import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory, MemoryHistory, History } from 'history';

interface MountOptions {
  onNavigate?: (data: { pathname: string }) => void;
  defaultHistory?: History;
  initialPathName?: string;
}

const mount = (el: Element, options: MountOptions) => {
  const { onNavigate, defaultHistory, initialPathName } = options;
  const history = defaultHistory ?? createMemoryHistory({
    initialEntries: [initialPathName],
  });
  if (onNavigate) {
    history.listen((location) => {
      onNavigate({ pathname: location.pathname });
    });
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }: { pathname: string }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');
  if (devRoot) {
    mount(devRoot, {
      onNavigate: () => { },
      defaultHistory: createBrowserHistory(),
    });
  }
}

export { mount };