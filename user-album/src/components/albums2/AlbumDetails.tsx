import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Album } from "../../api/client";
import { useApiClient } from "../../contexts/ApiClientContext";

const AlbumDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiClient = useApiClient();
    const token = "Bearer "+ localStorage.getItem('token')
  
    useEffect(() => {
      const fetchAlbum = async () => {
        try {
          // const response = apiClient.
          setAlbum(response.data);
        } catch (err) {
          setError('Failed to load album details.');
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        fetchAlbum();
      }
    }, [id]);
  
    if (loading) return <p>Loading album details...</p>;
    if (error) return <p>{error}</p>;
    if (!album) return <p>Album not found.</p>;
  
    return (
      <div>
        <h2>{album.title}</h2>
        {album.description && <p>{album.description}</p>}
        <p><strong>Created:</strong> {new Date(album.createdAt!).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(album.updatedAt!).toLocaleString()}</p>
      </div>
    );
}

export default AlbumDetails;