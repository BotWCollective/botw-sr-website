import { NextApiRequest, NextApiResponse } from 'next'

import withPassport, { passport } from '../../../lib/withPassport'

import { setLoginSession } from '../../../lib/auth'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  if (!provider) {
    return { statusCode: 404 }
  }

  passport.authenticate(provider)(req, res, (...args) => { });
}

export default withPassport(handler);
