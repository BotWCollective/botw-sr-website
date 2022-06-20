import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ad tempora impedit, sed blanditiis, commodi dolorum soluta quas sint, doloribus vel ut velit dolorem vitae facere magni sit esse officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil obcaecati voluptas cum velit iusto odio expedita consectetur autem, nesciunt eum numquam optio, minima similique dolorem repellat, earum fugit. Quis, commodi.</p>
  </Layout>
);

export default IndexPage;
