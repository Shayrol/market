// import BoardDetail from "../../../src/components/units/board/detail_test/BoardDetail.container";
// import BoardDetail from "../../../src/components/units/board/detail1/BoardDetail.container";
// import BoardCommentList from "../../../src/components/units/boardComment/listTest/BoardCommentList.container";
// import BoardCommentWriteTest from "../../../src/components/units/boardComment/writeTest/BoardCommentWrite.container";
// import BoardCommentList from "../../../src/components/units/boardComment/list1/BoardCommentList.container";
// import BoardCommentWrite from "../../../src/components/units/boardComment/write1/BoardCommentWrite.container";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import BoardCommentList from "../../../src/components/units/boardComment/list/BoardCommentList.index";
export default function BoardDetailPage(): JSX.Element {
  return (
    <>
      {/* BoardDetail은 detail_test를 import 함 */}
      <BoardDetail />
      <BoardCommentList />
      {/* <BoardDetail /> */}
      {/* <BoardCommentWrite /> */}
      {/* <BoardCommentList /> */}
      {/* <BoardCommentWriteTest /> */}
      {/* <BoardCommentList /> */}
    </>
  );
}
