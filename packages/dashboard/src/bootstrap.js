import { createApp } from 'vue'
import Dashboard from './Dashboard.vue';

// interface MountOptions {
//   onNavigate?: (data: { pathname: string }) => void;
//   defaultHistory?: History;
//   initialPathName?: string;
// }

// const mount = (el: Element, options: MountOptions) => {
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if (devRoot) {
    mount(devRoot, {});
  }
}

export { mount };