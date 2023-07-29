import { MainWrapper } from "../../../App";
import DiaryEditor from "../../organisms/DiaryEditor/DiaryEditor";

const NewDiary = () => {
  return (
    <MainWrapper>
      <DiaryEditor headText="⚽️새 Stat 쌓기⚽️" isEdit={false} />
    </MainWrapper>
  );
};

export default NewDiary;
