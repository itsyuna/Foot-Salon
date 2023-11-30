import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

import BoardCard from "../../../ui/BoardCard";
import {
  BoardContents,
  CategoryBox,
  CategoryContent,
  CategoryData,
  CategoryName,
  ContentBox,
} from "../../templates/PostEditor/PostEditor";
import ReadPostButton from "../../organisms/ReadPostButton";
import NoPostMessage from "../../molecules/NoPostMessage";
import Comments from "../../organisms/Comments";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const LastEditTimeBox = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;

  h5 {
    margin: 0 0.5rem 0 0;
  }

  h5:nth-child(1) {
    color: #0096ff;
  }

  h5:nth-child(2) {
    color: #4d77ff;
  }

  ${media.small`
    width: 80%;
  `}
`;

const ShowData = styled(CategoryData)`
  background-color: #c2ded1;
  border-radius: 10px;
  padding-left: 1.1rem;
  font-size: 0.9rem;

  ${media.small`
    margin-left: 1rem;
  `}
`;

const ColouredUserName = styled(ShowData)`
  width: 30%;
  color: #5800ff;
`;

const ColouredLeague = styled(ShowData)`
  width: 30%;
  color: #069a8e;
`;

const ContentsBox = styled.span`
  width: 96%;
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  margin-left: 2rem;
  background-color: white;
  border: 3px solid #c2ded1;

  ${media.small`
    margin-left: 1rem;
  `}
`;

const ContentsTextBox = styled.div`
  font-family: "IBM Plex Sans KR", sans-serif;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const ContentsImageBox = styled.div`
  text-align: center;

  ${media.small`
    img {
      width: 90%;
    }
  `}

  ${media.medium`
    img {
      width: 80%;
    }
  `}
`;

const PostContents = styled.article`
  padding-right: 2rem;

  ${media.small`
    font-size: 0.5rem;

    section {
      span {
        font-size: 0.6rem;
      }
    }

    padding-right: 1rem;
  `}

  ${media.medium`
    section {
      span {
        font-size: 0.8rem;
      }
    }
  `}
`;

const ReadPost = () => {
  const location = useLocation();

  const user = useAppSelector((state) => state.user.uid);

  const category = location.pathname;

  let targetPost = location.state;

  let isOwner = targetPost?.board.creatorId === user;

  return targetPost ? (
    <BoardCard>
      <ReadPostButton
        isOwner={isOwner}
        category={category}
        targetPost={targetPost}
      />
      <PostContents>
        {targetPost?.board.lastEditTime && (
          <LastEditTimeBox>
            <h5>수정됨</h5>
            <h5>{targetPost?.board.lastEditTime}</h5>
          </LastEditTimeBox>
        )}
        <CategoryBox>
          <CategoryName>작성자</CategoryName>
          <ColouredUserName>{targetPost?.board.userNickname}</ColouredUserName>
        </CategoryBox>
        <CategoryBox>
          <CategoryName>리그</CategoryName>
          <ColouredLeague>{targetPost?.board.league}</ColouredLeague>
        </CategoryBox>
        <CategoryBox>
          <CategoryName>제목</CategoryName>
          <ShowData>{targetPost?.board.title}</ShowData>
        </CategoryBox>
        <BoardContents>
          <ContentBox>
            <CategoryContent>내용</CategoryContent>
          </ContentBox>
          <ContentsBox>
            <ContentsTextBox>{targetPost?.board.contents}</ContentsTextBox>
            {targetPost?.board.fileURL && (
              <ContentsImageBox>
                <img
                  src={targetPost?.board.fileURL}
                  alt="Upload file"
                  width="70%"
                  height="80%"
                />
              </ContentsImageBox>
            )}
          </ContentsBox>
        </BoardContents>
      </PostContents>
      <Comments category={category} boardId={targetPost.id} />
    </BoardCard>
  ) : (
    <NoPostMessage />
  );
};

export default ReadPost;
