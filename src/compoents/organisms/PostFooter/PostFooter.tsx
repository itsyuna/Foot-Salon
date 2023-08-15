import styled from "styled-components";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled.div`
  width: 72%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const PostFooter = () => {
  const navigate = useNavigate();

  const cancelHandler = () => {
    if (window.confirm("작성을 취소하시겠습니까?")) navigate(-1);
  };

  return (
    <section>
      <ButtonWrapper>
        <Button
          type="button"
          backgroundColor="#f9ec79"
          border="#ffb978"
          onClick={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          backgroundColor="#f95d8a"
          color="white"
          border="#f00f96"
        >
          Write
        </Button>
      </ButtonWrapper>
    </section>
  );
};

export default PostFooter;
