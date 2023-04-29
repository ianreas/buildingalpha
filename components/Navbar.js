import Link from  'next/link'


export default function Navbar(){
    return (
        <div class='nav-wrapper'>
            <nav class='navbar'>
            <ul class='nav no-search'>
                <li class='nav-item'><Link href='/'>Home</Link></li>
                <li class='nav-item'><Link href='/about'>About</Link></li>
                <li class='nav-item'><Link href='/ai'>AI</Link></li>
                <li class='nav-item'><Link href='/threed'>3d Graphs</Link></li>
            </ul>
            </nav>
        </div>
    )
}