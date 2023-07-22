const APIResponse = function (code = 0, data: any = {}, msg: string = "") {
  if (code === 503) {
    code = 10;
    if (msg !== "") {
      msg = "Service Unavailable";
    }
  }
  if (typeof data === "string") {
    msg = data;
    data = {};
  }
  return {
    code,
    data,
    msg,
  };
};

export default {
  APIResponse,
};
