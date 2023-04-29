import CongressTraders from "./CongressTraders";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import WSBMentions from './WSBMentions'

export default function Datasets(){
    

    return (<div>
        <Carousel>
            <CongressTraders/>
            <WSBMentions/>
        </Carousel>
    </div>)
}