import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddApartment() {
  const router = useRouter();
  const [form, setForm] = useState({
    unitName: '',
    unitNumber: '',
    project: '',
    imageUrl: '',
    description: '',
    area: '',
    bedrooms: '',
    deliveryDate: '',
    price: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/apartments', {
      ...form,
      area: Number(form.area),
      bedrooms: Number(form.bedrooms),
      price: Number(form.price),
    });
    router.push('/');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Apartment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" name="unitName" placeholder="Unit Name" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="unitNumber" placeholder="Unit Number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="project" placeholder="Project Name" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="area" placeholder="Area in m²" type="number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="bedrooms" placeholder="Bedrooms" type="number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="deliveryDate" placeholder="Delivery Date (e.g. 2026)" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="price" placeholder="Price in EGP" type="number" onChange={handleChange} />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" onChange={handleChange} />
        <div className="flex justify-between">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded hover:bg-gray-100">← Back</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </div>
      </form>
    </div>
  );
}
