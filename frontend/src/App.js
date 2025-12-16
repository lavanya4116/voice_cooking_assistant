function App() {
  const handleClick = async () => {
    const res = await fetch("http://127.0.0.1:8000/");
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Voice Cooking Assistant</h1>
      <button onClick={handleClick}>
        Call Backend
      </button>
    </div>
  );
}

export default App;
