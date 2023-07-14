import { MainWrapper } from "../../../App";
import PostEditor from "../../organisms/PostEditor/PostEditor";

const NewPost = () => {
  return (
    <MainWrapper>
      <PostEditor isEdit={false} />
    </MainWrapper>
  );
};

export default NewPost;
