import fetch from "node-fetch";

export const fetchRetry = async (
  url: string,
  options: any,
  retries: number = 3,
  delay: number = 300
) => {
  var tries = 0;
  var success = false;
  var res;
  while (tries < retries && !success) {
    res = await fetch(encodeURI(url), {
      ...options,
    });

    if (res.status !== 429) {
      success = true;
      console.log("fetch success(not 429)");
    } else {
      const retry = res.headers.get("Retry-After");
      console.log(
        "Retrying " + url + " in " + retry + "seconds\n try number " + tries
      );
      await setTimeout(() => {}, parseInt(retry ?? "1000") * 1000);
    }
    tries = tries + 1;
  }

  console.log("returning at try number " + tries)
  return res;
};
