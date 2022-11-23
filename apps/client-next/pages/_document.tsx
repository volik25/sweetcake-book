import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <meta property="og:title" content="ТОРТЫ И ДЕСЕРТЫ НА ЗАКАЗ" />
          <meta
            property="og:image"
            content="http://stand1.progoff.ru/static/TsemOyhfA4fx_oi5vVBEu.jpg"
          />

          <meta
            name="description"
            content="Вкуснейшие торты для ваших важных событий
Необычные десерты, как дополнение праздничного стола ❤️
Яркие эмоции и воспоминания"
          />
          <link rel="icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
