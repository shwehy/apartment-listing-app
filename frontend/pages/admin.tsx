import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function AdminPanel() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:4000/api/apartments');
      setMessage('All apartments deleted.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete apartments.');
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a JSON file.');

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!Array.isArray(data)) throw new Error("JSON must be an array");

        await axios.post('http://localhost:4000/api/apartments/bulk', data);
        setMessage('Apartments imported successfully!');
      } catch (err) {
        console.error(err);
        setMessage('Error importing apartments.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛠️ Admin Panel</h1>

      <div className="space-y-6">
        <div>
          <button
            onClick={handleDeleteAll}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🗑️ Delete All Apartments
          </button>
        </div>

        <div className="border-t pt-6">
          <label className="block mb-2 font-medium">📂 Upload Apartments JSON</label>
          <input type="file" accept=".json" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Import Apartments
          </button>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={() => router.back()} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">← Back</button>
        </div>
        {message && <p className="text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
}
