import React from 'react';
import App, {Container} from 'next/app';
import '../src/style/main.scss';
import 'bootstrap-scss';

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
          <Container>
            <Component {...pageProps} />
          </Container>
        );
    }
}
