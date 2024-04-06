import React, { useState, useEffect, useRef } from "react";

const VideoStream = ({music, setMusic}) => {
  const [stream, setStream] = useState([]);
  const [isRecorderSet, setIsRecorderSet] = useState(false);
  const videoRef = useRef()
  const recorderRef = useRef()

  const sendStream = async (data) => {
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
    setMusic(data)
  };

  

  const handleStartRecoding = () =>{
    recorderRef.current.start()
  }

  const handleSendClick = () =>{
    recorderRef.current.stop()
    
  }
  useEffect(() => {

    const getStream = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      console.log(mediaStream, mediaStream.getVideoTracks())
      // setStream(mediaStream);
      if(videoRef.current){
        // videoRef.current.srcObject = mediaStream
        recorderRef.current = new MediaRecorder(mediaStream)
        recorderRef.current.ondataavailable = async e => {
          console.log("Got The Strem", e.data,  stream.length)
          // sendStream(new Blob(stream))
          setStream((initVal) => [...initVal , e.data])
        }
        recorderRef.current.onstop  = () =>{
          sendStream(new Blob(stream))
        }
        
      }
      setIsRecorderSet(true)
      
    };

    let interval = null
    interval = setInterval(() => {
      console.log(recorderRef.current)
      if(recorderRef.current && recorderRef.current.state == 'recording'){
        console.log("Auto Sending Video  ")

        recorderRef.current.requestData()
      }
    }, 3000);


    if(!isRecorderSet){
      getStream()
       

    }else{
      let blob = new Blob(stream) 
      setIsRecorderSet(false)
      videoRef.current.srcObject = null
      let url = URL.createObjectURL(blob)
      videoRef.current.src = url;
    }


    return () => clearInterval(interval);
    
  }, [stream]);


  return (
    <div>
      <video ref={videoRef} srcObject={stream} autoPlay controls />
      <button clasName='bg-indigo-500 inline-block text-xs text-white py-2 px-4 hover:blue-900 focus:outline-none'
       onClick={() => handleSendClick()}>Send Video</button>
      {/* <button onClick={getStream}>Start Video</button> */}
      <button style={{padding:'0.5rem', margin:"0.5rem", backgroundColor: 'blue', borderRadius:'0.3rem'}} onClick={handleStartRecoding}>Start recording</button>
    </div>
  );
};

export default VideoStream;