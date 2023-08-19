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

const ArticleBox = styled.article`
  section:nth-child(-n + 2) span:nth-child(2) {
    width: 30%;
  }

  section:nth-child(1) {
    margin-top: 0;
  }
`;

const ShowData = styled(CategoryData)`
  background-color: #c2ded1;
  border-radius: 10px;
  padding-left: 3rem;
`;

const ContentsBox = styled.span`
  width: 100%;
  height: 100%;
  overflow: auto;
  white-space: normal;
  margin-left: 2rem;
  background-color: white;
  border: 3px solid #c2ded1;
`;

const ContentsTextBox = styled.div`
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
      <ArticleBox>
        <CategoryBox>
          <CategoryName>작성자</CategoryName>
          <ShowData>{targetPost?.board.userNickname}</ShowData>
        </CategoryBox>
        <CategoryBox>
          <CategoryName>리그</CategoryName>
          <ShowData>{targetPost?.board.league}</ShowData>
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
      </ArticleBox>
      <Comments category={category} boardId={targetPost.id} />
    </BoardCard>
  ) : (
    <NoPostMessage />
  );
};

export default ReadPost;
