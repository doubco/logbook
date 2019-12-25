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

class LogBook {
  constructor(props = {}) {
    this.options = props.options;
    this.hook = props.hook;

    this.themes = {
      info: {
        color: FGBLACK,
        colorHex: "#ccc",
        bg: BGWHITE,
        bgHex: "#999"
      },
      warning: {
        color: FGBLACK,
        colorHex: "#000",
        bg: BGYELLOW,
        bgHex: "#ff0"
      },
      error: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGRED,
        bgHex: "#f00"
      },
      success: {
        color: FGBLACK,
        colorHex: "#fff",
        bg: BGGREEN,
        bgHex: "#108400"
      },
      black: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGBLACK,
        bgHex: "#000"
      },
      blue: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGBLUE,
        bgHex: "#00f"
      },
      cyan: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGCYAN,
        bgHex: "#0ff"
      },
      magenta: {
        color: FGWHITE,
        colorHex: "#fff",
        bg: BGMAGENTA,
        bgHex: "#f0f"
      }
    };

    Object.keys(this.themes).forEach(theme => {
      this[theme] = (key, ...rest) => {
        this.log(key, this.themes[theme], ...rest);
      };
      this[theme] = this[theme].bind(this);
    });

    this.browser = {};
    Object.keys(this.themes).forEach(theme => {
      this.browser[theme] = (key, ...rest) => {
        this.log(key, { ...this.themes[theme], onlyBrowser: true }, ...rest);
      };
    });
  }

  log(key, options = {}, ...rest) {
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
            ...rest
          );
        } else {
          if (!onlyBrowser) {
            console.log(" ");
            console.log(`${bg + color}`, key, RESET, ...rest);
          }
        }
      }
    }

    if (this.hook) {
      this.hook(key, ...rest);
    }
  }

  group(...args) {
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
