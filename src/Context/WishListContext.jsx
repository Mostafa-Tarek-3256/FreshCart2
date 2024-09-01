import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  const headers = { token: localStorage.getItem("UserToken") };

 
  async function addProductToWishlist(productId) {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers }
      );
      if (response.data.status === "success") {
       
        getWishlist();
        return response;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred while adding the product to the wishlist.");
    }
  }


  async function deleteProductFromWishlist(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      if (response.data.status === "success") {
        // Update state
        setWishlist(prev => prev.filter(product => product.id !== productId));
        return response;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred while deleting the product from the wishlist.");
    }
  }

 
  async function getWishlist() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
      if (response.data.status === "success") {
        setWishlist(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching the wishlist:", error.message);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ addProductToWishlist, deleteProductFromWishlist, wishlist, getWishlist }}>
      {props.children}
    </WishlistContext.Provider>
  );
}
