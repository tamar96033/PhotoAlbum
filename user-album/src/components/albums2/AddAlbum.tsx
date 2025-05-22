import { useState } from "react";
import { Album } from "../../api/client";
import { useApiClient } from "../../contexts/ApiClientContext";

interface AlbumForm {
    title: string;
    description?: string;
  }
  
const AddAlbum = () => {
    const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AlbumForm>({ title: "", description: "" });
  const apiClient = useApiClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make API call to save the album
    try {
    //   const response = await fetch("/api/albums", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     alert("Album created!");
    //     setFormData({ title: "", description: "" });
    //     setShowForm(false);
    //   } else {
    //     alert("Failed to create album.");
    //   }
    const token = "Bearer " + localStorage.getItem('token')
    const albumToSend = Album.fromJS(formData);
    const response = await apiClient.album(token, albumToSend);//  .addAlbum(albumToSend);
    console.log(response);
    
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <div>
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Album
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddAlbum;