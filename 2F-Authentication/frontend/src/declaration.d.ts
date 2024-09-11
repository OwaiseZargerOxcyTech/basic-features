declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const value: string;
    export default value;
  }

  declare module 'js-cookies' {
    interface CookiesStatic {
      get(name: string): string | undefined;
      set(name: string, value: string, options?: Record<string, unknown>): void;
      remove(name: string, options?: Record<string, unknown>): void;
    }
  
    const Cookies: CookiesStatic;
    export default Cookies;
  }
  
  