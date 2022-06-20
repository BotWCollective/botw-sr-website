import { AppProps } from 'next/app';
import './App.css';

function _App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default _App;