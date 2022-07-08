import Layout from '../components/Layout';

const ResourcesPage = ({user}) => (
  <Layout title="Fort Hateno: Resources" user={user}>
    <h1>Resources</h1>
  </Layout>
);

import  getServerSideProps  from "../lib/serverProps";
export { getServerSideProps };

export default ResourcesPage;
