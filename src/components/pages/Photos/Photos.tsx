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
import { media } from "../../../ui/MediaQuery/mediaQuery";

const PhotoHeader = styled.header<{ openEditorModal: boolean }>`
  width: 90%;
  height: 19vh;
  margin: 1rem auto 0;
  text-align: center;

  h4 {
    margin: 2rem auto;
  }

  input,
  button {
    font-size: 0.9rem;
  }

  ${({ openEditorModal }) =>
    openEditorModal &&
    css`
      ${media.large`
      background-image: url("assets/images/play-football.png");
      background-size: 31%;
    `}
    `}

  ${media.small`
    h4 {
      font-size: 0.7rem;
    }

    input,button {
      font-size: 0.7rem;
    }

    input {
      width: 40%;
      height: 2.2vh;
    }

    button {
      width: auto;
      height: 2.5vh;
      line-height: 50%;
    }

    section {
      justify-content: space-between;
    }
  `}

  ${media.medium`
  h4 {
    font-size: 0.8rem;
  }

  input,button {
    font-size: 0.8rem;
  }

  input {
    width: 35%;
    height: 2.4vh;
  }

  button {
    width: auto;
    height: 2.7vh;
  }

  & > section {
    margin-top: 1.5rem;
  }
`}
`;

const ButtonBox = styled.section<{ isModal: boolean }>`
  width: 100%;
  height: 6vh;
  margin: 1rem 0;

  display: flex;
  justify-content: right;
  align-items: center;
  text-align: center;

  section {
    display: flex;
    align-items: center;
    margin-right: 1rem;
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

  p {
    font-size: 0.9rem;
    font-weight: 900;
  }

  ${media.small`
    p {
      font-size: 0.5rem;
    }
    
    svg {
      width: 10vw;
      height: 5vh;
    }
  `}

  ${media.medium`
    p {
      font-size: 0.7rem;
    }

    svg {
      width: 15vw;
      height: 5vh;
    }
  `}
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
        <h4>나의 베스트컷을 기록하고, 공유해 보세요 📸</h4>
        <Input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="키워드로 검색하세요 :)"
          width="30%"
          height="3vh"
        />
        <ButtonBox isModal={openEditorModal}>
          <section>
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
          </section>
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
          <p>아직 공유된 사진이 없습니다 :(</p>
          <FcStackOfPhotos size="70" />
        </NoPhotoMessage>
      )}
    </Card>
  );
};

export default Photos;
