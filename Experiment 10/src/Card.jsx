import './Card.css';
const Card = ({Productname,price,stockstatus}) => 
    {
    return ( 
    <div className="container">
        <div className="card">
            <h2>{Productname}</h2>
            <p>Price: {price}</p>
            <p>Status: {stockstatus}</p>
        </div>
    </div>
     );
}
export default Card;