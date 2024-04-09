// src/components/Homepage.js
import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "../../loader.css"
import VideoRecorder from "./VideoRecord";
// import { data } from "../data/data";
import MusicPlayer from "./MusicPlayer";
import VideoStream from "./VideoStream";
const Home = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [emotion, setEmotion] = useState("")
  const [musicRecommendations, setMusicRecommendations] = useState([]);
  const [loading, setLoading] = useState(false)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    fetchMusicRecommendations(imageSrc);
  }, [webcamRef]);

  const fetchMusicRecommendations = async (imageSrc) => {
    // Call your music recommendation API here
    try {
      const response = await axios.post("http://localhost:5173/home", {
        imageSrc,
      });
      // setMusicRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
    }
  };

  return (
    <div className="bg-black ">
      <Navbar />
      <div className="flex flex-col items-center justify-center  bg-black text-white">
        <h1 className="text-4xl font-bold my-10">
          Camera Music Recommendations
        </h1>
        <div>
          {/* <VideoRecorder /> */}
          <VideoStream {...{music:musicRecommendations, setMusic:setMusicRecommendations, setEmotion: setEmotion, setLoading:setLoading}} />
        </div>
        {/* <button
          onClick={capture}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Capture Image
        </button>
        {imageSrc && (
          <div className="mt-8">
            <img src={imageSrc} alt="Captured" className="rounded-lg" />
          </div>
        )} */}
        {/* {musicRecommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Music Recommendations:</h2>
            <ul>
              {musicRecommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )} */}
        <h2 className="text-2xl font-bold mb-4 text-white">
             Emotion: {emotion}
            </h2>
            {loading && (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)}
        {musicRecommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Music Recommendations:
            </h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 max-w-7xl mx-auto gap-4 py-4">
              {musicRecommendations.map((recommendation, index) => {
                console.log(recommendation)
                 return <MusicPlayer key={index} item={recommendation} />
})}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
