import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang="ar">
        <Head>
          <script defer data-domain="eldokkan.vercel.app" src="https://plausible.io/js/plausible.js"></script>

          <script async src="https://www.paypal.com/sdk/js?client-id=AUvh_NGo-9uP-yUTBSQp6W5bCC5T6dWaItObUUCjFEyjluExOb5VS_A0DByfE6qtDjVZQ1RXT6vqybqk">  </script>
        </Head>
        <body className="dark:bg-[#1E2028] text-gray-700 bg-gray-50 font-Almarai ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
//#282c35
//#16161a

//#373a3c
//#14171c
//1c1e22
//#1E2028
