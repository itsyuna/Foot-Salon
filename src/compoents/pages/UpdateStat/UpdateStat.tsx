import { MainWrapper } from "../../../App";
import DiaryEditor from "../../organisms/DiaryEditor/DiaryEditor";

const UpdateStat = () => {
  return (
    <MainWrapper>
      <DiaryEditor headText="Stat 수정하기" isEdit={true} />
    </MainWrapper>
  );
};

export default UpdateStat;
