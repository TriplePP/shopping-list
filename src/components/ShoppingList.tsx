import React, { useState } from "react";

interface Item {
  name: string;
  price: number;
  selected: boolean;
}

const ShoppingList = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

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
    setItemList(updatedItems);

    // Clear the input fields after adding the item
    setName("");
    setPrice("");
  };

  const handleRemoveItem = (index: number) => {
    // filtering all our items for one that matches the index of the clicked button
    const updatedItems = itemList.filter((_, i) => i !== index);
    setItemList(updatedItems);
  };

  return (
    <div className="list-container">
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
          <li className="item-container" key={index}>
            {item.name} - {item.price.toFixed(2)}
            <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
