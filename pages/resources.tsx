import Layout from '../components/Layout'
import Banner from '../components/Banner';
import Button from '../components/ButtonPrimary';
import Card from '../components/Card'
import SideNav from '../components/SideNav';

const GuidesPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Banner>Resources</Banner>
    <SideNav list = 'dsa'></SideNav>
    <h1>Hehehaha</h1>
    <Button>eat my</Button>
    <Card heading='BLSS' link='View full guide'>Blss is a staple of Breath of the wild speedrunning allowing you to traverse large distances almost instantly</Card>
    <Card heading='BLSS' link='View full guide'>Blss is a staple of Breath of the wild speedrunning allowing you to traverse large distances almost instantly</Card>
  </Layout>
);
  
export default GuidesPage;
