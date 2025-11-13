import './Productcard.css';
import Card from './card.jsx'
const Productcard = () => {
    return ( 
        <div classname = "box">
            <h2> Product List </h2>
        <div className="Hex-row">
            <Card Productname="Wireless Mouse" price="$25.99" stockstatus="In Stock"/>
            <Card Productname="Keyboard" price="$45.5" stockstatus="Out of Stock"/>
            <Card Productname="Monitor" price="$199.99" stockstatus="In Stock"/>
        </div>
        </div>
     );
}
export default Productcard;