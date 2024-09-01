import React, { useContext } from 'react';
import { WishlistContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { wishlist, deleteProductFromWishlist } = useContext(WishlistContext);

  const handleDelete = async (id) => {
    try {
      await deleteProductFromWishlist(id);
      toast.success("Product removed from wishlist.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (wishlist.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className='row'>
      {wishlist.map((product) => (
        <div key={product.id} className='w-1/6'>
          <div className='product p-3'>
            <img src={product.imageCover} className='w-full mb-3 h-50' alt={product.name} />
            <h3 className='text-green-600'>{product.category.name}</h3>
            <h3 className='font-bold'>{product.title}</h3>
            <div className='flex justify-between'>
              <span>{product.price} EGP</span>
              <span><i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
            </div>
            <button
              onClick={() => handleDelete(product.id)}
              className='btn w-full bg-red-500 text-white p-3 rounded mt-2'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
