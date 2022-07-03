import Link from 'next/link';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/guides">
        <a>Guides</a>
      </Link>
    </p>
    <ButtonPrimary href="/leaderboards">Login</ButtonPrimary>
    <Card heading="Any%" link="View Category" href="/leaderboards" backgroundImage='/images/BotW_Link.webp' headingIcon='/images/Bow_of_Light.png'>Defeat Calamity Ganon from a New Game as fast as possible.</Card>
  </Layout>
);

export default IndexPage;
