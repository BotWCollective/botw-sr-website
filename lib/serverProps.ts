
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { loginDetails } from './loggedin'

export default async function getServerSideProps(ctx: GetServerSideProps) {
  let user = await loginDetails(ctx.req);
  return {
    props: { user }
  };
}

export function asNextApi(req: any, res: any) {
  res.status = (statusCode: number) => sendStatusCode(res, statusCode);
  res.send = (data: any) => sendData(req, res, data);
  res.json = (data: any) => sendJson(res, data);
  res.redirect = (statusOrUrl: number | string, url?: string) =>
    redirect(res, statusOrUrl, url);
  return [req, res];
}

// Copied and modified from
// https://github.com/vercel/next.js/blob/72f5c93aaded6b5310e9d8796857768c5432b4f2/packages/next/server/api-utils/node.ts#L1
// Allows for API Response functions to be used in getServerSideProps()
// 2022-07-05

export function sendStatusCode(res: NextApiResponse, statusCode: number): NextApiResponse<any> {
  res.statusCode = statusCode;
  return res;
}

export function redirect(res: NextApiResponse, statusOrUrl: string | number, url?: string): NextApiResponse<any> {
  if (typeof statusOrUrl === 'string') {
    url = statusOrUrl
    statusOrUrl = 307
  }
  if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
    throw new Error(
      `Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`
    )
  }
  res.writeHead(statusOrUrl, { Location: url })
  res.write(url)
  res.end()
  return res
}
export function sendJson(res: NextApiResponse, jsonBody: any): void {
  // Set header to application/json
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  // Use send to handle request
  res.send(JSON.stringify(jsonBody))
}
export function sendData(req: NextApiRequest, res: NextApiResponse, body: any): void {
  if (body === null || body === undefined) {
    res.end()
    return
  }

  // strip irrelevant headers/body
  if (res.statusCode === 204 || res.statusCode === 304) {
    res.removeHeader('Content-Type')
    res.removeHeader('Content-Length')
    res.removeHeader('Transfer-Encoding')

    if (process.env.NODE_ENV === 'development' && body) {
      console.warn(
        `A body was attempted to be set with a 204 statusCode for ${req.url}, this is invalid and the body was ignored.\n` +
        `See more info here https://nextjs.org/docs/messages/invalid-api-status-body`
      )
    }
    res.end()
    return
  }

  const contentType = res.getHeader('Content-Type')

  //if (body instanceof Stream) {
  //  if (!contentType) {
  //    res.setHeader('Content-Type', 'application/octet-stream')
  //  }
  //  body.pipe(res)
  //  return
  //}

  const isJSONLike = ['object', 'number', 'boolean'].includes(typeof body)
  const stringifiedBody = isJSONLike ? JSON.stringify(body) : body
  //const etag = generateETag(stringifiedBody)
  //if (sendEtagResponse(req, res, etag)) {
  //  return
  //}

  if (Buffer.isBuffer(body)) {
    if (!contentType) {
      res.setHeader('Content-Type', 'application/octet-stream')
    }
    res.setHeader('Content-Length', body.length)
    res.end(body)
    return
  }

  if (isJSONLike) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
  }

  res.setHeader('Content-Length', Buffer.byteLength(stringifiedBody))
  res.end(stringifiedBody)
}
