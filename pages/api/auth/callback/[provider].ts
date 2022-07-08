import { NextApiResponse, NextApiRequest } from 'next'
import withPassport, { passport } from '../../../../lib/withPassport'
import { setLoginSession, getLoginSession } from '../../../../lib/auth';
import { findUser, createUser, setUserToken } from '../../../../lib/user'
import { v4 as uuidv4 } from 'uuid'

async function login(res: NextApiResponse, username: string, provider: string) {
  const user = await findUser({ username });
  if (user) {
    if (user.provider != provider) {
      console.error('Attempt to create account with existing username', user.provider, provider)
      return false;
    }
  }
  let token = uuidv4();
  if (!user) {
    // Create New User Account
    createUser({ username, provider });
  }
  // Updated session token
  await setLoginSession(res, {
    username, provider, token: token,
  });
  setUserToken(username, token);
  return true;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { provider } = req.query
    if (!provider) {
      return { statusCode: 404 }
    }
    const options = {
      failureRedirect: '/login',
      successRedirect: '/', // Should probably be the original desired page
    };
    passport.authenticate(provider, options, async function(err: any, user: any, info: any, status: any) {
      if (err) {
        res.redirect(options.failureRedirect);
      }
      if (user) {
        const session = await getLoginSession(req);
        let ret = await login(res, user.username, user.provider);
        if (ret) {
          res.redirect(options.successRedirect);
        }
        res.redirect(options.failureRedirect);
      }
      res.end();
    })(req, res);
  } catch (err) {
    console.error('ERROR in /api/auth/callback/provider', err.message);
    res.redirect('/login');
    throw err;
  }
  //res.end();
}
export default withPassport(handler)
