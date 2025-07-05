import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Product.css";
import { CartContext } from "../Carts/Cartcontext";
import { FavoritesContext } from "../Favorites/FavoritesContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Snackbar, Alert, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
          style={{ color: "blue", cursor: "pointer", marginLeft: 8 }}
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
      <span key={i} style={{ color: i <= rating ? "orange" : "lightgray" }}>
        ★
      </span>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {stars}
      {count !== undefined && (
        <span style={{ fontSize: "14px", color: "#666" }}>({count})</span>
      )}
    </div>
  );
};

const ProductTitle = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTitle = () => setIsExpanded((prev) => !prev);

  return (
    <h2
      onClick={toggleTitle}
      style={{
        cursor: "pointer",
        display: "inline",
        color: "#333",
        fontSize: "21px",
      }}
    >
      {isExpanded
        ? title + " (show less)"
        : title.length > 15
        ? title.slice(0, 15) + "..."
        : title}
    </h2>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const roundedProducts = response.data.map((product) => ({
          ...product,
          price: Math.round(product.price),
        }));
        setProducts(roundedProducts);
        setLoading(false);
      })
      .catch((error) => {
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
    unitDatas:[],
    availableUnits: [],
    unitData: {},
    availablemodals: [],
    availableColors: {},
    gender: "",
    image: null,
    imageUpload: null,
    customColor: "",
    currency: "",
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
  const {
    title,
    description,
    category,
    price,
    availableColors,
    imageUpload,
    availableUnits,
    unitData,
    modalData,
    sizeData,
    availableSizes,
    availablemodals,
  } = newProduct;

  // ✅ Only require price for 'others'
  if (!title || !description || !category || (category === "others" && !price)) {
    alert("Please fill in all required fields.");
    return;
  }

  // ✅ Additional category-specific validation
  if ((category === "clothes" || category === "footwear") && availableSizes.length === 0) {
    alert("Please select at least one size.");
    return;
  }

  if (
    ["clothes", "footwear", "electronics"].includes(category) &&
    Object.entries(availableColors).filter(([_, file]) => file instanceof File).length === 0
  ) {
    alert("Please upload at least one image for selected color(s).");
    return;
  }

  const colorImages = {};
  let defaultColorImage = null;

  if (["clothes", "footwear", "electronics"].includes(category)) {
    const selectedColors = Object.entries(availableColors).filter(
      ([_, file]) => file instanceof File
    );

    selectedColors.forEach(([color, file]) => {
      const url = URL.createObjectURL(file);
      colorImages[color] = url;
      if (!defaultColorImage) defaultColorImage = url;
    });
  }

  // ✅ Groceries
  let groceryImages = {};
  let defaultGroceryImage = null;
  let unitPrices = {};
  let unitCurrencies = {};

  if (category === "groceries") {
    if (availableUnits.length === 0) {
      alert("Please select at least one unit.");
      return;
    }

    for (const unit of availableUnits) {
      const data = unitData[unit];
      if (!data?.price || !data?.currency || !data?.image) {
        alert(`Please provide price, currency, and image for unit: ${unit}`);
        return;
      }
    }

    Object.entries(unitData).forEach(([unit, data]) => {
      const url = URL.createObjectURL(data.image);
      groceryImages[unit] = url;
      unitPrices[unit] = Math.round(Number(data.price));
      unitCurrencies[unit] = data.currency;
      if (!defaultGroceryImage) defaultGroceryImage = url;
    });
  }

  // ✅ Sizes
  let sizePrices = {};
  let sizeCurrencies = {};

  if (category === "clothes" || category === "footwear") {
    for (const size of availableSizes) {
      const data = sizeData[size];
      if (!data?.price || !data?.currency) {
        alert(`Please provide price and currency for size: ${size}`);
        return;
      }
      sizePrices[size] = Math.round(Number(data.price));
      sizeCurrencies[size] = data.currency;
    }
  }

  // ✅ Electronics Models
  let modalPrices = {};
  let modalCurrencies = {};

  if (category === "electronics") {
    for (const model of availablemodals) {
      const data = modalData[model];
      if (!data?.price || !data?.currency) {
        alert(`Please provide price and currency for model: ${model}`);
        return;
      }
      modalPrices[model] = Math.round(Number(data.price));
      modalCurrencies[model] = data.currency;
    }
  }

  const productToAdd = {
    ...newProduct,
    id: `local-${Date.now()}`,
    price:
      category === "groceries"
        ? unitPrices[availableUnits[0]]
        : category === "clothes"
        ? sizePrices[availableSizes[0]]
        : category === "footwear"
        ? sizePrices[availableSizes[0]]
        : category === "electronics"
        ? modalPrices[availablemodals[0]]
        : Math.round(Number(price)),
    currency:
      category === "groceries"
        ? unitCurrencies[availableUnits[0]]
        : category === "clothes"
        ? sizeCurrencies[availableSizes[0]]
        : category === "footwear"
        ? sizeCurrencies[availableSizes[0]]
        : category === "electronics"
        ? modalCurrencies[availablemodals[0]]
        : newProduct.currency || "₹",
    image:
      category === "groceries"
        ? defaultGroceryImage
        : ["clothes", "footwear", "electronics"].includes(category)
        ? defaultColorImage
        : imageUpload instanceof File
        ? URL.createObjectURL(imageUpload)
        : null,
    availableColors: ["clothes", "footwear", "electronics"].includes(category)
      ? colorImages
      : {},
    unitPrices,
    unitCurrencies,
    unitImages: groceryImages,
    sizePrices,
    sizeCurrencies,
    modalPrices,
    modalCurrencies,
    rating: { rate: 4, count: 20 },
  };

  setLocalProducts((prev) => [...prev, productToAdd]);

  // ✅ Reset form
  setNewProduct({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "",
    availableSizes: [],
    availableUnits: [],
    availablemodals: [],
    availableColors: {},
    gender: "",
    image: null,
    imageUpload: null,
    customColor: "",
    customUnitValue: "",
    customUnitType: "",
    unitData: {},
    sizeData: {},
    modalData: {},
  });

  setShowForm(false);
};



  const toggleSelection = (name, value) => {
    setNewProduct((prev) => {
      if (name === "availableUnits") {
        const updatedList = prev.availableUnits.includes(value)
          ? prev.availableUnits.filter((item) => item !== value)
          : [...prev.availableUnits, value];

        const updatedUnitData = { ...prev.unitData };
        if (prev.availableUnits.includes(value)) {
          delete updatedUnitData[value];
        } else {
          updatedUnitData[value] = { price: "", image: null };
        }

        return {
          ...prev,
          availableUnits: updatedList,
          unitData: updatedUnitData,
        };
      }
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
          ? list.filter((item) => item !== value)
          : [...list, value];
        return { ...prev, [name]: updatedList };
      }
    });
  };

  const selectGender = (gender) => {
    setNewProduct((prev) => ({ ...prev, gender }));
  };

  const clearLocalProducts = () => {
    localStorage.removeItem("localProducts");
    window.location.reload();
  };

  const allProducts = [...products, ...products, ...localProducts];

  const handleSearch = () => {
    const filteredData = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory)
    );
    setFilteredProducts(filteredData);
  };

  const displayProducts = searchTerm
    ? filteredProducts
    : allProducts.filter(
        (product) =>
          selectedCategory === "all" || product.category === selectedCategory
      );

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowForm(false)}>
              &times;
            </span>
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
                <label>
                  <strong>Available Sizes:</strong>
                </label>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      newProduct.availableSizes.includes(size) ? "selected" : ""
                    }
                    onClick={() => toggleSelection("availableSizes", size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}

            {newProduct.category === "electronics" && (
              <div className="toggle-group">
                <label>
                  <strong>Available Models:</strong>
                </label>
                {["GP100", "GP110", "GP115"].map((modal) => (
                  <button
                    key={modal}
                    type="button"
                    className={
                      newProduct.availablemodals.includes(modal)
                        ? "selected"
                        : ""
                    }
                    onClick={() => toggleSelection("availablemodals", modal)}
                  >
                    {modal}
                  </button>
                ))}
              </div>
            )}

            {newProduct.category === "footwear" && (
              <div className="toggle-group">
                <label>
                  <strong>Footwear Sizes:</strong>
                </label>
                {["6", "7", "8", "9", "10", "11"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      newProduct.availableSizes.includes(size) ? "selected" : ""
                    }
                    onClick={() => toggleSelection("availableSizes", size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}

            {newProduct.category === "groceries" && (
              <div
                className="toggle-group"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                <label>
                  <strong>Available Units:</strong>
                </label>

                <div>
                  <p>
                    <strong>Weight:</strong>
                  </p>
                  {["500g", "1kg", "2kg"].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      className={
                        newProduct.availableUnits.includes(unit)
                          ? "selected"
                          : ""
                      }
                      onClick={() => toggleSelection("availableUnits", unit)}
                    >
                      {unit}
                    </button>
                  ))}
                </div>

                <div>
                  <p>
                    <strong>Milliliters:</strong>
                  </p>
                  {["250ml", "500ml"].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      className={
                        newProduct.availableUnits.includes(unit)
                          ? "selected"
                          : ""
                      }
                      onClick={() => toggleSelection("availableUnits", unit)}
                    >
                      {unit}
                    </button>
                  ))}
                </div>

                <div>
                  <p>
                    <strong>Liters:</strong>
                  </p>
                  {["1L", "2L"].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      className={
                        newProduct.availableUnits.includes(unit)
                          ? "selected"
                          : ""
                      }
                      onClick={() => toggleSelection("availableUnits", unit)}
                    >
                      {unit}
                    </button>
                  ))}
                </div>

                {/* Manual entry */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="number"
                      placeholder="Enter value"
                      value={newProduct.customUnitValue || ""}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          customUnitValue: e.target.value,
                        }))
                      }
                      style={{ padding: "5px", width: "80px" }}
                    />

                    <select
                      value={newProduct.customUnitType || ""}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          customUnitType: e.target.value,
                        }))
                      }
                      style={{ padding: "5px" }}
                    >
                      <option value="">Select unit</option>
                      <option value="g">grams</option>
                      <option value="kg">kilograms</option>
                      <option value="ml">milliliters</option>
                      <option value="L">liters</option>
                      <option value="oz">ounces (oz)</option>
                      <option value="lb">pounds (lb)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const val = (newProduct.customUnitValue || "").trim();
                        const type = newProduct.customUnitType;
                        const combined = `${val}${type}`;

                        if (
                          val &&
                          type &&
                          !newProduct.availableUnits.includes(combined)
                        ) {
                          setNewProduct((prev) => ({
                            ...prev,
                            availableUnits: [...prev.availableUnits, combined],
                            customUnitValue: "",
                            customUnitType: "",
                          }));
                        }
                      }}
                      style={{ padding: "6px 10px" }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

          {newProduct.category === "groceries" &&
  newProduct.availableUnits.length > 0 && (
    <div style={{ marginTop: "20px" }}>
      <h4>Set Price, Currency, and Image per Unit</h4>
      {newProduct.availableUnits.map((unit) => (
        <div
          key={unit}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "12px",
          }}
        >
          <p><strong>{unit}</strong></p>

          {/* Price */}
          <input
            type="number"
            placeholder={`Price for ${unit}`}
            value={newProduct.unitData[unit]?.price || ""}
            onChange={(e) => {
              const price = e.target.value;
              setNewProduct((prev) => ({
                ...prev,
                unitData: {
                  ...prev.unitData,
                  [unit]: {
                    ...prev.unitData[unit],
                    price,
                  },
                },
              }));
            }}
            style={{ padding: "5px", marginRight: "10px", width: "120px" }}
          />

          {/* Currency */}
          <select
            value={newProduct.unitData[unit]?.currency || ""}
            onChange={(e) => {
              const currency = e.target.value;
              setNewProduct((prev) => ({
                ...prev,
                unitData: {
                  ...prev.unitData,
                  [unit]: {
                    ...prev.unitData[unit],
                    currency,
                  },
                },
              }));
            }}
            style={{ padding: "5px", marginRight: "10px", width: "70px" }}
          >
            <option value="">₹/$/€</option>
            <option value="₹">₹</option>
            <option value="$">$</option>
            <option value="€">€</option>
          </select>

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNewProduct((prev) => ({
                  ...prev,
                  unitData: {
                    ...prev.unitData,
                    [unit]: {
                      ...prev.unitData[unit],
                      image: file,
                    },
                  },
                }));
              }
            }}
          />
        </div>
      ))}
    </div>
  )}

 {(newProduct.category === "clothes" || newProduct.category === "footwear") &&
  newProduct.availableSizes.length > 0 && (
    <div style={{ marginTop: "20px" }}>
      <h4>Set Price and Currency per Size</h4>
      {newProduct.availableSizes.map((size) => (
        <div
          key={size}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "12px",
          }}
        >
          <p><strong>{size}</strong></p>

          <input
            type="number"
            placeholder={`Price for ${size}`}
            value={newProduct.sizeData?.[size]?.price || ""}
            onChange={(e) => {
              const price = e.target.value;
              setNewProduct((prev) => ({
                ...prev,
                sizeData: {
                  ...prev.sizeData,
                  [size]: {
                    ...prev.sizeData?.[size],
                    price,
                  },
                },
              }));
            }}
            style={{ padding: "5px", marginRight: "10px", width: "120px" }}
          />

          <select
            value={newProduct.sizeData?.[size]?.currency || ""}
            onChange={(e) => {
              const currency = e.target.value;
              setNewProduct((prev) => ({
                ...prev,
                sizeData: {
                  ...prev.sizeData,
                  [size]: {
                    ...prev.sizeData?.[size],
                    currency,
                  },
                },
              }));
            }}
            style={{ padding: "5px", width: "70px" }}
          >
            <option value="">₹/$/€</option>
            <option value="₹">₹</option>
            <option value="$">$</option>
            <option value="€">€</option>
          </select>
        </div>
      ))}
    </div>
  )}




            {newProduct.category === "electronics" && (
              <div className="toggle-group">
                <label>
                  <strong>Available Colors:</strong>
                </label>
                {[
                  "black",
                  "white",
                  "pink",
                  "orange",
                  "green",
                  "Violet",
                  "darkblue",
                  "skyblue",
                  "beige",
                  "red",
                  "yellow",
                ].map((color) => (
                  <div key={color} style={{ marginBottom: 10 }}>
                    <button
                      type="button"
                      className={
                        newProduct.availableColors[color] !== undefined
                          ? "selected"
                          : ""
                      }
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
                                  [color]: file,
                                },
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

            {(newProduct.category === "clothes" ||
              newProduct.category === "footwear") && (
            <div className="toggle-group">
  <label>
    <strong>Available Colors:</strong>
  </label>

 
  {[
    "black",
    "white",
    "pink",
    "orange",
    "green",
    "Violet",
    "darkblue",
    "skyblue",
    "red",
    "yellow",
  ].map((color) => (
    <div key={color} style={{ marginBottom: 10 }}>
      <button
        type="button"
        className={
          newProduct.availableColors[color] !== undefined ? "selected" : ""
        }
        onClick={() => {
          const isSelected = newProduct.availableColors[color] !== undefined;
          setNewProduct((prev) => {
            const updated = { ...prev.availableColors };
            if (isSelected) {
              delete updated[color];
            } else {
              updated[color] = null;
            }
            return {
              ...prev,
              availableColors: updated,
            };
          });
        }}
      >
        {color}
      </button>

      {newProduct.availableColors[color] === null && (
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
                  [color]: file,
                },
              }));
            }
          }}
        />
      )}
    </div>
  ))}

  {/* Add custom color */}
  <div style={{ marginTop: "15px" }}>
    <input
      type="text"
      placeholder="Enter custom color"
      value={newProduct.customColor}
      onChange={(e) =>
        setNewProduct((prev) => ({
          ...prev,
          customColor: e.target.value,
        }))
      }
      style={{ padding: "5px", marginRight: "5px" }}
    />
    <button
      type="button"
      onClick={() => {
        const color = newProduct.customColor.trim().toLowerCase();
        if (color && !(color in newProduct.availableColors)) {
          setNewProduct((prev) => ({
            ...prev,
            availableColors: {
              ...prev.availableColors,
              [color]: null,
            },
            customColor: "",
          }));
        }
      }}
      style={{ padding: "6px 10px" }}
    >
      Add
    </button>
  </div>

  {/* Upload for custom colors (that are null) */}
  {Object.entries(newProduct.availableColors).map(
    ([color, file]) =>
      file === null && (
        <div key={color} style={{ marginTop: "10px" }}>
          <label>
            Upload image for <strong>{color}</strong>:
          </label>
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
                    [color]: file,
                  },
                }));
              }
            }}
          />
        </div>
      )
  )}
</div>

            )} 

            {(newProduct.category === "clothes" ||
              newProduct.category === "footwear") && (
              <div className="toggle-group">
                <label>
                  <strong>Gender:</strong>
                </label>
                {["Men", "Woman", "Unisex"].map((gender) => (
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

          

            <div className="modal-actions">
              <button
                onClick={() => setShowForm(false)}
                style={{ background: "#ccc", padding: "8px 16px" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  padding: "8px 16px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="searchbutton">
        <FormControl fullWidth size="small" sx={{ width: 220 }}>
          <InputLabel id="category-label">
            <strong>Filter by Category</strong>
          </InputLabel>
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

        <div style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            sx={{ width: "50%" }}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className="product-grid">
        {displayProducts.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);
          const isInFavorites = favoriteItems.some(
            (item) => item.id === product.id
          );

          return (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
              </Link>
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductTitle title={product.title} />
              </Link>
             <div className="product-prices">
  <p>{product.currency || "₹"}</p>
  <p>
    {product.unitPrices && Object.keys(product.unitPrices).length > 0
      ? `${Object.values(product.unitPrices)[0]} (${Object.keys(product.unitPrices)[0]})`
      : product.price || "N/A"}
  </p>
</div>


              <h2 className="product-category">{product.category}</h2>

              <Readmore text={product.description} maxChars={30} />
              <div className="rating">
                <StarRating
                  rating={product.rating ? Math.round(product.rating.rate) : 0}
                  count={product.rating?.count || 0}
                />
              </div>
              <div className="favorites">
                <button
                  className="cart-button"
                  onClick={() => {
                    addToCart(product);
                    setOpenSnackbar(true);
                  }}
                >
                  {isInCart ? "Add to cart" : "Add to Cart"}
                </button>
                <p
                  className="product-icon"
                  onClick={() =>
                    isInFavorites
                      ? removeFromFavorites(product.id)
                      : addToFavorites(product)
                  }
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: isInFavorites ? "red" : "gray",
                  }}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ top: "80px !important" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added to cart successfully!
        </Alert>
      </Snackbar>

      <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={clearLocalProducts}
          style={{
            padding: "10px 20px",
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          Clear Local Products
        </button>
      </div>
    </>
  );
};

export default Product;
