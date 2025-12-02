import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import axios from "axios";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchPrams] = useSearchParams();
  const search = searchPrams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    fetchData();
  }, [search]);

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
