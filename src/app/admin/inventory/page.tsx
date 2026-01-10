"use client";
import { useEffect, useState } from "react";

type InventoryItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const mockInventory: InventoryItem[] = [
  { id: 1, name: "Chicken Biryani", price: 249, stock: 20 },
  { id: 2, name: "Veg Biryani", price: 199, stock: 15 },
  { id: 3, name: "Dosa", price: 129, stock: 30 },
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);

  useEffect(() => {
    const stored = localStorage.getItem("admin_inventory");
    if (stored) {
      setInventory(JSON.parse(stored));
    } else {
      localStorage.setItem("admin_inventory", JSON.stringify(mockInventory));
    }
  }, []);

  const updateItem = (id: number) => {
    const price = prompt("Enter new price:");
    const stock = prompt("Enter new stock:");

    if (!price || !stock) return;

    const updated = inventory.map((item) =>
      item.id === id
        ? { ...item, price: Number(price), stock: Number(stock) }
        : item
    );

    setInventory(updated);
    localStorage.setItem("admin_inventory", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">₹{item.price}</td>
                <td className="px-4 py-3">
                  {item.stock > 0 ? item.stock : "Out of stock"}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => updateItem(item.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
