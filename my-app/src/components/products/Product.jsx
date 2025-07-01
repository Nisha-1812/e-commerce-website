import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Product.css";

const Readmore=({text,maxChars=55})=>{
  const [isExpanded,setIsExpanded]=useState(false);
  const isLong=text.length>maxChars;

  return(
    <p>
      {isExpanded||!isLong?text:`${text.substring(0,maxChars)}....`}
      {isLong &&(
        <span
          onClick={()=>setIsExpanded(!isExpanded)}
          style={{ color: 'blue', cursor: 'pointer', marginLeft: 8 }}
          >
            {isExpanded ? "show less":"Read more"}
        </span>
      )}
    </p>
  )
}

const ProductTitle = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <h2 onClick={toggleTitle} style={{ cursor: 'pointer', display: 'inline', color: '#333' }}>
      {isExpanded
        ? title + ' (show less)'
        : title.length > 15
          ? title.slice(0, 15) + '...'
          : title}
    </h2>
  );
};



const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className='product-grid'>
      {products.map(product => (
        <div key={product.id} className='product-card'>
          <img  className="product-image" src={product.image} alt='image'></img>
         <ProductTitle title={product.title} />
          <p><strong>Price:</strong>₹{product.price}</p>
           <h2 className='product-category'>{product.category}</h2>
         <Readmore text={product.description} maxChars={55}/>
         <div className='rating'>
         <h6>{product.rating.rate}</h6>
         <h5>{product.rating.count}</h5>
        </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
