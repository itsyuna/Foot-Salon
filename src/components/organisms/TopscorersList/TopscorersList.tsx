import styled from "styled-components";
import { TableProps } from "../TableTemplate/TableTemplate";

const Tr = styled.tr`
  &:hover {
    background-color: #ecf2ff;
  }
`;

const Th = styled.th`
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

const Td = styled.td`
  border: 1px solid lightgray;
  padding: 3px;

  &:nth-child(n + 4):nth-child(-n + 6) {
    width: 15%;
  }
`;

const TopscorersList = ({ idx, player, statistics }: TableProps) => {
  return (
    <Tr>
      <Th scope="row">{idx + 1}</Th>
      <Th>{player.name}</Th>
      <Td>{statistics[0].games.position} </Td>
      <Td>
        {statistics[0].goals.total} /{" "}
        {statistics[0].penalty.scored === null
          ? 0
          : statistics[0].penalty.scored}
      </Td>
      <Td>
        {statistics[0].goals.assists === null ? 0 : statistics[0].goals.assists}
      </Td>
      <Td>{statistics[0].games.appearences}</Td>
      <Td>{statistics[0].team.name}</Td>
      <Td>{player.nationality}</Td>
    </Tr>
  );
};

export default TopscorersList;
