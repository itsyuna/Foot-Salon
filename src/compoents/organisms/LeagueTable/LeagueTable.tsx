import TableTemplate from "../../molecules/TableTemplate/TableTemplate";

const category = "TABLE";
const kLeagueCaption = "2023 K리그 1";
const europeLeagueCaption = "2022-2023";
const tableMenu = ["순위", "팀명", "경기", "승점", "승", "무", "패", "득실차"];

const LeagueTable = () => {
  return (
    <TableTemplate
      category={category}
      tableMenu={tableMenu}
      kLeagueCaption={kLeagueCaption}
      europeLeagueCaption={europeLeagueCaption}
    />
  );
};

export default LeagueTable;
