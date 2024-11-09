import { useRef, useState } from "react";
import s from "./ModalImg.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AvatarEditor from "react-avatar-editor";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  setCroppedImg: React.Dispatch<React.SetStateAction<string>>;
  setNoImg: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalImg = (props: Props) => {
  const { setModal, image, setCroppedImg, setNoImg } = props;
  const [zoom, setZoom] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();

      const imageDataURL = canvas.toDataURL("image/png");
      setCroppedImg(imageDataURL);
      setNoImg(false);
      setModal(false);
    }
  };
  return (
    <div className={s.modal}>
      <div className={s.container}>
        <IoIosCloseCircleOutline
          className={s.close}
          onClick={() => {
            setModal(false);
          }}
        />
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={350}
          height={350}
          border={50}
          color={[234, 234, 234, 0.8]}
          style={{
            border: "2px solid #ddd",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgb(214, 214, 214)",
          }}
          scale={zoom}
          rotate={0}
        />
        <div className={s.block}>
          <button
            className={s.button}
            onClick={() => {
              setZoom(zoom - 0.1);
            }}>
            -
          </button>
          <button
            className={s.button}
            onClick={() => {
              setZoom(zoom + 0.1);
            }}>
            +
          </button>
        </div>
        <div className={s.block}>
          <button className={s.button} onClick={handleSave}>
            Обрезать изображения
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalImg;
