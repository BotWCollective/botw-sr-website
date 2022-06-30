import { useUser } from '../lib/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';

const IndexPage = () => {
    const user = useUser({});
    return (
        <Layout title="Home | Next.js + TypeScript Example" user={user}>
          <h1>Hello Next.js 👋</h1>
          <p>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/guides">
              <a>Guides</a>
            </Link>
          </p>
          <ButtonPrimary href="/login">Login</ButtonPrimary>
          <Card heading="Any%" link="View Category">Defeat Calamity Ganon from a New Game as fast as possible.</Card>
        </Layout>
    )
}

export default IndexPage;
