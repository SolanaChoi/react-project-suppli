from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
client = OpenAI()

client.api_key = os.getenv("OPENAI_API_KEY")   

@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    artist = data.get("artist", "").strip()
    track = data.get("track", "").strip()

    if not artist or not track:
        return jsonify({"error": "artist and track are required"}), 400

    user_input = f"{artist} - {track}"
    prompt = f''' '{user_input}''와 비슷한 노래를 5곡 추천해줘. 팝송을 입력하면 팝송으로 답하고, 한국노래를 입력하면 한국노래로 대답하도록해. 만약 한국 노래를 잘 모르겠으면, 웹검색을 이용해. 이 때, 반드시 아래 형식으로만 JSON 배열로 응답해. 설명이나 다른 키는 절대 포함하지 마. 형식 예시: ["아티스트 - 곡명", "아티스트 - 곡명", "아티스트 - 곡명", "아티스트 - 곡명", "아티스트 - 곡명"]'''

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        content = response.choices[0].message.content.strip()
        return jsonify({"recommendations": content})

    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
