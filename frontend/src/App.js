import { useState } from "react";

function App() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      setAudioChunks((prev) => [...prev, event.data]);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setAudioChunks([]);
  };

  const stopRecording = async () => {
    mediaRecorder.stop();

    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "voice.webm");

    const res = await fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert("Uploaded: " + data.filename);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Voice Cooking Assistant</h1>

      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording} style={{ marginLeft: "10px" }}>
        Stop Recording
      </button>
    </div>
  );
}

export default App;
