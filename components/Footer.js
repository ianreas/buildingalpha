import Link from  'next/link';
import {useState, useContext} from 'react';
import { UserContext } from '../lib/context';

export default function Footer(){
    const {user, username} = useContext(UserContext);

    const signOutNow = () => {              //user?.photoURL || in src for photo
        signOut(auth);
        router.reload();
      }

    return (
        <div className='footer'>
            <ul>
                <li className='footer-item'>
                    <Link href='/contactme'>Contact Me</Link>
                </li>
                <li className='footer-item'>
                    <Link href='/'>Home Page</Link>
                </li>
               {username ?
               <li class='footer-item'><button onClick={signOutNow} style={{border: 'none', outline: 'none', background: 'none', padding: '0', margin: '0', cursor: 'pointer', fontSize: '15px'}}>Sign Out</button></li> 
               : <li className='footer-item'>
                    <Link href='/enter'>Sign In</Link>
                </li>}
            </ul>
        </div>
    )
}