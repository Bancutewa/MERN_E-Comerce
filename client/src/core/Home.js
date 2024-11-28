import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import 'fontsource-roboto';
import Copyright from './Copyright';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home page'
      description='MERN E-commerce App'
      className='container-fluid'
    >
      <Search />
      <div className="container mt-4">
        <h2 className="mb-3">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-5">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>


      <Copyright />
    </Layout>
  );
};

export default Home;
