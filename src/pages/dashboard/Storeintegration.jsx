import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const StoreIntegration = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const isValidPakistaniMobile = (number) => {
    return /^03\d{9}$/.test(number);
  };

  const products = [
    {
      id: 1,
      name: "Educational Robot Kit",
      description: "Learn robotics and coding with this interactive kit",
      price: "Rs. 24,499",
      image: "https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/1500x1500/products/590/1842/REV-45-2041-EDU_Kit_V2-FINAL__01041.1612558197.png?c=2",
      category: "Robotics",
    },
    {
      id: 2,
      name: "Digital Microscope",
      description: "Explore the microscopic world with HD clarity",
      price: "Rs. 12,999",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ26FPD5XIEaZ7TKM9h2GnopORre_j1Deacw&s",
      category: "Microscopes",
    },
    {
      id: 3,
      name: "Coding Circuit Kit",
      description: "Build and program your own circuits",
      price: "Rs. 8,499",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKAJnUy779UUEBT4dZN03h_wfxMQ8U5icMdA&s",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Advanced Robotics Kit",
      description: "Master complex robotics with this all-in-one kit",
      price: "Rs. 54,999",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1hiruajDOL3s3tqpWjtTWpOAVAJrTTVAxeA&s",
      category: "Robotics",
    },
    {
      id: 5,
      name: "Portable Microscope",
      description: "Compact microscope for field exploration",
      price: "Rs. 10,999",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVaPX91EyelYvPJBtcE4Zm25GqIEaJFFYkw&s",
      category: "Microscopes",
    },
    {
      id: 6,
      name: "Mini Ardiuno Kit",
      description: "Learn electronics through fun experiments",
      price: "Rs. 9,499",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYX1UYuT5avSOg_rRGHymUvaZzvsggqFoykQ&s",
      category: "Electronics",
    },
    {
      id: 7,
      name: "Electronics Discovery Kit",
      description: "Learn electronics through fun experiments",
      price: "Rs. 44,099",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYbfIn8K9UT7Xpl-ucHpwG2BEbOQMbZeoiBg&s",
      category: "Electronics",
    },
  ];

  const parsePrice = (price) => parseInt(price.replace(/Rs\.\s?|,/g, ""));

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
    .filter((product) => {
      const price = parsePrice(product.price);
      if (priceRange === "1000-9999") return price >= 1000 && price <= 9999;
      if (priceRange === "10000-49999") return price >= 10000 && price <= 49999;
      if (priceRange === "50000+") return price >= 50000;
      return true;
    })
    .sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      if (sortBy === "lowToHigh") return priceA - priceB;
      if (sortBy === "highToLow") return priceB - priceA;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubmitOrder = async () => {
    if (!mobile || !address) {
      toast.error("Please fill all fields");
      return;
    }
    if (mobile.length !== 11) {
      toast.error("Mobile number must be exactly 11 digits");
      return;
    }
     if (!isValidPakistaniMobile(mobile)) {
      toast.error("Enter a valid Pakistani mobile number starting with 03 and 11 digits");
      return;
    }

    const token = localStorage.getItem("token");

    const orderData = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      mobile,
      address,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Order placed successfully!");
        setShowModal(false);
        setMobile("");
        setAddress("");
        setSelectedProduct(null);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error.response || error);
      toast.error(error?.response?.data?.message || "Error submitting order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none "
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="block w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-3 text-sm">
          <option value="All">All Categories</option>
          <option value="Robotics">Robotics</option>
          <option value="Microscopes">Microscopes</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="block w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-3 text-sm">
          <option value="All">All Price Ranges</option>
          <option value="1000-9999">Rs1000 - Rs9999</option>
          <option value="10000-49999">Rs10000 - Rs49999</option>
          <option value="50000+">Rs50000+</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="block w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-3 text-sm">
          <option value="None">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-60 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900">{product.price}</p>
                <button
                  onClick={() => handleOrderClick(product)}
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-700"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-black text-white" : "bg-white border border-gray-300 text-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Order Modal */}
        {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">This order is Cash on Delivery</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Product ID:</strong> {selectedProduct.id}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Product Name:</strong> {selectedProduct.name}
            </p>

            <input
              type="text"
              maxLength={11}
              value={mobile}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setMobile(val);
              }}
              placeholder="Mobile Number (11 digits, starts with 03)"
              className={`w-full mb-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                ${
                  mobile.length === 11 && isValidPakistaniMobile(mobile)
                    ? "focus:ring-green-500"
                    : "focus:ring-red-500"
                }`}
            />
            {mobile && !isValidPakistaniMobile(mobile) && (
              <p className="text-xs text-red-600 mb-2">
                Must be exactly 11 digits and start with 03
              </p>
            )}

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={mobile.length !== 11 || !address.trim() || !isValidPakistaniMobile(mobile)}
                className={`px-4 py-2 rounded-md ${
                  mobile.length === 11 && address.trim() && isValidPakistaniMobile(mobile)
                    ? "bg-black text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreIntegration;
