import styled, { css } from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { PhotoListItems } from "../../../store/photos";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "../../../firebase/config";

import Button from "../../atoms/Button";

const PhotoItemWrapper = styled.section<{ isModal: boolean }>`
  font-family: "Do Hyeon", sans-serif;
  width: 90%;
  height: auto;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;

  ${({ isModal }) =>
    isModal &&
    css`
      opacity: 0;
    `}
`;

const ItemList = styled.div`
  border: 2px solid lightBlue;
  width: 100%;
  margin-bottom: 1rem;
`;

const KeywordBox = styled.div`
  width: 100%;
  height: 2.5vh;
  display: flex;

  div {
    background-color: #c7f2a4;
    width: 30%;
    height: 2.5vh;
    line-height: 2.5vh;
    text-align: center;
    border-radius: 15px;
    margin-right: 1rem;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 30vh;
  margin: 1rem 0;

  position: relative;

  &:hover {
    cursor: pointer;

    img {
      opacity: 0.5;
    }

    div {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const ViewPhotoButtonBox = styled.div`
  left: 0px;
  top: 0px;
  width: 100%;
  position: absolute;
  text-align: right;
  visibility: hidden;
  opacity: 0;
`;

const ButtonBox = styled.div`
  left: 0px;
  top: 0px;
  width: 100%;
  position: absolute;
  margin-top: 30%;
  text-align: center;
  visibility: hidden;
  opacity: 0;
`;

const UserNicknameBox = styled.div`
  width: 100%;
  height: 2vh;
  margin-top: 0.5rem;

  span {
    color: #277bc0;
  }
`;

interface PhotoItemProps {
  data: PhotoListItems[];
  isModal: boolean;
  setOpenEditorModal: Dispatch<SetStateAction<boolean>>;
  setOpenPhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setTargetPhoto: Dispatch<SetStateAction<PhotoListItems>>;
}

const defaultPhotlist = {
  id: "",
  photo: {
    creatorId: "",
    userNickname: "",
    createdAt: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    dateTime: 0,
    fileURL: "",
  },
};

const PhotoList = ({
  data,
  isModal,
  setOpenEditorModal,
  setOpenPhotoModal,
  setIsEdit,
  setTargetPhoto,
}: PhotoItemProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [targetPost, setTargetPost] = useState<PhotoListItems>(defaultPhotlist);

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.uid);

  const isOwner = targetPost?.photo.creatorId === user;

  const updatePhotoHandler = () => {
    setIsEdit(true);
    setOpenEditorModal(true);
    targetPost && setTargetPhoto(targetPost);
  };

  const viewPhotoHandler = () => {
    if (isLoggedIn) {
      setOpenPhotoModal(true);
      targetPost && setTargetPhoto(targetPost);
    } else navigate("/login");
  };

  const deletePhotoHandler = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(dbService, "photos", `${targetPost?.id}`));

      await deleteObject(ref(storageService, targetPost?.photo.fileURL));

      targetPost && setTargetPhoto(targetPost);

      navigate("/photos");
      alert("삭제가 완료되었습니다.");
    }
  };

  return (
    <PhotoItemWrapper isModal={isModal}>
      {data.map((item, idx) => (
        <ItemList key={idx}>
          <KeywordBox>
            <div>{item.photo.keyword1}</div>
            {item.photo.keyword2 && <div>{item.photo.keyword2}</div>}
            {item.photo.keyword3 && <div>{item.photo.keyword3}</div>}
          </KeywordBox>
          <ImageBox
            onMouseEnter={() => setTargetPost(item)}
            onMouseLeave={() => setTargetPost(defaultPhotlist)}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <img
              src={item.photo.fileURL}
              alt="best-shot"
              width="100%"
              height="100%"
            ></img>
            <ViewPhotoButtonBox>
              <Button
                type="button"
                margin="0"
                height="2.5vh"
                onClick={viewPhotoHandler}
              >
                크게 보기🔍
              </Button>
            </ViewPhotoButtonBox>
            {isOwner && (
              <ButtonBox>
                <Button
                  type="button"
                  onClick={updatePhotoHandler}
                  backgroundColor="#FFF5E4"
                  border="#FFF5E4"
                >
                  수정하기
                </Button>
                <Button
                  type="button"
                  onClick={deletePhotoHandler}
                  backgroundColor="#FFD1D1"
                  border="#FFD1D1"
                >
                  삭제하기
                </Button>
              </ButtonBox>
            )}
          </ImageBox>
          <UserNicknameBox>
            By <span>{item.photo.userNickname}</span>
          </UserNicknameBox>
        </ItemList>
      ))}
    </PhotoItemWrapper>
  );
};

export default PhotoList;
