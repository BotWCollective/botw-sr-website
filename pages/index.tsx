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
        <a>guides</a>
      </Link>
    </p>
    <ButtonPrimary href="#">Login</ButtonPrimary>
    <Card heading="Any%" link="View Category">Defeat Calamity Ganon from a New Game as fast as possible.</Card>
  </Layout>
);

export default IndexPage;
