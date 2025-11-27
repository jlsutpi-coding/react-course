import Header from "../components/Header";
import "./NotFoundPage.css";
function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="not-found-page">Not Found Page</div>
    </>
  );
}

export default NotFoundPage;
