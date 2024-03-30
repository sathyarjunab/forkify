import { TIME_OUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadDate = undefined) {
  try {
    const fetchPro = uploadDate
      ? fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadDate),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return res.json();
  } catch (err) {
    err = 'the data could not be found search for somthing else';
    throw err;
  }
};
/*
export const get_json = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIME_OUT)]);
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return res.json();
  } catch (err) {
    err = 'the data could not be found search for somthing else';
    throw err;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    if (!res.ok) {
      throw new Error(`${data.message}`);
    }
    return res.json();
  } catch (err) {
    err = 'the data could not be found search for somthing else';
    throw err;
  }
};*/
