import Layout from '../components/Layout';

const Leaderboards = ({user}) => (
  <Layout title="Fort Hateno: Leaderboards" user={user}>
    <h1>Leaderboards</h1>
  </Layout>
);


import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default Leaderboards;
