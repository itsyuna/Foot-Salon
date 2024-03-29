import styled, { css } from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { dbService, storageService } from "../../firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../store";
import { PhotoListItems, fetchPhotos } from "../../store/photos";
import { getDate } from "../../utils/date";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import { ErrorText } from "../../components/pages/SignUp/SignUp";
import { media } from "../MediaQuery/mediaQuery";
import { backgroundImg } from "../../styles/global-style";

const footballPitch = `${process.env.PUBLIC_URL}/assets/images/football-pitch.jpg`;

const ModalBackgroundImage = styled.section<{ targetPhotoId: string }>`
  z-index: 999;
  position: absolute;
  width: 80vw;
  height: 67vh;
  top: 51.5%;
  left: 50%;
  transform: translate(-50%, -49.5%);

  ${({ targetPhotoId }) =>
    targetPhotoId &&
    css`
      background-image: url(${footballPitch});
      background-position: 50% 50%;
      background-size: 90vw 80vh;
    `}

  ${media.small`
    background-image: url(${backgroundImg});
    background-repeat: initial;
    background-size: auto;
    
    width: 100vw;
    height: 100vh;
    top: 51%;
  `}

  ${media.medium`
    background-image: url(${backgroundImg});
    background-repeat: initial;
    background-size: auto;
  
    width: 100vw;
    height: 100vh;
    top: 50%;
  `}
`;

const ModalSection = styled.section`
  font-family: "Bebas Neue", sans-serif;
  font-weight: 700;
  border: 5px solid #f0edd4;
  background-color: #f9fbe7;
  width: 52vw;
  height: 52vh;
  margin: 0 auto;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  input {
    font-size: 0.8rem;
  }

  ${media.small`
    width: 90vw;
    height: 85vh;
    top: 48%;

    button,input,h4 {
      font-size: 0.6rem;
    }

    p {
      font-size: 0.5rem;
    }
  `}

  ${media.medium`
    width: 90vw;
    height: 80vh;
    top: 48%;
  
    button,input,p,h4 {
      font-size: 0.7rem;
    }
  `}
`;

const CloseButtonBox = styled.section`
  font-family: "Do Hyeon", sans-serif;
  text-align: right;
`;

const KeywordBox = styled.section`
  margin: 1rem 0;
  width: 100%;
  height: 4vh;
  padding-left: 0.5rem;

  display: flex;
  justify-content: left;
  align-items: center;

  ${media.small`
   padding-left: 0;

   input {
    height: 2vh;
   }

   display: block;
   justify-content: center;
   margin: 2rem 0 3rem;

   p {
    text-align:center;
   }
  `}

  ${media.medium`
   input {
    width: 30%;
    height: 2.5vh;
   }
  `}
`;

const InputBox = styled.section`
  margin-right: 1rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  ${media.small`
    width: 100%;
  `}
`;

const KeywordText = styled.p<{ errorCheck: boolean }>`
  font-size: 0.8rem;
  margin-right: 0.5rem;

  ${({ errorCheck }) =>
    errorCheck &&
    css`
      color: red;
    `}
`;

const AttachmentBox = styled.section`
  display: flex;
  align-items: center;
  padding-left: 1rem;

  input {
    width: 20%;
    height: 100%;
  }

  p {
    margin: 0;
  }

  ${media.small`
    padding-left: 0.5rem;

    input {
      width: 50%;
    }
  `}

  ${media.medium`
    padding-left: 0.7rem;

    input {
      width: 30%;
    }
  `}
`;

const PreviewPhoto = styled.section`
  width: 100%;
  height: 30vh;
  margin-top: 1rem;
  text-align: center;

  h4 {
    margin: 0 1rem 0.5rem 0;
  }

  ${media.small`
    height: 50vh;
  `}

  ${media.medium`
    height: 55vh;
  `}
`;

const UploadImageBox = styled.section`
  width: 30%;
  height: 90%;
  margin: 0 auto;

  ${media.small`
    width: 80%;
  `}

  ${media.medium`
    width: 70%;
  `}
`;

const UploadImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ButtonBox = styled.section`
  width: 100%;
  height: 3vh;
  text-align: center;
  margin-top: 1rem;

  button {
    margin: 0;
  }
`;

interface ModalProps {
  targetPhoto: PhotoListItems;
  setOpenEditorModal: Dispatch<SetStateAction<boolean>>;
  setIsNewPost?: Dispatch<SetStateAction<boolean>>;
}

interface PhotoFormData {
  keyword1: string;
  keyword2: string;
  keyword3: string;
}

type UploadFile = string | ArrayBuffer | null | undefined;

const PhotoEditorModal = ({
  targetPhoto,
  setOpenEditorModal,
  setIsNewPost,
}: ModalProps) => {
  const userId = useAppSelector((state) => state.user.uid);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const [attachment, setAttachment] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhotoFormData>();

  const closeModal = () => {
    setOpenEditorModal(false);
    setIsNewPost && setIsNewPost(false);
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files !== null) {
      const theFile = files[0];
      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const uploadFile: UploadFile = finishedEvent.target?.result;

        if (uploadFile) {
          setAttachment(uploadFile.toString());
        }
      };
      reader.readAsDataURL(theFile);
    }
  };

  const dispatch = useAppDispatch();

  async function onSubmit(data: PhotoFormData) {
    if (attachment === "") {
      toast.warn("사진을 첨부해 주세요 :) ");
      return;
    }

    if (!data.keyword1.trim().length) {
      toast.warn("비어있는 글자는 입력할 수 없습니다.");
      return;
    }

    if (window.confirm("제출하시겠습니까?")) {
      let fileURL = "";
      if (attachment !== "") {
        const fileRef = ref(storageService, `photos/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        fileURL = await getDownloadURL(response.ref);
      }

      const photoItems = {
        creatorId: userId,
        userNickname,
        createdAt: getDate(),
        keyword1: data.keyword1,
        keyword2: data.keyword2,
        keyword3: data.keyword3,
        dateTime:
          targetPhoto.id === ""
            ? Timestamp.now().seconds
            : targetPhoto.photo.dateTime,
        isEdit: targetPhoto.id === "" ? false : true,
        fileURL,
      };

      try {
        if (targetPhoto.id === "") {
          await addDoc(collection(dbService, "photos"), photoItems);
        } else {
          await updateDoc(
            doc(dbService, "photos", `${targetPhoto.id}`),
            photoItems
          );
        }

        targetPhoto.id
          ? toast.success("사진이 수정되었습니다 📸✨")
          : toast.success("사진이 기록되었습니다 📸✨");

        navigate("/photos");
        dispatch(fetchPhotos());
      } catch (error) {
        toast.error("오류가 발생했습니다 :(");
      }

      setOpenEditorModal(false);
      setIsNewPost && setIsNewPost(false);
    }
  }

  return (
    <ModalBackgroundImage targetPhotoId={targetPhoto?.id}>
      <ModalSection>
        <CloseButtonBox>
          <Button
            type="button"
            onClick={closeModal}
            backgroundColor="#FF78C4"
            border="#FF78C4"
            margin="0"
          >
            Close
          </Button>
        </CloseButtonBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <KeywordBox>
            <InputBox>
              <Controller
                control={control}
                defaultValue={targetPhoto.photo.keyword1}
                name="keyword1"
                rules={{
                  ...(targetPhoto.id === "" && {
                    required: "필수 입력 사항입니다.",
                  }),
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="키워드 1"
                    onChange={field.onChange}
                    defaultValue={targetPhoto.photo.keyword1}
                    width="30%"
                    height="3vh"
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={targetPhoto.photo.keyword2}
                name="keyword2"
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="키워드 2"
                    onChange={field.onChange}
                    defaultValue={targetPhoto.photo.keyword2}
                    width="30%"
                    height="3vh"
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={targetPhoto.photo.keyword3}
                name="keyword3"
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="키워드 3"
                    onChange={field.onChange}
                    defaultValue={targetPhoto.photo.keyword3}
                    width="30%"
                    height="3vh"
                  />
                )}
              />
            </InputBox>
            <KeywordText errorCheck={errors.keyword1 ? true : false}>
              *키워드를 1가지 이상 입력해 주세요.
            </KeywordText>
          </KeywordBox>
          <AttachmentBox>
            <input type="file" accept="image/*" onChange={fileChangeHandler} />
            {attachment === "" && (
              <ErrorText>파일을 선택해 주세요 :)</ErrorText>
            )}
          </AttachmentBox>
          <PreviewPhoto>
            <h4>🔻 미리보기</h4>
            {attachment && (
              <UploadImageBox>
                <UploadImage
                  src={attachment}
                  alt="Upload preview"
                ></UploadImage>
              </UploadImageBox>
            )}
          </PreviewPhoto>
          <ButtonBox>
            <Button type="submit" backgroundColor="#FFFD8C" border="#FBCB0A">
              업로드
            </Button>
          </ButtonBox>
        </form>
      </ModalSection>
    </ModalBackgroundImage>
  );
};

export default PhotoEditorModal;
