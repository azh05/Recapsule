# PodcastGPT

AI-generated two-host podcasts about any topic. Give it a subject and it researches, writes a script, and produces a full audio episode with two distinct voices.

## Tech Stack

- **FastAPI** — async web framework
- **MongoDB Atlas** (Motor) — document storage
- **Google Gemini 2.5 Pro** — research & script generation
- **ElevenLabs** — text-to-speech with two voices
- **pydub** — audio stitching

## Prerequisites

- Python 3.10+
- [uv](https://docs.astral.sh/uv/) package manager
- FFmpeg (`brew install ffmpeg` on macOS, `apt-get install ffmpeg` on Linux)
- MongoDB Atlas cluster (free tier works)
- Google Gemini API key
- ElevenLabs API key

## Setup

```bash
# Clone and install dependencies
git clone <repo-url> && cd PodcastGPT
uv sync

# Configure environment
cp .env.example .env
# Edit .env with your API keys and MongoDB URI
```

### Required environment variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Gemini API key |
| `ELEVENLABS_API_KEY` | ElevenLabs API key |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Database name (default: `podcastgpt`) |
| `ELEVENLABS_VOICE_ID_HOST_A` | Voice for Host A (default: George) |
| `ELEVENLABS_VOICE_ID_HOST_B` | Voice for Host B (default: Aria) |

## Running

```bash
uv run uvicorn app.main:app --reload --port 8000
```

API docs available at [http://localhost:8000/docs](http://localhost:8000/docs).

## API Endpoints

### `POST /episodes`

Create a new podcast episode. Kicks off background generation.

```bash
curl -X POST http://localhost:8000/episodes \
  -H "Content-Type: application/json" \
  -d '{"topic": "The Moon Landing"}'
```

Returns the episode with `status: "pending"` and an `id` to poll.

### `GET /episodes/{id}`

Poll for episode status. Status progresses through:

`pending` → `researching` → `scriptwriting` → `generating_audio` → `stitching` → `completed`

If something goes wrong, status becomes `failed` with an `error` field.

```bash
curl http://localhost:8000/episodes/<episode-id>
```

Once `status` is `completed`, the `audio_url` field contains the path to the MP3.

### `GET /episodes`

List all episodes, newest first. Supports `limit` (default 20) and `offset` query params.

```bash
curl "http://localhost:8000/episodes?limit=10&offset=0"
```

### `GET /health`

Health check.

## How It Works

1. **Research** — Gemini searches the web and compiles key facts, timeline, and notable details
2. **Script** — Gemini writes a natural dialogue between two hosts (15-25 exchanges)
3. **Voice** — ElevenLabs generates speech for each line with distinct voices
4. **Stitch** — pydub combines all audio segments with natural pauses into a single MP3
