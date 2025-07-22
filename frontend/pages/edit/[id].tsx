// frontend/pages/edit/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditApartment() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    unitName: '',
    unitNumber: '',
    project: '',
    imageUrl: '',
    description: '',
    area: '',
    bedrooms: '',
    deliveryDate: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/api/apartments/${id}`).then((res) => {
        const apt = res.data;
        setForm({
          unitName: apt.unitName,
          unitNumber: apt.unitNumber,
          project: apt.project,
          imageUrl: apt.imageUrl,
          description: apt.description,
          area: apt.area,
          bedrooms: apt.bedrooms,
          deliveryDate: apt.deliveryDate
        });
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/apartments/${id}`, {
      ...form,
      area: Number(form.area),
      bedrooms: Number(form.bedrooms)
    });
    router.push('/');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Apartment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" name="unitName" value={form.unitName} placeholder="Unit Name" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="unitNumber" value={form.unitNumber} placeholder="Unit Number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="project" value={form.project} placeholder="Project Name" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="imageUrl" value={form.imageUrl} placeholder="Image URL" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="area" value={form.area} placeholder="Area (m²)" type="number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="bedrooms" value={form.bedrooms} placeholder="Bedrooms" type="number" onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="deliveryDate" value={form.deliveryDate} placeholder="Delivery Date" onChange={handleChange} />
        <textarea className="w-full p-2 border rounded" name="description" value={form.description} placeholder="Description" onChange={handleChange} />
        <div className="flex justify-between">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded hover:bg-gray-100">← Back</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
        </div>
      </form>
    </div>
  );
}
