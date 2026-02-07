import asyncio
import traceback

from bson import ObjectId

from app import db as database
from app.gemini_client import research_topic, generate_script
from app.tts_client import synthesize_line
from app.audio_stitcher import stitch_audio


async def update_status(episode_id: ObjectId, status: str, extra: dict | None = None) -> None:
    update = {"$set": {"status": status}}
    if extra:
        update["$set"].update(extra)
    await database.db["episodes"].update_one({"_id": episode_id}, update)


async def generate_episode(episode_id: ObjectId) -> None:
    try:
        doc = await database.db["episodes"].find_one({"_id": episode_id})
        if not doc:
            return

        topic = doc["topic"]

        # Step 1: Research
        await update_status(episode_id, "researching")
        research = await research_topic(topic)
        await update_status(episode_id, "researching", {"research_notes": research})

        # Step 2: Script generation
        await update_status(episode_id, "scriptwriting")
        script = await generate_script(topic, research)
        await update_status(episode_id, "scriptwriting", {"script": script})

        # Step 3: TTS for each line
        await update_status(episode_id, "generating_audio")
        segments = []
        for line in script:
            audio_bytes = await asyncio.to_thread(
                synthesize_line, line["speaker"], line["text"]
            )
            segments.append({"speaker": line["speaker"], "audio": audio_bytes})

        # Step 4: Stitch audio
        await update_status(episode_id, "stitching")
        filename = str(episode_id)
        file_path, duration = await asyncio.to_thread(stitch_audio, segments, filename)
        audio_url = f"/static/audio/{filename}.mp3"

        # Step 5: Mark completed
        await update_status(episode_id, "completed", {
            "audio_filename": f"{filename}.mp3",
            "audio_url": audio_url,
            "duration_seconds": duration,
        })

    except Exception as exc:
        error_msg = f"{type(exc).__name__}: {exc}\n{traceback.format_exc()}"
        try:
            await update_status(episode_id, "failed", {"error": error_msg})
        except Exception:
            print(f"Failed to update episode {episode_id} status to failed: {exc}")
