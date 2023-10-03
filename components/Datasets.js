import CongressTraders from "./CongressTraders";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import WSBMentions from './WSBMentions'
import InsiderTraders from "./InsiderTraders";

export default function Datasets(){
    

    return (<div className='datasets'> 
        <Carousel swipeable={true} emulateTouch={true}  style={{maxWidth: "100%"}} showIndicators={false}>
            <InsiderTraders className='datesets-insidertrader-component'/>
            <CongressTraders/>
            <WSBMentions/>
            
        </Carousel>
    </div>)
}