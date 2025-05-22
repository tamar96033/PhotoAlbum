import { useNavigate } from "react-router-dom";
import { Album } from "../../api/client";
import { useEffect, useState } from "react";
import { useApiClient } from "../../contexts/ApiClientContext";

const ShowAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const navigate = useNavigate();
    const apiClient = useApiClient();

    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const token = localStorage.getItem('token')
          
          const result = await apiClient.albumAll(token!);
          
          setAlbums(result);
        } catch (error) {
          console.error("Failed to fetch albums", error);
        }
      };
  
      fetchAlbums();
    }, []);
  
    const handleAlbumClick = (albumId: number) => {
      navigate(`/albums/${albumId}`);
    };
  
    return (
      <div>
        <h2>Albums</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => handleAlbumClick(album.id)}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                cursor: "pointer",
                width: "200px",
              }}
            >
              <h3>{album.title}</h3>
              <p>{album.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ShowAlbums;