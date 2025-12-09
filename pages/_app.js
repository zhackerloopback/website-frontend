import "../styles/globals.css";
import Layout from "../components/Layout";
import { PostsProvider } from "../lib/postsContext";
import { AuthProvider } from "../lib/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostsProvider>
    </AuthProvider>
  );
}
