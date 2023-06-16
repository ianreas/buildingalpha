import Link from  'next/link'
import {useState, useContext} from 'react'
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

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

    return (
        <div class='nav-wrapper'>
            <nav class='navbar'>
            <ul class='nav no-search'>
                <li class='nav-item'><Link href='/'>Home</Link></li>
                <li class='nav-item'><Link href='/about'>About</Link></li>
                <li class='nav-item'><Link href='/ai'>AI</Link></li>
                <li class='nav-item'><Link href='/newthreed'>IV Surface</Link></li>
                <li class='nav-item'><Link href='/optionschaincalculator'>Options</Link></li>
                {username ?
                <li class='nav-item'><button onClick={signOutNow} style={{border: 'none', outline: 'none', background: 'none', padding: '0', margin: '0', cursor: 'pointer'}}>Sign out</button></li>
                : <li class='nav-item'><Link href='enter'>Sign In</Link></li>}  
            </ul>
            </nav>
            <div className={`search-bar ${expanded ? 'expanded' : ''}`}>
                <button className="search-button" onClick={handleButtonClick}>
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