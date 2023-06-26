import styled from "styled-components";
import { TableProps } from "../TableTemplate/TableTemplate";

const TableDataStyle = styled.tr`
  &:hover {
    background-color: #ecf2ff;
  }
`;

const TableHeader = styled.th`
  width: 5%;
  padding: 3px;
  color: #277bc0;
  border: 1px solid lightgray;
`;

const ContentsStyle = styled.td`
  border: 1px solid lightgray;
  padding: 3px;

  &:nth-child(n + 2) {
    width: 10%;
  }
  &:nth-child(5) {
    width: 20%;
  }
  &:nth-child(n + 6) {
    width: 15%;
  }
`;

const TransferList = (props: TableProps) => {
  const changeText = /until/;
  let renewalDate = props.renewal?.replace(changeText, "~").substring(10);

  return (
    <tbody>
      <TableDataStyle>
        <TableHeader scope="row">{props.playerName}</TableHeader>
        <ContentsStyle>{props.playerRole}</ContentsStyle>
        <ContentsStyle>{props.oldClub} </ContentsStyle>
        <ContentsStyle>{props.newClub}</ContentsStyle>
        <ContentsStyle>
          {props.transferType === "DONE DEAL" ? "이적 완료" : "계약 연장"}
        </ContentsStyle>
        <ContentsStyle>{renewalDate}</ContentsStyle>
        <ContentsStyle>{props.price}</ContentsStyle>
        <ContentsStyle>{props.transferDate}</ContentsStyle>
      </TableDataStyle>
    </tbody>
  );
};

export default TransferList;
