import Link from  'next/link'
import {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import {CiMenuBurger} from 'react-icons/ci'
import {RxCross2} from 'react-icons/rx'

export default function Navbar(){
    const {user, username} = useContext(UserContext)  //navbar component now can access the user and username using useContext

    const signOutNow = () => {              //user?.photoURL || in src for photo
        signOut(auth);
        router.reload();
      }


    const [expanded, setExpanded] = useState(false)

    const [ticker, setTicker] = useState()

    const handleOnChange = (event) => {
        setTicker(event.target.value.toUpperCase())
    }

    const router = useRouter();

    const handleButtonClick = () => {
        if (expanded===false){
            setExpanded(true)
        }
        else{
            router.push(`/ticker/${ticker}`)
        }
      };

      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isMobile, setIsMobile] = useState(false);

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        handleResize(); // Check initial window size
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      

    return (
        <div class='nav-wrapper'>
            {!isMobile ? 
            <nav class='navbar'>
            <ul class='nav no-search'>
                <li class='nav-item'><Link href='/'>Home</Link></li>
                <li class='nav-item'><Link href='/about'>About</Link></li>
                <li class='nav-item'><Link href='/ai'>AI</Link></li>
                <li class='nav-item'><Link href='/newthreed'>IV Surface</Link></li>
                <li class='nav-item'><Link href='/optionschaincalculator'>Options</Link></li>
                {username ?
                <li class='nav-item'><button onClick={signOutNow} style={{border: 'none', outline: 'none', background: 'none', padding: '0', margin: '0', cursor: 'pointer',color: "#e1e1e1"}}>Sign out</button></li>
                : <li class='nav-item'><Link href='enter'>Sign In</Link></li>}  
            </ul>
            </nav> : 
              
            <div className='burger-menu-wrap'>
              {isMenuOpen ? 
                null
                :
              <div className='burger-icon-wrap'  onClick={toggleMenu}>
                  <CiMenuBurger style={{width: '3rem'}} size={"2em"} color={'white'}/>
              </div>}
              {isMenuOpen ? 
              <div className='mobile-navbar-links-wrap' >
                
              <ul class='mobile-navbar-ul'>
                <li class='mobilenav'>
                  <div className='cross-icon-wrap' onClick={toggleMenu}>
                  <RxCross2 style={{width: '3rem'}} size={"2em"} color={'white'}/>
                </div>
                </li>
               <li onClick={toggleMenu} class='mobilenav-item'><Link href='/'>Home</Link></li>
               <li onClick={toggleMenu} class='mobilenav-item'><Link href='/about'>About</Link></li>
               <li onClick={toggleMenu} class='mobilenav-item'><Link href='/ai'>AI</Link></li>
               <li onClick={toggleMenu} class='mobilenav-item'><Link href='/newthreed'>IV Surface</Link></li>
               <li onClick={toggleMenu} class='mobilenav-item'><Link href='/optionschaincalculator'>Options</Link></li>
               {username ?
               <li class='mobilenav-item'><button onClick={signOutNow} style={{border: 'none', outline: 'none', background: 'none', padding: '0', margin: '0', cursor: 'pointer',color: "#e1e1e1"}}>Sign out</button></li>
               : <li class='mobilenav-item'><Link href='enter'>Sign In</Link></li>}
             </ul>
             </div>
               : 
               null}
            </div>}
            <div className={`search-bar ${expanded ? 'expanded' : ''}`}>
                <button className="search-button" onClick={handleButtonClick} style={{color: "#e1e1e1"}}>
                    Search Tickers
                </button>
                {expanded && (
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search Tickers"
                        autoFocus={true}
                        onChange={handleOnChange} 
                    />
                )}
            </div>
        </div>
    )
}