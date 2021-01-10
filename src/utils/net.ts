import fetch from "node-fetch";

export const fetchRetry = async (
  url: string,
  options: any,
  retries: number = 3,
  delay: number = 3
) => {

  
  return fetch(encodeURI(url), {
    ...options,
  }).then(async (res) => {
    if (res.ok) return res.json();
    const retry = res.headers.get("Retry-After");
    console.log("Timed Out: Waiting after " + retry + " seconds")
    if (retries > 0) {
      await setTimeout(() => {
        return fetchRetry(
          url,
          options,
          retries - 1,
          parseInt(retry ?? delay.toString()) * 1000 * 2
        );
      }, parseInt(retry ?? delay.toString()) * 1000);
    } else {
      throw new Error(await res.json())
    }
  }).catch(e => {console.log(e)});

};
