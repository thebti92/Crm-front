import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const currency = process.env.REACT_APP_CURRENCY;

export default function ProductComponent({ category, promo , searchTerm}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log("AAAAAAAAAAAAa", searchTerm);



 // const Search = searchTerm.searchTerm ;

  useEffect(() => {
    // Fetch products from the API
    axios.get(`${BASE_URL}/api/products`)
      .then((response) => {
        let Display = [];
        response.data.map((row) => row.publish === true ? Display.push(row) : '');

        setProducts(Display);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter products based on the provided prop
  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category.label === category);
    console.log("MMMMMMMMMMMMMM", filteredProducts)
    
  }
  if (promo) {
    filteredProducts = filteredProducts.filter(product => product.promo);
  }

  // if (searchTerm && searchTerm.searchTerm != null) {
  //   filteredProducts = filteredProducts.filter(product => product.name == searchTerm.searchTerm);
  //   console.log("SEARCH TERM FILTER", filteredProducts)
  // }


  if (searchTerm != null) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("SEARCH TERM FILTERRRRRRRRRR", filteredProducts);
  }




   // Check if there are no products in the filtered list
   if (filteredProducts.length === 0) {
    return (
    <div align='center'>
      <h1>No products found in the selected category.</h1>
    </div>
      )
  }

  return (
    <div className="bg-white z-9">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.img}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 text-sm text-gray-700">
                <h3>{product.name}</h3>
              </div>
             
             
            <div className='display: flex'>
              <div className="font-semibold">
                <p>{product.pricetax}{currency}</p>
              </div>
              <div className='bg-green-200'>
                {product.promo ? '-'+product.promo+'%' : ''}
              </div>

            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
