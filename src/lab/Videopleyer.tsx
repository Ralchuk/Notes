import videoSrc from "../../img/12099242_1920_1080_30fps.mp4";

export default function Videopleyer() {
  const videoRef = (node: HTMLVideoElement | null) => {
    if (node) {
      console.log("mounted");
    } else {
      console.log("unmounted");
    }
  };
  return (
    <div>
      <video ref={videoRef} src={videoSrc} autoPlay muted loop></video>
    </div>
  );
}
