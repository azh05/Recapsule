from elevenlabs import ElevenLabs

from app.config import settings

_client: ElevenLabs | None = None


def _get_client() -> ElevenLabs:
    global _client
    if _client is None:
        _client = ElevenLabs(api_key=settings.elevenlabs_api_key)
    return _client


VOICE_MAP = {
    "host_a": settings.elevenlabs_voice_id_host_a,
    "host_b": settings.elevenlabs_voice_id_host_b,
}


def synthesize_line(speaker: str, text: str) -> bytes:
    voice_id = VOICE_MAP.get(speaker, VOICE_MAP["host_a"])
    audio_iterator = _get_client().text_to_speech.convert(
        voice_id=voice_id,
        text=text,
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )
    return b"".join(audio_iterator)
