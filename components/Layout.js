import Navbar from './Navbar';
import Footer from './Footer';
 
export default function Layout({ children }) {
  return (
    <div className='layout-wrapper'>
      <Navbar />
      {children}
      <Footer className='footer-in-layout'/>
    </div>
  );
}