import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.sampleapis.com/movies/classic");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>CinemaKampus</h1>
        
        <p className="student-info">Farel ALiffian Farkhan - 1003240015</p>
        
        <input
          type="text"
          placeholder="Cari film kesukaanmu..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      {loading && <div className="loading">loading...</div>}

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.posterURL}
              alt={movie.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
              }}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
          </div>
        ))}

        {!loading && filteredMovies.length === 0 && (
          <p className="no-result">Film tidak ditemukan.</p>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2026 CinemaKampus. UAS Frontend</p>
      </footer>

    </div>
  );
}

export default App;
