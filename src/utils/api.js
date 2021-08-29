import * as Axios from "axios";

const ENDPOINT = "https://jujitsu.api.irfanarifstudio.net/api";

Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Axios.defaults.headers.common["Content-Type"] = "application/json";

const csrfToken = async () => {
  const csrf = await Get("/check_csrf/honeybadger");
  console.log(csrf);
};

export const Get = async (url) => {
  let send;
  //   csrfToken();
  Axios.get(ENDPOINT + url)
    .then((res) => {
      console.log(res);
      if (res.data) {
        send = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      send = null;
    });

  return send;
};

export const Post = async (url, data) => {
  //   csrfToken();
  let send;
  Axios.post(ENDPOINT + url, data)
    .then((res) => {
      if (res.data) {
        send = res.data;
      }
    })
    .catch((err) => err && (send = null));

  return send;
};
