import React, { useEffect, useState } from "react";

interface Item {
  name: string;
  price: number;
  selected: boolean;
}

// load shopping list from local storage if present
const getSavedItems = () => {
  const savedItems = localStorage.getItem("shoppingList");
  if (savedItems) {
    return JSON.parse(savedItems);
  } else {
    return [];
  }
};

const ShoppingList = () => {
  const savedItems = getSavedItems();
  const [itemList, setItemList] = useState<Item[]>(savedItems);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  // calculate our total from saved shopping list
  const [total, setTotal] = useState<number>(
    savedItems.reduce((sum: number, item: Item) => sum + item.price, 0)
  );
  // hard coding the spending limit here - but we could take this as another input from the user
  const spendingLimit = 10;

  // save our shopping list to local storage when it is updated
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(itemList));
  }, [itemList]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price === "") {
      alert("Please enter an item name and price");
      return;
    }

    const newItem = {
      name: name,
      price: price,
      selected: false,
    };
    // creating a copy of the list here to avoid any state issues with editing the current list
    const updatedItems = [...itemList, newItem];
    const newTotal = total + price;
    setItemList(updatedItems);
    setTotal(newTotal);
    if (newTotal > spendingLimit)
      alert(
        "You have gone over your spending limit! Consider removing some items"
      );
    // Clear the input fields after adding the item
    setName("");
    setPrice("");
  };

  const handleRemoveItem = (index: number) => {
    const amountToRemoveFromTotal = itemList[index].price;
    const newTotal = total - amountToRemoveFromTotal;
    // filtering all our items for one that matches the index of the clicked button
    const updatedItems = itemList.filter((_, i) => i !== index);
    setItemList(updatedItems);
    setTotal(newTotal);
  };

  const toggleSelected = (index: number) => {
    const updatedItems = [...itemList];
    updatedItems[index].selected = !updatedItems[index].selected;
    setItemList(updatedItems);
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const updatedItems = [...itemList];
    const before = updatedItems[index - 1];
    updatedItems[index - 1] = updatedItems[index];
    updatedItems[index] = before;
    setItemList(updatedItems);
  };

  const moveItemDown = (index: number) => {
    if (index === itemList.length - 1) return;
    const updatedItems = [...itemList];
    const next = updatedItems[index + 1];
    updatedItems[index + 1] = updatedItems[index];
    updatedItems[index] = next;
    setItemList(updatedItems);
  };

  return (
    <div className="list-container">
      <h2>Your spending limit is: £{spendingLimit.toFixed(2)}</h2>
      <form className="add-item-container" onSubmit={handleAddItem}>
        <label>
          Name
          <input
            type="text"
            placeholder="e.g. Bananas"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Price
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
      <ul className="item-list">
        {itemList.map((item, index) => (
          <li className={"item-container"} key={index}>
            <span
              style={{
                textDecoration: item.selected ? "line-through" : "none",
                color: item.selected ? "grey" : "black",
              }}
            >
              {item.name}
            </span>{" "}
            £{item.price.toFixed(2)}
            <span
              onClick={() => moveItemUp(index)}
              className="arrow-icon"
              data-testid="up-arrow"
            >
              ↑
            </span>
            <span
              onClick={() => moveItemDown(index)}
              className="arrow-icon"
              data-testid="down-arrow"
            >
              ↓
            </span>
            <span onClick={() => toggleSelected(index)} className="tick-icon">
              ✓
            </span>
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Total: £{total.toFixed(2)} </div>
    </div>
  );
};

export default ShoppingList;
