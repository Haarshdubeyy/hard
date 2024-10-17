import React, { useState, useEffect, useCallback } from 'react';



const App = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
      );
      const data = await response.json();
      setCats(prevCats => [...prevCats, ...data]);
    } catch (err) {
      setError('Failed to fetch cats. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f4f0]">

      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="text-center">
            <h1 className="font-poppins text-4xl font-bold text-gray-800 mb-2">
              Cat Gallery
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gray-300"></div>
              <span className="font-poppins text-sm text-gray-500 uppercase tracking-widest">
              All the cats here
              </span>
              <div className="h-px w-12 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {loading && (
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <p className="font-poppins text-gray-600">Loading.....</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="font-poppins text-red-600">{error}</p>
            </div>
          </div>
        )}

        {!loading && cats.length === 0 && (
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-lg">
              <p className="font-poppins text-gray-600">No cats available at the moment.</p>
            </div>
          </div>
        )}


        <div className="flex flex-col items-center gap-8">
          {cats.map(cat => (
            <div
              key={cat.id}
              className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={cat.url}
                  alt="Cat"
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center">
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default App;