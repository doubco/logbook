const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";
const DIM = "\x1b[2m";
const UNDERSCORE = "\x1b[4m";
const BLINK = "\x1b[5m";
const REVERSE = "\x1b[7m";
const HIDDEN = "\x1b[8m";

const FGBLACK = "\x1b[30m";
const FGRED = "\x1b[31m";
const FGGREEN = "\x1b[32m";
const FGYELLOW = "\x1b[33m";
const FGBLUE = "\x1b[34m";
const FGMAGENTA = "\x1b[35m";
const FGCYAN = "\x1b[36m";
const FGWHITE = "\x1b[37m";

const BGBLACK = "\x1b[40m";
const BGRED = "\x1b[41m";
const BGGREEN = "\x1b[42m";
const BGYELLOW = "\x1b[43m";
const BGBLUE = "\x1b[44m";
const BGMAGENTA = "\x1b[45m";
const BGCYAN = "\x1b[46m";
const BGWHITE = "\x1b[47m";

export type TLogOptions = {
  color?: string;
  colorHex?: string;
  bg?: string;
  bgHex?: string;
  onlyBrowser?: boolean;
};
export type TLogBookOptions = {
  browser?: boolean;
  visible?: boolean;
  colorize?: boolean;
  dontUseSeparator?: boolean;
};

export type TLogBookHook = (key: string, options?: TLogOptions) => void;

export type TLogBookConfig = {
  options?: TLogBookOptions;
  hook?: TLogBookHook;
};

export interface ILogThemes {
  info: TLogOptions;
  warning: TLogOptions;
  error: TLogOptions;
  success: TLogOptions;
  black: TLogOptions;
  blue: TLogOptions;
  cyan: TLogOptions;
  magenta: TLogOptions;
}

export type TLogger = (key: string, ...rest: any) => void;

export class LogBook {
  hook: TLogBookHook;
  options: TLogBookOptions;
  themes: ILogThemes;
  browser: {
    info: TLogger;
    warning: TLogger;
    error: TLogger;
    success: TLogger;
    black: TLogger;
    blue: TLogger;
    cyan: TLogger;
    magenta: TLogger;
  };

  info: TLogger;
  warning: TLogger;
  error: TLogger;
  success: TLogger;
  black: TLogger;
  blue: TLogger;
  cyan: TLogger;
  magenta: TLogger;

  constructor(config?: TLogBookConfig) {
    this.options = config?.options || {};
    this.hook = config?.hook;

    this.themes = {
      info: {
        color: FGBLACK,
        colorHex: "#ccc",
        bg: BGWHITE,
        bgHex: "#999",
      },
      warning: {
        color: FGBLACK,
        colorHex: "#000",
        bg: BGYELLOW,
        bgHex: "#ff0",
      },
      error: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGRED,
        bgHex: "#f00",
      },
      success: {
        color: FGBLACK,
        colorHex: "#fff",
        bg: BGGREEN,
        bgHex: "#108400",
      },
      black: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGBLACK,
        bgHex: "#000",
      },
      blue: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGBLUE,
        bgHex: "#00f",
      },
      cyan: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGCYAN,
        bgHex: "#0ff",
      },
      magenta: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGMAGENTA,
        bgHex: "#f0f",
      },
    };

    Object.keys(this.themes).forEach((theme: keyof ILogThemes) => {
      this[theme as keyof ILogThemes] = (key, ...rest) => {
        this.log(key, this.themes[theme], ...rest);
      };
      this[theme] = this[theme].bind(this);
    });

    this.browser = {
      info: () => null,
      warning: () => null,
      error: () => null,
      success: () => null,
      black: () => null,
      blue: () => null,
      cyan: () => null,
      magenta: () => null,
    };
    Object.keys(this.themes).forEach((theme: keyof ILogThemes) => {
      this.browser[theme] = (key, ...rest) => {
        this.log(key, { ...this.themes[theme], onlyBrowser: true }, ...rest);
      };
    });
  }

  log(key: string, options: TLogOptions = {}, ...rest: any) {
    const { browser, visible, colorize = true } = this.options;
    const { color, colorHex, bg, bgHex, onlyBrowser } = options;

    if (visible) {
      if (!colorize) {
        console.log(`[${key}]`, ...rest);
      } else {
        if (browser) {
          console.log(
            `%c ${key} `,
            `background: ${bgHex}; color: ${colorHex}`,
            ...rest,
          );
        } else {
          if (!onlyBrowser) {
            if (!this.options.dontUseSeparator) {
              console.log(" ");
            }
            console.log(`${bg + color}`, key, RESET, ...rest);
          }
        }
      }
    }

    if (this.hook) {
      this.hook(key, ...rest);
    }
  }

  group(...args: any[]) {
    if (this.options.visible) {
      console.groupCollapsed(...args);
    }
  }

  groupEnd() {
    if (this.options.visible) {
      console.groupEnd();
    }
  }
}

export default LogBook;
