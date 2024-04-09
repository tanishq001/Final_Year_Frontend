import React, { useState, useEffect, useRef } from "react";


const VideoStream = ({music, setMusic, setEmotion,setLoading}) => {
  const [stream, setStream] = useState([]);
  const [isRecorderSet, setIsRecorderSet] = useState(false);
  const [url, setUrl] = useState('')
  const [ws ,setWS ]= useState(null)
  
  const wsRef = useRef()
  const videoRef = useRef()
  const recorderRef = useRef()

  const sendStream = async (data) => {
    setLoading(true)
    console.log("data=", data)
    const response = await fetch("http://localhost:8000/api/video", {
      method: "POST",
      headers:{
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=video.mp4",
      },
      body: data,
    });
    if (response.ok) {
      console.log("Video stream sent successfully");
    } else {
      console.error("Failed to send video stream");
    }
    data = await response.json()
    setMusic(data.music_recomendations)
    setEmotion(data.emotion)
  };

  useEffect(()=>{
    if(music){
      setLoading(false)
    }
  }, [music])

  

  const handleStartRecoding = () =>{
    if(recorderRef.current)
    recorderRef.current.start(5000)
  }

  const handleSendClick = () =>{
    let data = new Blob(stream, { type: "video/mp4" });
    sendStream(data)
  }

  useEffect(() => {

    const getStream = async () => {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = mediaStream
        let _recorder = new MediaRecorder(mediaStream)

        _recorder.onstart = () =>{
          console.info("Recorder Start Sucessfully")
        }
        
        _recorder.ondataavailable = (e) =>{
          setStream((prev) => [...prev, e.data])
          
        }

        _recorder.onstop = () =>{
          console.info("Recorder Stoper Successfully")
        }
        _recorder.onerror = (e) => console.log("Error has occured", e) 

        console.log("Recored Created", _recorder)
        recorderRef.current = _recorder

    };


    if(!recorderRef.current)
      getStream()


  }, []);

  const handleStop = () =>{
    recorderRef.current.stop()
    let data = new Blob(stream, { type: "video/mp4" });
    // sendStream(data)
    const videoUrl = URL.createObjectURL(data);
    videoRef.current.srcObject = null
    videoRef.current.src = videoUrl
  }

  return (
    <div>
      {stream.length}
      { <video ref={videoRef} autoPlay controls />} 
      <button className='bg-indigo-500 inline-block text-xs text-white py-2 px-4 hover:blue-900 focus:outline-none'
       onClick={() => handleSendClick()}>Send Video</button>
      <button  className='bg-indigo-500 inline-block text-xs text-white py-2 px-4 hover:blue-900 focus:outline-none' onClick={handleStartRecoding}>Start recording</button>
      <button  className='bg-red-500 inline-block text-xs text-white py-2 px-4 hover:blue-900 focus:outline-none' onClick={handleStop}>Stop recording</button>

      {/* <button onClick={getStream}>Start Video</button> */}
      
    </div>
  );
};

export default VideoStream;