import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks';
import { SkeletonTheme } from 'react-loading-skeleton'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <SkeletonTheme base='#313131' highlightColor='#525252'>
  <UserContext.Provider value={userData}>
   <Layout>
  <Component {...pageProps} className='component-in-my-app'/>
  </Layout>
  </UserContext.Provider>
  </SkeletonTheme>
    )
    
}

export default MyApp
