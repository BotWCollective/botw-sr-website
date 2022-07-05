import { NextApiRequest, NextApiResponse } from 'next'

import { setLoginSession } from '../../../lib/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await setLoginSession(res, {});
  res.redirect('/');
}

export default handler;

