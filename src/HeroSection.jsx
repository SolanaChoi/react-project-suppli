import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      navigate(`/welcome?name=${encodeURIComponent(nickname)}`);
    }
  };

  return (
    <section className="hero">
      <div className="overlay">
        <h1 className="heroTitle">Support Your Playlist Now!</h1>
        <form className="heroForm"onSubmit={handleSubmit}>
          <input
            className="heroInput"
            type="text"
            placeholder="Put your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="heroButton" type="submit">GO!</button>
        </form>
      </div>
    </section>
  );
}

export default HeroSection;
