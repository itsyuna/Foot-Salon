import styled from "styled-components";
import { TableProps } from "../TableTemplate/TableTemplate";

const TableDataStyle = styled.tr`
  &:hover {
    background-color: #ecf2ff;
  }
`;

const TableHeader = styled.th`
  padding: 3px;

  border: 1px solid lightgray;

  &:nth-child(1) {
    width: 10%;
  }

  &:nth-child(2) {
    width: 25%;
    color: #277bc0;
  }
`;

const ContentsStyle = styled.td`
  border: 1px solid lightgray;
  padding: 3px;

  &:nth-child(n + 4):nth-child(-n + 6) {
    width: 15%;
  }
`;

const TopscorersList = ({ idx, player, statistics }: TableProps) => {
  return (
    <TableDataStyle>
      <TableHeader scope="row">{idx + 1}</TableHeader>
      <TableHeader>{player.name}</TableHeader>
      <ContentsStyle>{statistics[0].games.position} </ContentsStyle>
      <ContentsStyle>
        {statistics[0].goals.total} /{" "}
        {statistics[0].penalty.scored === null
          ? 0
          : statistics[0].penalty.scored}
      </ContentsStyle>
      <ContentsStyle>
        {statistics[0].goals.assists === null ? 0 : statistics[0].goals.assists}
      </ContentsStyle>
      <ContentsStyle>{statistics[0].games.appearences}</ContentsStyle>
      <ContentsStyle>{statistics[0].team.name}</ContentsStyle>
      <ContentsStyle>{player.nationality}</ContentsStyle>
    </TableDataStyle>
  );
};

export default TopscorersList;
