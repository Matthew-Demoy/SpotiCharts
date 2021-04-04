export const defaultPuppeteerOptions = {
    headless: true,
    args: [
      "--disable-features=site-per-process --flag-switches-begin --disable-site-isolation-trials --flag-switches-end",  "--no-sandbox",
      "--disable-gpu"
    ],
  }