import Navbar from './Navbar';
import Footer from './Footer';
 
export default function Layout({ children }) {
  return (
    <div className='layout-wrapper'>
      <Navbar />
      <main>{children}</main>
      <Footer className='footer-in-layout'/>
    </div>
  );
}