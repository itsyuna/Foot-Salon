import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService, storageService } from "../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { BoardListItems } from "../../../store/playBoard";
import { StatListItems } from "../../../store/stats";

import Button from "../../atoms/Button";

const FooterWrapper = styled.section`
  width: 70%;
  height: 8vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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
      alert("삭제가 완료되었습니다.");
      navigate(-1);
    }
  };

  return (
    <FooterWrapper>
      <Button
        type="button"
        backgroundColor="#f9ec79"
        border="#ffb978"
        onClick={() => navigate(-1)}
      >
        뒤로가기
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
    </FooterWrapper>
  );
};

export default ReadPostButton;