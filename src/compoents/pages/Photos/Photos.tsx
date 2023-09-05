import styled, { css } from "styled-components";
import { FcStackOfPhotos } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { PhotoListItems, fetchPhotos } from "../../../store/photos";

import Card from "../../../ui/Card";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import PhotoList from "../../organisms/PhotoList";
import PhotoEditorModal from "../../../ui/PhotoEditorModal";

const PhotoHeader = styled.header<{ openEditorModal: boolean }>`
  width: 90%;
  height: 19vh;
  margin: 1rem auto 0;
  text-align: center;

  h3 {
    margin: 2rem auto;
  }

  ${({ openEditorModal }) =>
    openEditorModal &&
    css`
      background-image: url("assets/img/play-football.png");

      background-size: 31%;
    `}
`;

const ButtonBox = styled.section<{ isModal: boolean }>`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: right;
  text-align: center;
  margin: 1rem 0;

  button:nth-child(2) {
    margin-left: 0.5rem;
  }

  button:nth-child(3) {
    margin-left: 2rem;
  }

  ${({ isModal }) =>
    isModal &&
    css`
      opacity: 0;
    `}
`;

const NoPhotoMessage = styled.section`
  width: 90%;
  height: 30vh;
  margin: 2rem auto;
  text-align: center;
`;

export const defaultPhotolist = {
  id: "",
  photo: {
    creatorId: "",
    userNickname: "",
    createdAt: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    dateTime: 0,
    isEdit: false,
    fileURL: "",
  },
};

const Photos = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.uid);

  const [openEditorModal, setOpenEditorModal] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [photoFilter, setPhotoFilter] = useState("all");

  const navigate = useNavigate();

  const showModalHandler = () => {
    if (isLoggedIn) {
      setOpenEditorModal(true);
      setIsNewPost(true);
    } else navigate("/login");
  };

  const filterSearchKeyword = (item: PhotoListItems) => {
    let getKeyword =
      item.photo.keyword1.includes(searchKeyword) ||
      item.photo.keyword2.includes(searchKeyword) ||
      item.photo.keyword3.includes(searchKeyword);
    return getKeyword;
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const data = useAppSelector((state) => state.photos.photoArray);

  const getPhotoFilter = () => {
    const photoByButton =
      photoFilter === "all"
        ? data
        : data.filter((item) => item.photo.creatorId === user);

    const getPhotos =
      searchKeyword === ""
        ? photoByButton
        : photoByButton.filter((item) => filterSearchKeyword(item));

    return getPhotos;
  };

  return (
    <Card>
      <PhotoHeader openEditorModal={openEditorModal}>
        <h3>나의 베스트컷을 기록하고, 공유해 보세요 📸</h3>
        <Input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="키워드로 검색하세요 :)"
          width="30%"
          height="3vh"
        />
        <ButtonBox isModal={openEditorModal}>
          <Button
            type="button"
            value="all"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setPhotoFilter((e.target as HTMLButtonElement).value)
            }
            width="3vw"
            margin="0"
            backgroundColor="#DAF5FF"
            border="#B0DAFF"
          >
            All
          </Button>
          <Button
            type="button"
            value="best-shot"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setPhotoFilter((e.target as HTMLButtonElement).value)
            }
            margin="0"
            backgroundColor="#DDF7E3"
            border="#86C8BC"
          >
            나의 베스트 컷📸
          </Button>
          <Button
            type="button"
            value="write"
            onClick={showModalHandler}
            margin="0"
            backgroundColor="#FFFBAC"
            border="#FFCA03"
          >
            기록하고 공유하기🖍
          </Button>
        </ButtonBox>
        {openEditorModal && (
          <PhotoEditorModal
            targetPhoto={defaultPhotolist}
            setOpenEditorModal={setOpenEditorModal}
            setIsNewPost={setIsNewPost}
          />
        )}
      </PhotoHeader>
      {data.length !== 0 ? (
        <PhotoList data={getPhotoFilter()} isNewPost={isNewPost} />
      ) : (
        <NoPhotoMessage>
          <h4>아직 공유된 사진이 없습니다 :(</h4>
          <FcStackOfPhotos size="100" />
        </NoPhotoMessage>
      )}
    </Card>
  );
};

export default Photos;
