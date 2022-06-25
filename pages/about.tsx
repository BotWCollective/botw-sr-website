import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <div className='Header'>
      <h1>
        General settings
      </h1>
    </div>

    <div className='navigationLinks'>
      <ul>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
        <div><li><a href = '/about'>wikiHow</a></li></div>
      </ul>
    </div>




    {/* <div className='navigationBox'>
      <div className='navigationList'>
        <ol>
          <li><a id = >Camera Settings<a/></li>
          <li>Butter dog with the butter</li>
          <li> dhsadsaodsajhdksahdkja</li>
        </ol>
      </div>
    </div> */}


    <div className='paragraph1'>
      <p>Welcome to wikiHow! We're a worldwide collaboration of thousands of people focused on one goal: teaching anyone in the world how to do anything. We have about 239,239 articles detailing almost every how-to topic. If you have a how-to topic you want to learn about, using wikiHow can be as simple as searching for it, and diving in to learn how the task is done! Welcome to wikiHow! We're a worldwide collaboration of thousands of people focused on one goal: teaching anyone in the world how to do anything. We have about 239,239 articles detailing almost every how-to topic. If you have a how-to topic you want to learn about, using wikiHow can be as simple as searching for it, and diving in to learn how the task is done! Welcome to wikiHow! We're a worldwide collaboration of thousands of people focused on one goal: teaching anyone in the world how to do anything. We have about 239,239 articles detailing almost every how-to topic. If you have a how-to topic you want to learn about, using wikiHow can be as simple as searching for it, and diving in to learn how the task is done!</p>
    </div>

    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
