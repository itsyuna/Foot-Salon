import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

import Button from "../../components/atoms/Button";
import { PhotoListItems } from "../../store/photos";
import { media } from "../MediaQuery/mediaQuery";

const ModalWrapper = styled.section`
  background-color: #fffbeb;
  width: 80%;
  height: 85vh;
  margin: 0 auto;
  z-index: 999;
  position: absolute;
  top: 52.5%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${media.small`
    height: 71%;
    top: 51%;

    button {
      font-size: 0.6rem;
      height: 3vh;
    }

    & > section:nth-child(1) {
      font-size: 0.6rem;
    }
  `}

  ${media.medium`
    height: 72%;
    top: 50%;

    button {
      font-size: 0.7rem;
      height: 3.2vh;
    }

    & > section:nth-child(1) {
      font-size: 0.7rem;
    }
  `}
`;

const HeaderButtonBox = styled.section`
  font-family: "Do Hyeon", sans-serif;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreatedDate = styled.span`
  color: #3a98b9;
`;

const EditText = styled.span`
  color: #ff55bb;
  margin-left: 0.5rem;
`;

const PhotoBox = styled.section`
  width: 100%;
  height: 85%;
  margin-top: 0.5rem;

  ${media.small`
    height: 80%;
    margin: 0;
  `}

  ${media.medium`
    height: 82%;
    margin: 0;
  `}
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface ViewPhotoProps {
  targetPhoto: PhotoListItems;
  setOpenPhotoModal: Dispatch<SetStateAction<boolean>>;
}

const ViewPhotoModal = ({ targetPhoto, setOpenPhotoModal }: ViewPhotoProps) => {
  return (
    <ModalWrapper>
      <HeaderButtonBox>
        <section>
          작성일: <CreatedDate>{targetPhoto.photo.createdAt}</CreatedDate>
          {targetPhoto.photo.isEdit && <EditText>수정됨</EditText>}
        </section>
        <Button
          type="button"
          onClick={() => setOpenPhotoModal(false)}
          backgroundColor="#FF78C4"
          border="#FF78C4"
          margin="0"
        >
          Close
        </Button>
      </HeaderButtonBox>
      <PhotoBox>
        <Photo src={targetPhoto.photo.fileURL} alt="Best shot" />
      </PhotoBox>
    </ModalWrapper>
  );
};

export default ViewPhotoModal;
