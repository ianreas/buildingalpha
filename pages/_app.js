import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
  <UserContext.Provider value={userData}>
   <Layout>
  <Component {...pageProps} className='component-in-my-app'/>
  </Layout>
  </UserContext.Provider>
    )
    
}

export default MyApp
