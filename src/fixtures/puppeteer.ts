export const defaultPuppeteerOptions = {
    headless: false,
    args: [
      "--disable-features=site-per-process --flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ],
  }