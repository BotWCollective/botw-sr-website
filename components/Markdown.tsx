
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import remarkVideo from './remarkVideo'
import remarkJargon from './remark-jargon'

import  jargon  from '../jargon'

type Props = {
    txt?: string,
};
console.log(jargon);
const Markdown = ({txt}: Props) => (
    <ReactMarkdown
      remarkPlugins={[ [remarkJargon, {jargon: jargon } ]]}
    rehypePlugins={[rehypeRaw, remarkGfm, remarkVideo ]}
      children={txt}
      className="markdown"
    />
)

export default Markdown;
