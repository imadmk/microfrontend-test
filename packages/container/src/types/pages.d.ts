declare module 'marketing/MarketingApp' {
  export const mount: (
    element: HTMLElement | null,
    options: {
      initialPathName?: string;
      onNavigate: (data: {
        pathname: string;
      }) => void
    }) => {
      onParentNavigate: (data: { pathname: string }) => void;
    };
}

declare module 'auth/AuthApp' {
  export const mount: (
    element: HTMLElement | null,
    options: {
      initialPathName?: string;
      onNavigate: (data: {
        pathname: string;
      }) => void,
      onSignIn?: () => void;
    }) => {
      onParentNavigate: (data: { pathname: string }) => void;
    };
}