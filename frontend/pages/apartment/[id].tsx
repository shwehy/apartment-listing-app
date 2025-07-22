import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Apartment = {
  _id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  imageUrl: string;
  area?: number;
  bedrooms?: number;
  deliveryDate?: string;
};

export default function ApartmentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/apartments/${id}`)
        .then((res) => setApartment(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!apartment) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-4">
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          ← Back to Listings
        </button>
      </div>

      {/* Hero Image */}
      {apartment.imageUrl && (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow mb-6">
          <img
            src={apartment.imageUrl}
            alt={apartment.unitName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>📞 Phone:</strong> +20 114 354 2003</p>
              <p className="text-gray-700"><strong>📧 Email:</strong> alyelshwahy98@gmail.com</p>
            </div>
          </div>
        </div>
      )}
      {/* Info Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{apartment.unitName}</h1>
          <p className="text-gray-600">
            {apartment.project} — Unit #{apartment.unitNumber}
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Contact Agent
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Area</p>
          <p className="text-lg font-semibold">{apartment.area ?? 120} m²</p>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">🛏 Bedrooms</p>
          <p className="text-lg font-semibold">{apartment.bedrooms ?? 2}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500">Delivery</p>
          <p className="text-lg font-semibold">{apartment.deliveryDate ?? '2026'}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">About this apartment</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {apartment.description}
        </p>
      </div>
    </div>
  );
}
