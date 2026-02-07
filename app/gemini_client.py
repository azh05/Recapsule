import json

from google import genai
from google.genai import types

from app.config import settings

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(api_key=settings.google_api_key)
    return _client


RESEARCH_SYSTEM_PROMPT = (
    "You are a podcast researcher. Given a topic, find key facts, anecdotes, "
    "timeline of events, notable figures, surprising details, and controversies. "
    "Organize your findings clearly with headers. Be thorough but concise."
)

SCRIPT_SYSTEM_PROMPT = """\
You are a podcast script writer. Write a conversational dialogue between two hosts:
- HOST_A: The main narrator. Enthusiastic, knowledgeable, drives the story forward.
- HOST_B: The curious co-host. Asks great questions, reacts with surprise, adds humor.

Rules:
- Write 15-25 exchanges total (aiming for a 3-5 minute episode).
- Make it feel natural: use filler words occasionally, interruptions, reactions like "Wow" or "No way".
- HOST_A explains and storytells; HOST_B asks follow-ups and makes relatable comparisons.
- Start with a hook, build through the middle, end with a memorable takeaway.

Return ONLY a JSON array of objects with "speaker" and "text" fields.
Example: [{"speaker": "host_a", "text": "Welcome back..."}, {"speaker": "host_b", "text": "So today..."}]
"""


async def research_topic(topic: str) -> str:
    response = await _get_client().aio.models.generate_content(
        model="gemini-3-pro-preview",
        contents=f"Research this topic for a podcast episode: {topic}",
        config=types.GenerateContentConfig(
            system_instruction=RESEARCH_SYSTEM_PROMPT,
            temperature=0.3,
            tools=[types.Tool(google_search=types.GoogleSearch())],
        ),
    )
    return response.text


async def generate_script(topic: str, research: str) -> list[dict]:
    prompt = (
        f"Topic: {topic}\n\n"
        f"Research notes:\n{research}\n\n"
        "Now write the podcast script as a JSON array."
    )
    response = await _get_client().aio.models.generate_content(
        model="gemini-3-pro-preview",
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SCRIPT_SYSTEM_PROMPT,
            temperature=0.7,
            response_mime_type="application/json",
        ),
    )
    try:
        script = json.loads(response.text)
    except (json.JSONDecodeError, TypeError) as exc:
        raise ValueError(f"Gemini returned invalid JSON: {exc}") from exc

    if not isinstance(script, list) or not all(
        isinstance(line, dict) and "speaker" in line and "text" in line
        for line in script
    ):
        raise ValueError("Gemini returned unexpected script format")

    return script
