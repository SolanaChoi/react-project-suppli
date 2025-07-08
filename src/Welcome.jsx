import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!artist.trim() || !track.trim()) return;
    setLoading(true);
    setRecommendations([]);

    try {
      const response = await fetch("http://localhost:5001/api/recommend", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ artist, track }),
      });
        const data = await response.json();
        let parsed = JSON.parse(data.recommendations);
        console.log("recommendations 문자열:", data.recommendations);
        
        if (!Array.isArray(parsed) && parsed.songs){
            parsed = parsed.songs;
        } else if (!Array.isArray(parsed) && parsed.data) {
            parsed = parsed.data;
        } 
        
        setRecommendations(parsed);

    } catch (err){
        console.error('요청 or 파싱 중 에러:',err)
        alert('처리 중 문제 발생')
    }finally {
      setLoading(false);
    }
  }

  return (
    <section className="welcomeSection">
        <div className="welcomeContainer">
            <h2 className="welcomeTitle"> 반갑습니다. {name}님! 좋아하는 곡을 입력하세요.
                <br/>비슷한 곡 5개를 추천해드릴게요 🎧</h2>
            <div className="guideCard">
            🎵 아티스트명과 곡명을 최대한 정확하게 입력하세요.
             <br/>
            영어는 영어로, 철자와 띄어쓰기를 가능한 반영해주세요!
             <br />
            <br />
            <strong>예시 - Whitney Houston / Run to You</strong>
        </div>

        <form className="welcomeForm" onSubmit={handleSubmit}>
          <input
              className="heroInput"
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="아티스트 이름"
              />
            <input
              className="heroInput"
              type="text"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              placeholder="곡 제목"
          />
          <button className="heroButton" type="submit">추천받기</button>
        </form>

        {loading && (
          <div className="loadingSpinner">
           <span className="l">l</span>
           <span className="o">o</span>
           <span className="a">a</span>
           <span className="d">d</span>
           <span className="i">i</span>
           <span className="n">n</span>
           <span className="g">g</span>
           <span className="dot1">.</span>
           <span className="dot2">.</span>
           <span className="dot3">.</span>
          </div>
          )}

        {recommendations.length > 0 && (
            <ul className="resultList">
            {recommendations.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
            </ul>
        )}
        </div>
    </section>
  );
}

export default Welcome;
