# LogBook 📕

## Install

`npm install @doubco/log-book --save` or `yarn add @doubco/log-book`

## Setup

```js
import { LogBook } from "@doubco/log-book";

export default new LogBook({
  options: {
    colorize: !process.env.NO_COLOR,
    visible: process.env.NODE_ENV == "development" || process.env.SHOW_LOGS,
    browser: process.browser
  },
  hook: (key, ...rest) => {
    // you can use hook to push log to a service.
  }
});
```

## Usage

```js
import log from "./my-logger";

log.info("APP", "Hello World.").

log.error("APP", "Hello World.").

log.warning("APP", "Hello World.").

log.success("APP", "Hello World.").

log.black("APP", "Hello World.").

log.blue("APP", "Hello World.").

log.cyan("APP", "Hello World.").

log.magenta("APP", "Hello World.").
```

---

## Contribute

Pull requests are welcome and please submit bugs 🐛.

## Contact

- Follow [@doubco](https://twitter.com/doubco) on Twitter
- Follow [@doubco](http://facebook.com/doubco) on Facebook
- Follow [@doubco](http://instagram.com/doubco) on Instagram
- Email <mailto:hi@doub.co>
