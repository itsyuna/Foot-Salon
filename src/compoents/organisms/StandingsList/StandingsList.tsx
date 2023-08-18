import styled from "styled-components";
import { TableProps, Th } from "../TableTemplate/TableTemplate";

const Team = styled.th`
  border: 1px solid lightgray;
  padding: 5px;
  display: flex;
`;

const TeamLogo = styled.img`
  width: 30px;
`;

const TeamName = styled.p`
  margin: 5px;
`;

export const Td = styled.td`
  border: 1px solid lightgray;
  padding: 5px;
`;

const StandingsList = ({ all, rank, team, points, goalsDiff }: TableProps) => {
  return (
    <tr>
      <Th scope="row">{rank}</Th>
      <Team scope="row" colSpan={2}>
        <TeamLogo src={team.logo} alt="Team Logo" />
        <TeamName>{team.name}</TeamName>
      </Team>
      <Td>{all.played}</Td>
      <Td>{points}</Td>
      <Td>{all.win}</Td>
      <Td>{all.draw}</Td>
      <Td>{all.lose}</Td>
      <Td>{goalsDiff}</Td>
    </tr>
  );
};

export default StandingsList;
