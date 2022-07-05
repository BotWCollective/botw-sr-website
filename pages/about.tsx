import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = ({user}) => (
  <Layout title="Fort Hateno: About" user={user}>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default AboutPage
