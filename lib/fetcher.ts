async function fetcher(url: string, method: string, data: any = {}) {
  try {
    const options = gen_options(method, data);
    const res = await fetch(url, options);
    if (res.ok) {
      return { data: await res.json() };
    }
    const out = await res.json();
    let message = out.message || "";

    throw new Error(`${message} at ${res.url} statusCode: ${res.status}`);
  } catch (err) {
    return { error: err.message };
  }
}

function gen_options(method: string, data: any) {
  let opts: any = { method }
  if (method != 'GET' && method != 'BODY') {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  return opts;
}


export {
  fetcher,
  gen_options,
};
