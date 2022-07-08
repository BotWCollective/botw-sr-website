import { useUser } from '../lib/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import Card from '../components/Card';

const IndexPage = ({user}) => {
    return (
    <Layout title="Fort Hateno: Hylian Collective" user={user}>
    <h1>Fort Hateno: Hylian Collective</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/guides">
        <a>Guides</a>
      </Link>
    </p>
    <ButtonPrimary href="/login">Login</ButtonPrimary>
    <Card heading="Any%" link="View Category" href="/leaderboards" backgroundImage='/images/BotW_Link.webp' headingIcon='/images/Bow_of_Light.png'>Defeat Calamity Ganon from a New Game as fast as possible.</Card>
    </Layout>
    );
};

import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default IndexPage;
