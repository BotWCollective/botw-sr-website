import passport from 'passport'
import { localStrategy } from '../../lib/password-local'
import { setLoginSession } from '../../lib/auth'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    passport.initialize();
    if (req.method == 'POST') {
      const user = await authenticate('local', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user };
      await setLoginSession(res, session);
      res.status(200).send({ done: true });
    } else {
      res.status(200).send({});
    }
  } catch (err: any) {
    if (err.message.includes("Invalid username and password combination")) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
}
