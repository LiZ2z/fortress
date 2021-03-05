const getBody = (res) => {
  const contentType = res.headers.get('content-Type');

  if (/^text\/plain/.test(contentType)) {
    return res.text();
  }

  if (/^application\/json/.test(contentType)) {
    return res.json();
  }

  return undefined;
};

export default function fetch(input, init) {
  return window.fetch(`http://localhost:3000${input}`, init).then((res) => {
    return getBody(res).then((data) => {
      return {
        raw: res,
        data,
      };
    });
  });
}
