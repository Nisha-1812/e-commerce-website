import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import "./Product.css";
import { CartContext } from '../Carts/Cartcontext';
import { FavoritesContext } from '../Favorites/FavoritesContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Snackbar, Alert, TextField, IconButton, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

///CODE FOR DISPLAYING PRODUCTS IN UI///

const Readmore = ({ text, maxChars = 30 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > maxChars;

  return (
    <p>
      {isExpanded || !isLong ? text : `${text.substring(0, maxChars)}...`}
      {isLong && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: 'blue', cursor: 'pointer', marginLeft: 8 }}
        >
          {isExpanded ? "show less" : "Read more"}
        </span>
      )}
    </p>
  );
};

const StarRating = ({ rating, count }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? 'orange' : 'lightgray' }}>★</span>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {stars}
      {count !== undefined && (
        <span style={{ fontSize: '14px', color: '#666' }}>({count})</span>
      )}
    </div>
  );
};

const ProductTitle = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTitle = () => setIsExpanded(prev => !prev);

  return (
    <h2 onClick={toggleTitle} style={{ cursor: 'pointer', display: 'inline', color: '#333', fontSize: "21px" }}>
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        const roundedProducts = response.data.map(product => ({
          ...product,
          price: Math.round(product.price)
        }));
        setProducts(roundedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

 

  // code for creating, storing and getting products from the local storage
  const [localProducts, setLocalProducts] = useState(() => {
    const stored = localStorage.getItem("localProducts");
    return stored ? JSON.parse(stored) : [];
  });

const [newProduct, setNewProduct] = useState({
  title: "",
  description: "",
  category: "",
  price: "",
  availableSizes: [],
  availableUnits: [],
  availablemodals:[],
  availableColors: {},
  gender: "",
  image: null,
  imageUpload: null, 
});


 
  useEffect(() => {
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
  }, [localProducts]);

 
 const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
 
const handleSaveProduct = () => {
  const { title, description, category, price, availableColors, imageUpload } = newProduct;

  if (!title || !description || !category || !price) {
    alert("Please fill in all required fields.");
    return;
  }

 const colorImages = {};
let defaultColorImage = null;

if (category === "clothes" || category === "footwear"|| category==="electronics") {
  const selectedColors = Object.entries(availableColors)
    .filter(([_, file]) => file instanceof File);

  if (selectedColors.length === 0) {
    alert("Please upload at least one image for the selected color(s).");
    return;
  }

  selectedColors.forEach(([color, file]) => {
    const url = URL.createObjectURL(file);
    colorImages[color] = url;
    if (!defaultColorImage) defaultColorImage = url;
  });
}


  const productToAdd = {
    ...newProduct,
    id: `local-${Date.now()}`,
    price: Math.round(Number(price)),
    image:
      category === "clothes" || category === "footwear"||category==="electronics"
        ? defaultColorImage
        : imageUpload instanceof File
          ? URL.createObjectURL(imageUpload)
          : null,
    availableColors:
      category === "clothes" || category === "footwear"||category==="electronics"
        ? colorImages
        : {},
    rating: { rate: 4, count: 20 },
  };

  setLocalProducts(prev => [...prev, productToAdd]);

  setNewProduct({
    title: "",
    description: "",
    category: "",
    price: "",
    availableSizes: [],
    availableUnits: [],
    availablemodals:[],
    availableColors: {},
    gender: "",
    image: null,
    imageUpload: null,
  });

  setShowForm(false);
};







const toggleSelection = (name, value) => {
  setNewProduct((prev) => {
    if (name === "availableColors") {
      const colors = { ...prev.availableColors };
      if (colors[value]) {
        delete colors[value];
      } else {
        colors[value] = null;
      }
      return { ...prev, availableColors: colors };
    } else {
      const list = prev[name];
      const updatedList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [name]: updatedList };
    }
  });
};



const selectGender = (gender) => {
  setNewProduct(prev => ({ ...prev, gender }));
};


const clearLocalProducts = () => {
  localStorage.removeItem("localProducts");
  window.location.reload(); 
};

  const allProducts = [...products,...products, ...localProducts];
 
  const handleSearch = () => {
    const filteredData = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
    setFilteredProducts(filteredData);
  };

   const displayProducts = searchTerm
    ? filteredProducts
    : allProducts.filter(product =>
      selectedCategory === "all" || product.category === selectedCategory
    );

if (loading) return <p>Loading products...</p>;

  return (
    <>
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => setShowForm(true)}
          style={{ padding: "10px 20px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 5 }}
        >
          Add New Product
        </button>
      </div>

{showForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <span className="modal-close" onClick={() => setShowForm(false)}>&times;</span>
      <h2>Add New Product</h2>

      <input
        type="text"
        name="title"
        placeholder="Product Name"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInputChange}
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
      />

      <select
        name="category"
        value={newProduct.category}
        onChange={handleInputChange}
      >
        <option value="">Select Category</option>
        <option value="clothes">Clothes</option>
        <option value="footwear">Footwear</option>
        <option value="groceries">Groceries</option>
        <option value="electronics">Electronics</option>
        <option value="others">Others</option>
      </select>

    
      {newProduct.category === "clothes" && (
        <div className="toggle-group">
          <label><strong>Available Sizes:</strong></label>
          {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
            <button
              key={size}
              type="button"
              className={newProduct.availableSizes.includes(size) ? "selected" : ""}
              onClick={() => toggleSelection("availableSizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      )}

       
      {newProduct.category === "electronics" && (
        <div className="toggle-group">
          <label><strong>Available Models:</strong></label>
          {["GP100", "GP110", "GP115"].map(modal => (
            <button
              key={modal}
              type="button"
              className={newProduct.availablemodals.includes(modal) ? "selected" : ""}
              onClick={() => toggleSelection("availablemodals", modal)}
            >
              {modal}
            </button>
          ))}
        </div>
      )}



	  
   
      {newProduct.category === "footwear" && (
        <div className="toggle-group">
          <label><strong>Footwear Sizes:</strong></label>
          {["6", "7", "8", "9", "10", "11"].map(size => (
            <button
              key={size}
              type="button"
              className={newProduct.availableSizes.includes(size) ? "selected" : ""}
              onClick={() => toggleSelection("availableSizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {newProduct.category === "groceries" && (
        <div className="toggle-group" style={{
          display:"flex",
          justifyContent:"space-around"
        }}>
          <label><strong>Available Units:</strong></label>

          <div>
            <p><strong>Weight:</strong></p>
            {["500g", "1kg", "2kg"].map(unit => (
              <button
                key={unit}
                type="button"
                className={newProduct.availableUnits.includes(unit) ? "selected" : ""}
                onClick={() => toggleSelection("availableUnits", unit)}
              >
                {unit}
              </button>
            ))}
          </div>

          <div>
            <p><strong>Milliliters:</strong></p>
            {["250ml", "500ml"].map(unit => (
              <button
                key={unit}
                type="button"
                className={newProduct.availableUnits.includes(unit) ? "selected" : ""}
                onClick={() => toggleSelection("availableUnits", unit)}
              >
                {unit}
              </button>
            ))}
          </div>

          <div>
            <p><strong>Liters:</strong></p>
            {["1L", "2L"].map(unit => (
              <button
                key={unit}
                type="button"
                className={newProduct.availableUnits.includes(unit) ? "selected" : ""}
                onClick={() => toggleSelection("availableUnits", unit)}
              >
                {unit}
              </button>
            ))}
          </div>
         

        
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter custom unit"
              value={newProduct.customUnit || ""}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  customUnit: e.target.value,
                }))
              }
              style={{ padding: "5px", marginRight: "5px" }}
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = (newProduct.customUnit || "").trim();
                if (trimmed && !newProduct.availableUnits.includes(trimmed)) {
                  setNewProduct((prev) => ({
                    ...prev,
                    availableUnits: [...prev.availableUnits, trimmed],
                    customUnit: "",
                  }));
                }
              }}
              style={{ padding: "6px 10px" }}
            >
              Add
            </button>
          </div>
        </div>
      )}

     

      
      {(newProduct.category === "clothes" || newProduct.category === "footwear"||newProduct.category==="electronics") && (
        <div className="toggle-group">
          <label><strong>Available Colors:</strong></label>
          {["black", "white", "pink", "orange", "green", "Violet", "darkblue", "skyblue", "beige", "red","yellow"].map(color => (
            <div key={color} style={{ marginBottom: 10 }}>
              <button
                type="button"
                className={newProduct.availableColors[color] !== undefined ? "selected" : ""}
                onClick={() => toggleSelection("availableColors", color)}
              >
                {color}
              </button>

              {newProduct.availableColors[color] !== undefined && (
                <div style={{ marginTop: 5 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setNewProduct((prev) => ({
                          ...prev,
                          availableColors: {
                            ...prev.availableColors,
                            [color]: file
                          }
                        }));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      
      {(newProduct.category === "clothes" || newProduct.category === "footwear") && (
        <div className="toggle-group">
          <label><strong>Gender:</strong></label>
          {["Men", "Woman", "Unisex"].map(gender => (
            <button
              type="button"
              key={gender}
              className={newProduct.gender === gender ? "selected" : ""}
              onClick={() => selectGender(gender)}
            >
              {gender}
            </button>
          ))}
        </div>
      )}

     
{newProduct.category && !["clothes", "footwear", "electronics"].includes(newProduct.category) && (
  <div style={{ marginTop: "10px" }}>
    <label><strong>Upload Product Image:</strong></label><br />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setNewProduct((prev) => ({
            ...prev,
            imageUpload: file,
          }));
        }
      }}
    />
  </div>
)}


   
      <div className="modal-actions">
        <button onClick={() => setShowForm(false)} style={{ background: '#ccc', padding: '8px 16px' }}>Cancel</button>
        <button onClick={handleSaveProduct} style={{ background: '#1976d2', color: '#fff', padding: '8px 16px' }}>Save</button>
      </div>
    </div>
  </div>
)}



      <div className='searchbutton'>
        <FormControl fullWidth size="small" sx={{ width: 220 }}>
          <InputLabel id="category-label"><strong>Filter by Category</strong></InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            label="Filter by Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            <MenuItem value="clothes">Clothes</MenuItem>
            <MenuItem value="groceries">Groceries</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>

        <div style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            sx={{ width: '50%' }}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className='product-grid'>
        {displayProducts.map((product) => {
          const isInCart = cartItems.some(item => item.id === product.id);
          const isInFavorites = favoriteItems.some(item => item.id === product.id);

          return (
            <div key={product.id} className='product-card'>
            <Link to={`/product/${product.id}`}>

                <img className="product-image" src={product.image} alt='product' />
              </Link>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <ProductTitle title={product.title} />
              </Link>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <h2 className='product-category'>{product.category}</h2>
 

              <Readmore text={product.description} maxChars={30} />
              <div className='rating'>
                <StarRating
                  rating={product.rating ? Math.round(product.rating.rate) : 0}
                  count={product.rating?.count || 0}
                />
              </div>
              <div className='favorites'>
                <button
                  className='cart-button'
                  onClick={() => {
                    addToCart(product);
                    setOpenSnackbar(true);
                  }}
                >
                  {isInCart ? 'Add to cart' : 'Add to Cart'}
                </button>
                <p
                  className='product-icon'
                  onClick={() =>
                    isInFavorites
                      ? removeFromFavorites(product.id)
                      : addToFavorites(product)
                  }
                  style={{ cursor: "pointer", fontSize: "20px", color: isInFavorites ? "red" : "gray" }}
                >
                  {isInFavorites ? <FaHeart /> : <FaRegHeart />}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ top: '80px !important' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Added to cart successfully!
        </Alert>
      </Snackbar>

      <div style={{ padding: "20px", display: "flex", gap: "10px" }}>


  <button
    onClick={clearLocalProducts}
    style={{ padding: "10px 20px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: 5 }}
  >
    Clear Local Products
  </button>
</div>
    </>
  );
};

export default Product;
