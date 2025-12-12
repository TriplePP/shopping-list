import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";

import ShoppingList from "../components/ShoppingList";

describe("ShoppingList component", () => {
  beforeEach(() => {
    render(<ShoppingList />);
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the component", () => {
    expect(screen.getByText(/Your spending limit is/)).toBeInTheDocument();
  });

  it("successfully adds item to shopping list", () => {
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("£2.00")).toBeInTheDocument();
  });

  it("displays alert when input is missing", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    givenAnInputIsMissing();
    givenAddItemButtonIsClicked();

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter an item name and price"
    );
  });

  it("successfully removes item from list", () => {
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    givenItemRemoveButtonIsClicked();

    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
    expect(screen.queryByText("£2.00")).not.toBeInTheDocument();
  });

  it("moves item up in the list", () => {
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    givenSecondItemIsEntered();
    givenAddItemButtonIsClicked();

    const listItems = screen.getAllByRole("listitem");

    // Check the order of list items before clicking the up arrow
    expect(listItems[0]).toHaveTextContent("Coffee");
    expect(listItems[1]).toHaveTextContent("Oranges");

    // Move the oranges up
    const upArrows = screen.getAllByTestId("up-arrow");
    fireEvent.click(upArrows[1]);

    // Check the order again
    expect(listItems[0]).toHaveTextContent("Oranges");
    expect(listItems[1]).toHaveTextContent("Coffee");
  });

  it("moves item down in the list", () => {
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    givenSecondItemIsEntered();
    givenAddItemButtonIsClicked();

    const listItems = screen.getAllByRole("listitem");

    // Check the order of list items before clicking the down arrow
    expect(listItems[0]).toHaveTextContent("Coffee");
    expect(listItems[1]).toHaveTextContent("Oranges");

    // Move the coffee down
    const upArrows = screen.getAllByTestId("down-arrow");
    fireEvent.click(upArrows[0]);

    // Check the order again
    expect(listItems[0]).toHaveTextContent("Oranges");
    expect(listItems[1]).toHaveTextContent("Coffee");
  });

  it("displays alert when over spending limit", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    givenExpensiveItemIsAdded();
    givenAddItemButtonIsClicked();

    expect(window.alert).toHaveBeenCalledWith(
      "You have gone over your spending limit! Consider removing some items"
    );
  });
});

describe("Email functionality", () => {
  beforeEach(() => {
    render(<ShoppingList />);
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the email button", () => {
    expect(screen.getByText("Email my shopping list")).toBeInTheDocument();
  });

  it("disables email button when list is empty", () => {
    const emailButton = screen.getByRole("button", {
      name: "Email my shopping list",
    });
    expect(emailButton).toBeDisabled();
  });

  it("enables email button when list has items", () => {
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();

    const emailButton = screen.getByRole("button", {
      name: "Email my shopping list",
    });
    expect(emailButton).toBeEnabled();
  });

  it("creates correct mailto link", () => {
    givenMockWindowLocationHrefIsCreated();
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    givenEmailButtonIsClicked();

    expect(window.location.href).toContain("mailto:");
  });

  it("adds items to email body", () => {
    givenMockWindowLocationHrefIsCreated();
    givenValidInputIsEntered();
    givenAddItemButtonIsClicked();
    givenEmailButtonIsClicked();

    const emailBody = decodeURIComponent(window.location.href);
    expect(emailBody).toContain("Coffee");
    expect(emailBody).toContain("£2.00");
  });
});

function givenValidInputIsEntered() {
  const nameInput = screen.getByLabelText("Name");
  const priceInput = screen.getByLabelText("Price");

  fireEvent.change(nameInput, { target: { value: "Coffee" } });
  fireEvent.change(priceInput, { target: { value: 2 } });
}

function givenSecondItemIsEntered() {
  const nameInput = screen.getByLabelText("Name");
  const priceInput = screen.getByLabelText("Price");

  fireEvent.change(nameInput, { target: { value: "Oranges" } });
  fireEvent.change(priceInput, { target: { value: 1.5 } });
}

function givenExpensiveItemIsAdded() {
  const nameInput = screen.getByLabelText("Name");
  const priceInput = screen.getByLabelText("Price");

  fireEvent.change(nameInput, { target: { value: "Ferrari" } });
  fireEvent.change(priceInput, { target: { value: 100000 } });
}

function givenAnInputIsMissing() {
  const nameInput = screen.getByLabelText("Name");

  fireEvent.change(nameInput, { target: { value: "Coffee" } });
}

function givenAddItemButtonIsClicked() {
  const button = screen.getByRole("button", { name: "Add Item" });
  fireEvent.click(button);
}

function givenItemRemoveButtonIsClicked() {
  const button = screen.getByRole("button", { name: "Remove" });
  fireEvent.click(button);
}

function givenEmailButtonIsClicked() {
  const emailButton = screen.getByRole("button", {
    name: "Email my shopping list",
  });
  fireEvent.click(emailButton);
}

function givenMockWindowLocationHrefIsCreated() {
  // we need to delete the window location object for our test as it is read only
  delete (window as any).location;
  // we create a new window.location.href and set to an empty string
  window.location = { href: "" } as any;
}
