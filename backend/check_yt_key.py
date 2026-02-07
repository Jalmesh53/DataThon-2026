import os
import requests
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def check_key():
    if not YOUTUBE_API_KEY or "your_" in YOUTUBE_API_KEY:
        print("❌ ERROR: YOUTUBE_API_KEY is missing or is the default placeholder in .env")
        return

    print(f"Testing Key via simple HTTP: {YOUTUBE_API_KEY[:10]}...")
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key={YOUTUBE_API_KEY}"
    
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        if response.status_code == 200:
            print("✅ SUCCESS: YouTube API Key is ACTIVE and Working!")
            print(f"Result Sample: {data['items'][0]['snippet']['title']}")
        else:
            print(f"❌ FAILED: Status Code {response.status_code}")
            print(f"Error Message: {data.get('error', {}).get('message', 'Unknown Error')}")
            print(f"Reason: {data.get('error', {}).get('errors', [{}])[0].get('reason', 'N/A')}")
            
    except Exception as e:
        print(f"❌ ERROR: Request failed. {e}")

if __name__ == "__main__":
    check_key()
