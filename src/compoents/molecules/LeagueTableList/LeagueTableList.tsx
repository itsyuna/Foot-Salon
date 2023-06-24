import styled from "styled-components";
import { TableProps, Th } from "../TableTemplate/TableTemplate";

const Team = styled.th`
  border: 1px solid lightgray;
  padding: 5px;
  display: flex;
`;

const TeamLogo = styled.img`
  width: 20px;
`;

const TeamName = styled.p`
  margin: 5px;
`;

export const Td = styled.td`
  border: 1px solid lightgray;
  padding: 5px;
`;

const TableList = (props: TableProps) => {
  return (
    <tbody>
      <tr>
        <Th scope="row">{props.Position}</Th>
        <Team scope="row" colSpan={2}>
          <TeamLogo src={props.SquadLogo} alt="Team Logo" />
          <TeamName>{props.Name}</TeamName>
        </Team>
        <Td>{props.Played}</Td>
        <Td>{props.Points}</Td>
        <Td>{props.Winned}</Td>
        <Td>{props.Tie}</Td>
        <Td>{props.Loosed}</Td>
        <Td>{props["Goal Difference"]}</Td>
      </tr>
    </tbody>
  );
};

export default TableList;
