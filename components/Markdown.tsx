
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import rehypeVideo from './rehypeVideo'
import remarkJargon from './remark-jargon'

import  jargon  from '../jargon'

type Props = {
    txt?: string,
};

const Markdown = ({txt}: Props) => (
    <ReactMarkdown
      remarkPlugins={[ [remarkJargon, {jargon: jargon } ]]}
      rehypePlugins={[rehypeRaw, remarkGfm, rehypeVideo ]}
      children={txt}
      className="markdown"
    />
)

export default Markdown;
