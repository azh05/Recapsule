from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    google_api_key: str = ""
    elevenlabs_api_key: str = ""
    elevenlabs_voice_id_host_a: str = "JBFqnCBsd6RMkjVDRZzb"
    elevenlabs_voice_id_host_b: str = "9BWtsMINqrJLrRacOk9x"
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "podcastgpt"
    audio_dir: str = "static/audio"

    model_config = {"env_file": ".env"}


settings = Settings()
