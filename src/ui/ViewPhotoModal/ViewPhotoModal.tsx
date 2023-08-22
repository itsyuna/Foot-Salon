import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

import { CloseButtonBox } from "../PhotoEditorModal/PhotoEditorModal";
import Button from "../../compoents/atoms/Button";
import { PhotoListItems } from "../../store/photos";

const ModalWrapper = styled.section`
  background-color: #fffbeb;
  width: 80%;
  height: 75%;
  margin: 0 auto;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    margin-left: 5rem;
  }
`;

const CreatedDate = styled.span`
  color: #3a98b9;
  margin-right: 1rem;
`;

const EditText = styled.span`
  color: #ff55bb;
`;

const PhotoBox = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 0.5rem;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface ViewPhotoProps {
  setOpenPhotoModal: Dispatch<SetStateAction<boolean>>;
  targetPhoto: PhotoListItems;
}

const ViewPhotoModal = ({ setOpenPhotoModal, targetPhoto }: ViewPhotoProps) => {
  console.log(targetPhoto);
  return (
    <ModalWrapper>
      <CloseButtonBox>
        작성일: <CreatedDate>{targetPhoto.photo.createdAt}</CreatedDate>
        {targetPhoto.photo.isEdit && <EditText>수정됨</EditText>}
        <Button
          type="button"
          onClick={() => setOpenPhotoModal(false)}
          backgroundColor="pink"
          margin="0"
        >
          Close
        </Button>
      </CloseButtonBox>
      <PhotoBox>
        <Photo src={targetPhoto.photo.fileURL} alt="view" />
      </PhotoBox>
    </ModalWrapper>
  );
};

export default ViewPhotoModal;
