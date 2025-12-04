import { expect, it, describe, vi } from "vitest";
// import { formatMoney } from "./money";
import { Product } from "./Product";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("Product component", () => {
  it("displays the product details correctly", () => {
    const product = {
      keywords: ["cooking set", "kitchen"],
      id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
      image: "images/products/non-stick-cooking-set-4-pieces.jpg",
      name: "Non-Stick Cook Set With Lids - 4 Pieces",
      rating: {
        stars: 4.5,
        count: 511,
      },
      priceCents: 6797,
      createdAt: "2025-12-01T17:03:44.750Z",
      updatedAt: "2025-12-01T17:03:44.750Z",
    };

    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart} />);
    expect(
      screen.getByText("Non-Stick Cook Set With Lids - 4 Pieces")
    ).toBeInTheDocument();

    expect(screen.getByText("$67.97")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/non-stick-cooking-set-4-pieces.jpg"
    );
    expect(screen.getByTestId("rating-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-45.png`
    );
    expect(screen.getByText("511")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    const product = {
      keywords: ["cooking set", "kitchen"],
      id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
      image: "images/products/non-stick-cooking-set-4-pieces.jpg",
      name: "Non-Stick Cook Set With Lids - 4 Pieces",
      rating: {
        stars: 4.5,
        count: 511,
      },
      priceCents: 6797,
      createdAt: "2025-12-01T17:03:44.750Z",
      updatedAt: "2025-12-01T17:03:44.750Z",
    };

    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart} />);
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
