import { AppProps } from 'next/app';
import './reset.scss';
import './global.scss';

function _App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default _App;