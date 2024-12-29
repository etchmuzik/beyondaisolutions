declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (
        container: string,
        params: {
          sitekey: string;
          theme?: 'light' | 'dark';
          callback: (token: string) => void;
        }
      ) => number;
      reset: (id?: number) => void;
      getResponse: (id?: number) => string;
    };
  }
}

export {};