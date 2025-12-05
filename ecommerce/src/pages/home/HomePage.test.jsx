import { expect, it, describe, vi, beforeEach } from "vitest";
import HomePage from "./HomePage";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
// import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
vi.mock("axios");

describe("HomePage Component", () => {
  let loadCart;
  let user;
  beforeEach(() => {
    loadCart = vi.fn();
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
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
            },
            {
              keywords: ["kitchen", "kitchen towels", "tissues"],
              id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
              image: "images/products/kitchen-paper-towels-8-pack.jpg",
              name: "2-Ply Kitchen Paper Towels - 8 Pack",
              rating: {
                stars: 4.5,
                count: 1045,
              },
              priceCents: 1899,
              createdAt: "2025-12-01T17:03:44.762Z",
              updatedAt: "2025-12-01T17:03:44.762Z",
            },
          ],
        };
      }
    });
    user = userEvent.setup();
  });

  it("displays the product correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2);
    expect(
      within(productContainers[0]).getByText(
        "Non-Stick Cook Set With Lids - 4 Pieces"
      )
    ).toBeInTheDocument();
    expect(
      within(productContainers[1]).getByText(
        "2-Ply Kitchen Paper Towels - 8 Pack"
      )
    ).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId("product-container");

    const addToCartButton1 = within(productContainers[0]).getByTestId(
      "add-to-cart-button"
    );
    await user.click(addToCartButton1);

    const addToCartButton2 = within(productContainers[1]).getByTestId(
      "add-to-cart-button"
    );
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
      quantity: 1,
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
