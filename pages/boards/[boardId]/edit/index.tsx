// import { useRouter } from "next/router";
// import BoardList from "../../../../src/components/units/board/writer/BoardWrite.container";
// import { gql, useQuery } from "@apollo/client";
// import BoardWrite from "../../../../src/components/units/board/writer/BoardWrite.container";
import BoardWrite from "../../../../src/components/units/board/writer/BoardWrite.index";

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       _id
//       writer
//       title
//       contents
//       youtubeUrl
//       boardAddress {
//         zipcode
//         address
//         addressDetail
//       }
//       images
//     }
//   }
// `;

export default function BoardEditPage(): JSX.Element {
  // const router = useRouter();
  // const { data } = useQuery(FETCH_BOARD, {
  //   variables: {
  //     boardId: router.query.boardId,
  //   },
  // });
  // console.log(`페이지 데이터 ${JSON.stringify(data?.fetchBoard)}`);

  return <BoardWrite />;
}

/* <BoardList isEdit={true} data={data} />; */
