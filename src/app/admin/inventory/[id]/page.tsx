"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { itemsService } from "@/services/items";
import { Category, Item } from "@/lib/types";
import Image from "next/image";
import { categoriesService } from "@/services/categories";

export default function EditItemPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);

    const [currentImage, setCurrentImage] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadItem = async () => {
            try {
                setLoading(true);

                const response = await itemsService.getById(id);
                const item: Item = response.data;

                setItemName(item.itemName);
                setItemDescription(item.itemDescription);
                setPrice(item.price.toString());
                setStockQuantity(item.stockQuantity.toString());
                setCategoryId(item.categoryId);
                setIsAvailable(item.isAvailable);
                setCurrentImage(item.imageUrl || "");
            } catch (error) {
                console.error(error);
                alert("Failed to load item.");
            } finally {
                setLoading(false);
            }
        };

        loadItem();
    }, [id]);

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
        
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);

        // Preview immediately
        setCurrentImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("itemName", itemName);
            formData.append("itemDescription", itemDescription);
            formData.append("price", price);
            formData.append("stockQuantity", stockQuantity);
            formData.append("categoryId", categoryId);
            formData.append("isAvailable", String(isAvailable));

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            await itemsService.update(id, formData);

            alert("Item updated successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to update item.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="mb-3 text-sm text-green-600 hover:underline"
                    >
                        ← Back to Inventory
                    </button>

                    <h1 className="text-4xl font-bold text-gray-900">
                        Edit Item
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Update product information, inventory and availability.
                    </p>
                </div>

                <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {isAvailable ? "Available" : "Unavailable"}
                </span>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid gap-8 lg:grid-cols-3"
            >
                {/* Image Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-2xl border bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-lg font-semibold text-gray-900">
                            Item Image
                        </h2>

                        <label
                            htmlFor="image-upload"
                            className="group relative block aspect-square cursor-pointer overflow-hidden rounded-2xl border bg-gray-100"
                        >
                            <Image
                                src={currentImage || "/placeholder-food.jpg"}
                                alt={itemName}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/45">
                                <div className="rounded-full bg-white px-5 py-2 font-medium text-gray-900 opacity-0 transition duration-300 group-hover:opacity-100">
                                    Change Image
                                </div>
                            </div>

                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {selectedImage && (
                            <p className="mt-4 text-center text-sm text-green-600">
                                {selectedImage.name}
                            </p>
                        )}

                        <p className="mt-2 text-center text-xs text-gray-500">
                            Click the image to upload a new one
                        </p>

                    </div>
                </div>

                {/* Details Card */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border bg-white p-8 shadow-sm">

                        <h2 className="mb-8 text-xl font-semibold text-gray-900">
                            Item Information
                        </h2>

                        <div className="space-y-6">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Item Name
                                </label>

                                <input
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    rows={5}
                                    value={itemDescription}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    required
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        value={price}
                                        step="0.01"
                                        min={0}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full rounded-xl border px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Stock Quantity
                                    </label>

                                    <input
                                        type="number"
                                        value={stockQuantity}
                                        min={0}
                                        onChange={(e) => setStockQuantity(e.target.value)}
                                        className="w-full rounded-xl border px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        required
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                >
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

                            <div className="rounded-xl border bg-gray-50 p-4">

                                <label className="flex cursor-pointer items-center justify-between">

                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Available for Ordering
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Customers can order this item.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={isAvailable}
                                        onChange={(e) =>
                                            setIsAvailable(e.target.checked)
                                        }
                                        className="h-5 w-5 accent-green-600"
                                    />

                                </label>

                            </div>

                        </div>

                    </div>

                    <div className="mt-8 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                            {saving ? "Updating..." : "Update Item"}
                        </button>

                    </div>

                </div>
            </form>
        </div>
    );
}