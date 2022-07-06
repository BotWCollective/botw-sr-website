import Layout from '../components/Layout';
import Run from "../components/Run"

const Leaderboards = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Leaderboards</h1>
    <Run 
      position={1}
      runnerName='Komali' 
      runTime='14:28' 
      runDate='01/01/70' 
      verificationDate='01/01/70' 
      verifierName='Komali' 
      variables={[
        <li>Switch (NTSC)</li>,
        <li>Amiibo, Normal Mode, DLC</li>
      ]}
    ></Run>
  </Layout>
);

export default Leaderboards;
