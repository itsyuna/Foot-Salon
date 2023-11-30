import styled from "styled-components";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService, storageService } from "../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { BoardListItems } from "../../../store/playBoard";
import { StatListItems } from "../../../store/stats";

import Button from "../../atoms/Button";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const ButtonWrapper = styled.section`
  width: 70%;
  height: 8vh;
  margin: 0.5rem auto;
  display: flex;
  justify-content: space-between;

  button:nth-child(1) {
    margin-right: 0;
  }
  button:nth-child(2) {
    margin-left: 0.2rem;
  }

  ${media.small`
    width: 90%;

    button {
      font-size: 0.5rem;
    }   
  `}

  ${media.medium`
    width: 80%;

    button {
      font-size: 0.7rem;
    }
  `}
`;

interface ReadPostProps {
  isOwner: boolean;
  category: string;
  targetPost?: BoardListItems;
  targetStat?: StatListItems;
}

const ReadPostButton = ({
  isOwner,
  category,
  targetPost,
  targetStat,
}: ReadPostProps) => {
  let navigate = useNavigate();

  let { no } = useParams() as { no: string };

  const deletePhotoHandler = async () => {
    targetPost?.board.fileURL !== "" &&
      (await deleteObject(ref(storageService, targetPost?.board.fileURL)));
  };

  const updatePostHandler = () => {
    switch (category) {
      case `/play/${no}`:
        navigate(`/updatePlay/${no}`, { state: targetPost });
        break;
      case `/half-time/${no}`:
        navigate(`/updateHalfTime/${no}`, { state: targetPost });
        break;
      case `/stats/${no}`:
        navigate(`/updateStat/${no}`, { state: targetStat });
        break;
    }
  };

  const deletePostHandler = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      switch (category) {
        case `/play/${no}`:
          await deleteDoc(doc(dbService, "play", `${targetPost?.id}`));
          deletePhotoHandler();
          break;
        case `/half-time/${no}`:
          await deleteDoc(doc(dbService, "half-time", `${targetPost?.id}`));
          deletePhotoHandler();
          break;
        case `/stats/${no}`:
          await deleteDoc(doc(dbService, "stats", `${targetStat?.id}`));
          break;
      }
      toast.success("삭제 완료!");
      navigate(-1);
    }
  };

  return (
    <ButtonWrapper>
      <Button
        type="button"
        backgroundColor="#f9ec79"
        border="#ffb978"
        onClick={() => navigate(-1)}
      >
        뒤로 가기
      </Button>
      {isOwner && (
        <div>
          <Button
            type="button"
            backgroundColor="#f95d8a"
            color="white"
            border="#f00f96"
            onClick={updatePostHandler}
          >
            수정하기
          </Button>
          <Button
            type="button"
            backgroundColor="#f8a061"
            color="white"
            border="#fc7e5e"
            onClick={deletePostHandler}
          >
            삭제하기
          </Button>
        </div>
      )}
    </ButtonWrapper>
  );
};

export default React.memo(ReadPostButton);
