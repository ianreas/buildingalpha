import Link from  'next/link'

export default function Footer(){
    return (
        <div className='footer'>
            <ul>
                <li className='footer-item'>
                    <Link href='/contactme'>Contact Me</Link>
                </li>
                <li className='footer-item'>
                    <Link href='/'>Home Page</Link>
                </li>
                <li className='footer-item'>
                    <Link href='/enter'>Sign In</Link>
                </li>
            </ul>
        </div>
    )
}