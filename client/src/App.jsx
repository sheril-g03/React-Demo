import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const API_URL = 'http://localhost:5000/api/items';

  // Fetch existing items from MongoDB Atlas when component loads
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Submit a new item to Node/MongoDB Atlas
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems([newItem, ...items]); // Update UI state immediately
        setName('');
        setDescription('');
      }
    } catch (err) {
      console.error('Failed to save item:', err);
    }
  };

  return (
    <div  >
      <h2>Add Item to MongoDB Atlas</h2>
      <form onSubmit={handleSubmit}  >
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Item Name" 
          required 
           
        />
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
           
        />
        <button type="submit"  >
          Save to Atlas
        </button>
      </form>

      <h3>Saved Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
