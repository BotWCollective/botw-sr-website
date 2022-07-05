import passport from 'passport'
import url from 'url'
import redirect from './redirect'
import { github } from './passport'
import { Profile } from 'passport-github'
export { default as passport } from 'passport'
import { setLoginSession } from './auth'


passport.use(github)

export interface PassportSession {
  passport: { user: UserIdentity }
}

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Github profile is serialized
// and deserialized.
passport.serializeUser((user: Profile, done) => {
  const { id, displayName, username, profileUrl, photos } = user
  done(null, { id, displayName, username, profileUrl, photos })
})
passport.deserializeUser(async (serializedUser, done) => {
  if (!serializedUser) {
    return done(new Error(`User not found: ${serializedUser}`))
  }

  done(null, serializedUser)
})

// export middleware to wrap api/auth handlers
export default fn => (req, res, args) => {
  if (!res.redirect) {
    // passport.js needs res.redirect:
    // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect
    res.redirect = (location: string) => redirect(res, 302, location)
  }

  // Initialize Passport and restore authentication state, if any, from the
  // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
  // does in express.

  passport.initialize()(req, res, () => {
    fn(req, res);
  })

}
