"use client";
import { Item } from "@/lib/types";
import { itemsService } from "@/services/items";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminInventoryPage() {
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const response = await itemsService.getAll();

        // Supports both paginated and plain responses
        const items =
          response?.data?.data ??
          response?.data ??
          [];

        setMenuItems(items);
      } catch (error) {
        console.error(
          "Failed to fetch menu items:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAvailability = (itemId: string, isAvailable: boolean) => async () => {
    try {
      const formData = new FormData();

      formData.append("isAvailable", (!isAvailable).toString());
      await itemsService.update(itemId, formData);

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === itemId
            ? { ...item, isAvailable: !isAvailable }
            : item
        )
      );

      alert(
        `Item ${
          isAvailable ? "disabled" : "enabled"
        } successfully.`
      );
    } catch (error) {
      console.error(
        `Failed to ${
          isAvailable ? "disable" : "enable"
        } item:`,
        error
      );
      alert(
        `Failed to ${
          isAvailable ? "disable" : "enable"
        } item.`
      );
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Inventory Management
        </h1>
        <button
          onClick={() => {
            window.location.href = "/admin/inventory/add";
          }}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
        >
          Add Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">
            Loading inventory...
          </p>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">
            No items found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {menuItems.map((item) => (

            <div
              key={item.itemId}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <div className="relative h-52">

                <Image
                  src={item.imageUrl || "/placeholder-food.jpg"}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                />

                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                      UNAVAILABLE
                    </span>
                  </div>
                )}

              </div>

              <div className="p-5">

                <h2 className="text-xl font-bold text-gray-900">
                  {item.itemName}
                </h2>

                <p className="text-green-600 font-semibold mt-2 text-lg">
                  ₹{item.price}
                </p>

                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">

                  <button 
                  onClick={()=> {
                    window.location.href = `/admin/inventory/${item.itemId}`
                  }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                  onClick={handleAvailability(item.itemId, item.isAvailable)}
                    className={`flex-1 py-2 rounded-lg text-white ${
                      item.isAvailable
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {item.isAvailable
                      ? "Disable"
                      : "Enable"}
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </main>
  </div>
);
}