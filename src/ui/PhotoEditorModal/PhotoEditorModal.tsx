import styled, { css } from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { dbService, storageService } from "../../firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../store";
import { PhotoListItems } from "../../store/photos";
import { getDate } from "../../utils/date";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import Button from "../../compoents/atoms/Button";
import Input from "../../compoents/atoms/Input";
import { ErrorText } from "../../compoents/pages/SignUp/SignUp";

const ModalWrapper = styled.section`
  font-family: "Bebas Neue", sans-serif;
  font-weight: 700;
  border: 3px solid #f0edd4;
  background-color: #f9fbe7;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  z-index: 999;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CloseButtonBox = styled.div`
  text-align: right;
`;

const KeywordBox = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 4vh;
  display: flex;
  justify-content: space-between;
`;

const KeywordText = styled.div<{ errorCheck: boolean }>`
  line-height: 4vh;
  font-size: 0.8rem;

  ${({ errorCheck }) =>
    errorCheck &&
    css`
      color: red;
    `}
`;

const AttachmentBox = styled.div`
  display: flex;
  p {
    margin: 0.2rem 0;
  }
`;

const PreviewPhoto = styled.div`
  width: 100%;
  height: 30vh;
  margin-top: 1rem;
  text-align: center;
`;

const UploadImageBox = styled.div`
  width: 100%;
  height: 100%;
`;

const UploadImage = styled.img`
  width: 20vw;
  height: 25vh;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 5vh;
  text-align: center;

  button {
    margin: 0;
  }
`;

interface ModalProps {
  openEditorModal: Dispatch<SetStateAction<boolean>>;
  isEdit: Dispatch<SetStateAction<boolean>>;
  targetPhoto: PhotoListItems;
}

interface PhotoFormData {
  keyword1: string;
  keyword2: string;
  keyword3: string;
}

type UploadFile = string | ArrayBuffer | null | undefined;

const PhotoEditorModal = ({
  openEditorModal,
  targetPhoto,
  isEdit,
}: ModalProps) => {
  const [attachment, setAttachment] = useState("");

  const userId = useAppSelector((state) => state.user.uid);
  const userNickname = useAppSelector((state) => state.user.nickname);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhotoFormData>();

  const closeModal = () => {
    openEditorModal(false);
    isEdit(false);
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

  async function onSubmit(data: PhotoFormData) {
    if (attachment === "") {
      alert("사진을 첨부해주세요 :) ");
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
        dateTime: Timestamp.now().seconds,
        fileURL,
      };

      try {
        if (targetPhoto.id !== "") {
          await updateDoc(
            doc(dbService, "photos", `${targetPhoto.id}`),
            photoItems
          );
        } else {
          await addDoc(collection(dbService, "photos"), photoItems);
        }

        openEditorModal(false);
        alert("작성 완료!");
        navigate("/photos");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ModalWrapper>
      <CloseButtonBox>
        <Button
          type="button"
          onClick={closeModal}
          backgroundColor="pink"
          margin="0"
        >
          Close
        </Button>
      </CloseButtonBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <KeywordBox>
          <Controller
            control={control}
            defaultValue={targetPhoto.photo.keyword1}
            name="keyword1"
            rules={{
              ...(targetPhoto.id === "" && {
                required: "필수 입력사항입니다.",
              }),
            }}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="키워드 1"
                onChange={field.onChange}
                defaultValue={targetPhoto.photo.keyword1}
                width="20%"
                height="3.5vh"
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
                width="20%"
                height="3.5vh"
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
                width="20%"
                height="3.5vh"
              />
            )}
          />
          <KeywordText errorCheck={errors.keyword1 ? true : false}>
            *키워드를 1가지 이상 입력해주세요.
          </KeywordText>
        </KeywordBox>
        <AttachmentBox>
          <input type="file" accept="image/*" onChange={fileChangeHandler} />
          {attachment === "" && <ErrorText>파일을 선택해주세요 :)</ErrorText>}
        </AttachmentBox>
        <PreviewPhoto>
          <div>🔻 썸네일 미리보기</div>
          {attachment && (
            <UploadImageBox>
              <UploadImage src={attachment} alt="attachment"></UploadImage>
            </UploadImageBox>
          )}
        </PreviewPhoto>
        <ButtonBox>
          <Button type="submit" backgroundColor="pink" border="red">
            업로드
          </Button>
        </ButtonBox>
      </form>
    </ModalWrapper>
  );
};

export default PhotoEditorModal;