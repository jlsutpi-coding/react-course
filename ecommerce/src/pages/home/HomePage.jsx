import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="favicon/home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid loadCart={loadCart} products={products} />
      </div>
    </>
  );
}

export default HomePage;
