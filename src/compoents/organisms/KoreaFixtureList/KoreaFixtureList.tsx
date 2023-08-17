import styled from "styled-components";

const Matches = styled.table`
  border: 1px solid #116d6e;
  width: 50%;
  height: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  margin: 5px;
`;

const ContentsSubtitle = styled.caption`
  border: 1px solid #1b9c85;
  background-color: #e3f2c1;
  color: #285430;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const TableHeadStyle = styled.tr`
  color: #2c3333;
  background-color: #ffd4b2;
`;

const MatchList = styled(TableHeadStyle)<{ isFinish: boolean }>`
  background-color: #fffad7;
  opacity: ${({ isFinish }) => isFinish && "0.3"};
`;

const TableHeadContents = styled.td`
  border: 1px solid #fd8a8a;
  &:nth-child(1) {
    width: 30%;
  }
  &:nth-child(2) {
    width: 40%;
  }
  &:nth-child(3) {
    width: 30%;
  }
  height: 2vh;
  line-height: 2vh;
`;

const Contents = styled(TableHeadContents)`
  height: 4vh;
  &:nth-child(4) {
    color: #ff4949;
  }
`;

interface MatchData {
  date: string;
  time?: string;
  match: string;
  place: string;
  status?: number;
  isFinish: boolean;
}

interface MatchItems {
  matchList: MatchData[];
  category: string[];
  subtitle: string;
}

const KoreaFixtureList = ({ matchList, category, subtitle }: MatchItems) => {
  return (
    <Matches>
      <ContentsSubtitle>{subtitle}</ContentsSubtitle>
      <thead>
        <TableHeadStyle>
          <TableHeadContents>{category[0]}</TableHeadContents>
          <TableHeadContents>{category[1]}</TableHeadContents>
          <TableHeadContents>{category[2]}</TableHeadContents>
          {category.length === 4 && (
            <TableHeadContents>{category[3]}</TableHeadContents>
          )}
        </TableHeadStyle>
      </thead>
      <tbody>
        {matchList.map((list, idx) => (
          <MatchList key={idx} isFinish={list.isFinish}>
            <Contents>
              {list.date} {list.time}
            </Contents>
            <Contents>{list.match}</Contents>
            <Contents>{list.place}</Contents>
            {list.status ? (
              list.status < 0 && list.isFinish && list.isFinish !== true ? (
                <Contents>진행중</Contents>
              ) : list.isFinish && list.isFinish === true ? (
                <Contents>종료</Contents>
              ) : list.status === 0 ? (
                <Contents>D-day!</Contents>
              ) : (
                list.status && <Contents>D-{list.status}</Contents>
              )
            ) : (
              ""
            )}
          </MatchList>
        ))}
      </tbody>
    </Matches>
  );
};

export default KoreaFixtureList;
