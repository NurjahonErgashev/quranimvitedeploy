import { useRef, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useStorage } from "../../utils/storage/storage";
import styles from "./index.module.scss";

export default function Player(): JSX.Element {
  const audio = useStorage((state) => state.audio);
  const setAudio = useStorage((state) => state.setAudio);
  const plusAudio = useStorage((state) => state.plusAudio);
  const audioRef = useRef<HTMLAudioElement>(null);
  const author = useStorage((state) => state.author);
  const setStatus = useStorage((state) => state.setStatus);
  const status = useStorage((state) => state.status);

  useEffect(() => {
    setInterval(() => {
      if (
        audioRef.current?.currentTime == audioRef.current?.duration &&
        audio != 0
      ) {
        plusAudio();
      }
    }, Number(audioRef.current?.currentTime) - 1);
  }, [audioRef.current?.currentTime]);

  if (status.status == 'pause') {
    audioRef.current?.pause()
  }else{
    
    audioRef.current?.play()
  }

  useEffect(() => {
    if (audio != 0) {
      setStatus(Number(audio), "play");
      console.log(status, "status");
    }
  }, [audio]);
  return audio != 0 ? (
    <div className={styles.Player}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {audio == 1 ? (
            <Button variant="contained" disabled>
              {" "}
              previous{" "}
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setAudio(audio - 1)}>
              {" "}
              previous{" "}
            </Button>
          )}

          <audio
            src={`https://cdn.islamic.network/quran/audio/128/${author}/${audio}.mp3`}
            controls
            ref={audioRef}
            preload="auto"
            autoPlay
          ></audio>
          {audio < 6236 ? (
            <Button variant="contained" onClick={() => setAudio(audio + 1)}>
              {" "}
              next{" "}
            </Button>
          ) : (
            <Button variant="contained" disabled>
              {" "}
              next{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
