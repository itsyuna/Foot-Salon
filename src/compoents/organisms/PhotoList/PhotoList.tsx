import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store";
import { PhotoListItems, fetchPhotos } from "../../../store/photos";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "../../../firebase/config";

import Button from "../../atoms/Button";
import { defaultPhotolist } from "../../pages/Photos/Photos";
import ViewPhotoModal from "../../../ui/ViewPhotoModal";
import PhotoEditorModal from "../../../ui/PhotoEditorModal";

const PhotoItemWrapper = styled.article<WrapperProps>`
  font-family: "Do Hyeon", sans-serif;
  width: 90%;
  height: auto;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;

  ${({ isNewPost }) =>
    isNewPost &&
    css`
      opacity: 0;
    `}
`;

const ItemList = styled.section`
  border: 2px solid lightBlue;
  width: 100%;
  margin-bottom: 1rem;
`;

const KeywordBox = styled.header`
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
    overflow: auto;
  }
`;

const ImageBox = styled.section`
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

const UserNicknameBox = styled.footer`
  width: 100%;
  height: 2vh;
  margin-top: 0.5rem;

  span {
    color: #277bc0;
  }
`;

interface WrapperProps {
  openEditorModal: boolean;
  isNewPost: boolean;
}

interface PhotoItemProps {
  data: PhotoListItems[];
  isNewPost: boolean;
}

const PhotoList = ({ data, isNewPost }: PhotoItemProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [openEditorModal, setOpenEditorModal] = useState(false);

  const [targetPhoto, setTargetPhoto] =
    useState<PhotoListItems>(defaultPhotolist);
  const [targetPost, setTargetPost] =
    useState<PhotoListItems>(defaultPhotolist);

  const user = useAppSelector((state) => state.user.uid);
  const isOwner = targetPost?.photo.creatorId === user;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const updatePhotoHandler = () => {
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
      try {
        await deleteDoc(doc(dbService, "photos", `${targetPost?.id}`));

        await deleteObject(ref(storageService, targetPost?.photo.fileURL));

        navigate("/photos");
        toast.success("삭제 완료!");

        dispatch(fetchPhotos());
      } catch (error) {
        toast.error("오류가 발생했습니다 :(");
      }
    }
  };

  return (
    <>
      {openEditorModal && (
        <PhotoEditorModal
          targetPhoto={targetPhoto}
          setOpenEditorModal={setOpenEditorModal}
        />
      )}
      <PhotoItemWrapper openEditorModal={openEditorModal} isNewPost={isNewPost}>
        {data.map((item) => (
          <ItemList key={item.id}>
            <KeywordBox>
              <div>{item.photo.keyword1}</div>
              {item.photo.keyword2.trim().length > 0 && (
                <div>{item.photo.keyword2}</div>
              )}
              {item.photo.keyword3.trim().length > 0 && (
                <div>{item.photo.keyword3}</div>
              )}
            </KeywordBox>
            <ImageBox
              onMouseEnter={() => setTargetPost(item)}
              onMouseLeave={() => setTargetPost(defaultPhotolist)}
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
        {openPhotoModal && (
          <ViewPhotoModal
            targetPhoto={targetPhoto}
            setOpenPhotoModal={setOpenPhotoModal}
          />
        )}
      </PhotoItemWrapper>
    </>
  );
};

export default PhotoList;
