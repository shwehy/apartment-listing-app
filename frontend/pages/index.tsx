import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Apartment = {
  _id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  imageUrl: string;
  description: string;
  area: number;
  bedrooms: number;
  deliveryDate: string;
};

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Apartment[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/apartments').then((res) => {
      setApartments(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      apartments.filter(
        (apt) =>
          apt.unitName.toLowerCase().includes(q) ||
          apt.unitNumber.toLowerCase().includes(q) ||
          apt.project.toLowerCase().includes(q)
      )
    );
  }, [search, apartments]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this apartment?')) {
      await axios.delete(`http://localhost:4000/api/apartments/${id}`);
      const updated = apartments.filter((apt) => apt._id !== id);
      setApartments(updated);
      setFiltered(updated);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🏠 Apartment Listings</h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by unit name, number, or project..."
            className="w-full sm:w-1/2 border border-gray-300 px-4 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            href="/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto text-center"
          >
            ➕ Add Apartment
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((apt) => (
            <div
              key={apt._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {apt.imageUrl && (
                <img
                  src={apt.imageUrl}
                  alt={apt.unitName}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{apt.unitName}</h2>
                <p className="text-gray-600 text-sm mb-2">{apt.project}</p>
                <div className="text-sm text-gray-700 mb-3">
                  📏 {apt.area} m² | 🛏 {apt.bedrooms} Beds
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`/apartment/${apt._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-4">
                    <Link
                      href={`/edit/${apt._id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(apt._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-500 col-span-full">No apartments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
