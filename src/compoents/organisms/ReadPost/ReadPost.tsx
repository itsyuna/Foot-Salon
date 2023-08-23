import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

import BoardCard from "../../../ui/BoardCard/";
import {
  BoardContents,
  CategoryBox,
  CategoryContent,
  CategoryData,
  CategoryName,
  ContentBox,
} from "../PostEditor/PostEditor";
import ReadPostButton from "../ReadPostButton";
import NoPostMessage from "../../molecules/NoPostMessage";
import Comments from "../Comments";

const LastEditTimeBox = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;

  h5 {
    margin: 0 1rem 0 0;
  }

  h5:nth-child(1) {
    color: #0096ff;
  }

  h5:nth-child(2) {
    color: #4d77ff;
  }
`;

const ShowData = styled(CategoryData)`
  background-color: #c2ded1;
  border-radius: 10px;
  padding-left: 3rem;
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
  width: 100%;
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  margin-left: 2rem;
  background-color: white;
  border: 3px solid #c2ded1;
`;

const ContentsTextBox = styled.div`
  font-family: "IBM Plex Sans KR", sans-serif;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const ContentsImageBox = styled.div`
  text-align: center;
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
      <article>
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
                  alt="attachment"
                  width="60%"
                  height="80%"
                />
              </ContentsImageBox>
            )}
          </ContentsBox>
        </BoardContents>
      </article>
      <Comments category={category} boardId={targetPost.id} />
    </BoardCard>
  ) : (
    <NoPostMessage />
  );
};

export default ReadPost;
