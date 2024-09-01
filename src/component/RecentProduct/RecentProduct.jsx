import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext.jsx';  
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner,faStar } from '@fortawesome/free-solid-svg-icons'; 

export default function RecentProduct() {
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);  
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    try {
      let response = await addProductToCart(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart.");
    }
    setLoading(false);
  }

  async function addToWishlist(id) {
    setCurrentId(id);
    setLoading(true);
    try {
      let response = await addProductToWishlist(id);
      if (response.data.status === "success") { 
        toast.success("Product added to wishlist successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the wishlist.");
    }
    setLoading(false);
  }

  function getProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='row'>
      {products.map((product) => (
        <div key={product.id} className='w-1/6'>
          <div className='product p-3'>
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full mb-3 h-50' alt={product.name} />
              <h3 className='text-green-600'>{product.category.name}</h3>
              <h3 className='font-bold'>{product.title}</h3>
              <div className='flex justify-between'>
                <span>{product.price} EGP</span> 
                <span><span className='text-yellow-400'><FontAwesomeIcon icon={faStar} /></span> {product.ratingsAverage}</span>
              </div>
            </Link>
            <button 
              onClick={() => addToCart(product.id)} 
              className='btn w-full bg-green-500 text-white p-3 rounded'
              disabled={loading && currentId === product.id}
            >
              {loading && currentId === product.id ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Add to Cart"
              )}
            </button>
            <button 
              onClick={() => addToWishlist(product.id)} 
              className='btn w-full bg-blue-500 text-white p-3 rounded mt-2'
              disabled={loading && currentId === product.id}
            >
              {loading && currentId === product.id ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Add to Wishlist"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
