import MyPageMain from "../../src/components/units/mypage/mypageMain/mypage.index";
import { WithAuth } from "../../src/components/commons/hocs/withAuth";

function MyPage(): JSX.Element {
  return <MyPageMain />;
}

export default WithAuth(MyPage);
