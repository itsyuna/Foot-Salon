import TableTemplate from "../../molecules/TableTemplate/TableTemplate";

const category = "TRANSFER";
const tableMenu = [
  "선수명",
  "포지션",
  "이전 팀",
  "새 팀",
  "계약 상태",
  "연장 기간",
  "이적 금액",
  "계약 날짜",
];

const Transfer = () => {
  return <TableTemplate category={category} tableMenu={tableMenu} />;
};

export default Transfer;
