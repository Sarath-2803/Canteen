"use client"

import { Category } from "@/lib/types";
import { categoriesService } from "@/services/categories";
import { itemsService } from "@/services/items";
import { useEffect, useState } from "react";


export default function AdminInventoryAddPage() {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await categoriesService.getAll();
            setCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("itemName", itemName);
            formData.append("itemDescription", itemDescription);
            formData.append("stockQuantity", stockQuantity);
            formData.append("categoryId", categoryId);
            if (image) {
                formData.append("image", image);
            }
            formData.append("price", itemPrice);
            formData.append("isAvailable", isAvailable.toString());

            console.log("Form Data:", {
                itemName,
                itemDescription,
                stockQuantity,
                categoryId,
                image,
                itemPrice,
                isAvailable,
            });
            await itemsService.create(formData);

            alert("Item added successfully!");
            window.location.href = "/admin/inventory";
        } catch (error) {
            console.error("Failed to add item:", error);
            alert("Failed to add item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
  <div className="max-w-4xl mx-auto py-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Add New Item
      </h1>

      <p className="mt-2 text-gray-500">
        Create a new menu item for your canteen.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Image */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <label className="mb-4 block text-lg font-semibold text-gray-900">
          Item Image
        </label>

        <div className="flex justify-center">
          <label
            htmlFor="image-upload"
            className="group relative flex h-80 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-green-500"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-3">
                  📷
                </div>

                <p className="font-semibold text-gray-700">
                  Click to upload image
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  JPG, PNG or WEBP
                </p>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
              <span className="rounded-full bg-white px-5 py-3 font-medium opacity-0 transition group-hover:opacity-100">
                {image
                  ? "Change Image"
                  : "Choose Image"}
              </span>
            </div>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (
                  e.target.files &&
                  e.target.files[0]
                ) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>

        {image && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Selected:
            <span className="ml-2 font-medium text-green-600">
              {image.name}
            </span>
          </p>
        )}
      </div>

      {/* Details */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm space-y-6">

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Item Name
          </label>

          <input
            type="text"
            value={itemName}
            onChange={(e) =>
              setItemName(e.target.value)
            }
            placeholder="Chicken Burger"
            required
            className="w-full rounded-xl border px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={4}
            value={itemDescription}
            onChange={(e) =>
              setItemDescription(
                e.target.value
              )
            }
            placeholder="Describe the item..."
            required
            className="w-full rounded-xl border px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Price (₹)
            </label>

            <input
              type="number"
              min={0}
              step="0.01"
              value={itemPrice}
              onChange={(e) =>
                setItemPrice(e.target.value)
              }
              required
              className="w-full rounded-xl border px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Stock Quantity
            </label>

            <input
              type="number"
              min={0}
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(
                  e.target.value
                )
              }
              required
              className="w-full rounded-xl border px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Category
          </label>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            required
            className="w-full rounded-xl border px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.categoryId}
                value={category.categoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl bg-gray-50 p-5">
          <label className="flex cursor-pointer items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Available for Ordering
              </h3>

              <p className="text-sm text-gray-500">
                Customers can order this
                item.
              </p>
            </div>

            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) =>
                setIsAvailable(
                  e.target.checked
                )
              }
              className="h-5 w-5 rounded accent-green-600"
            />
          </label>
        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() =>
            window.history.back()
          }
          className="rounded-xl border bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white shadow hover:bg-green-700 disabled:opacity-60"
        >
          {loading
            ? "Adding..."
            : "Add Item"}
        </button>

      </div>
    </form>
  </div>
);
}