import { MainWrapper } from "../../../App";
import PostEditor from "../../organisms/PostEditor/PostEditor";

const UpdatePost = () => {
  return (
    <MainWrapper>
      <PostEditor isEdit={true} />
    </MainWrapper>
  );
};

export default UpdatePost;
