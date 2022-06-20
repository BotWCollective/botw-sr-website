import { AppProps } from 'next/app';
import './App.scss';

function _App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default _App;