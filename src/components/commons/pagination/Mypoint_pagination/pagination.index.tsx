import { MouseEvent, useEffect, useState } from "react";
import { NextPage, Page, PageNation, PrevPage } from "./pagination.styles";

interface IPage {
  refetch: any;
  count?: number;
}

export default function MyPointPagination(props: IPage): JSX.Element {
  const lastPage = Math.ceil((props.count ?? 10) / 10);
  const [startPage, setStartPage] = useState(1);
  const [ActivePage, setActivePage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const page = Number(event.currentTarget.id);
    setActivePage(page);
    void props.refetch({
      page,
    });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setActivePage(startPage - 10);
    setStartPage(startPage - 10);
    void props.refetch({
      page: startPage - 10,
    });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setActivePage(startPage + 10);
      setStartPage(startPage + 10);
      void props.refetch({
        page: startPage + 10,
      });
    }
  };

  return (
    <PageNation>
      <PrevPage onClick={onClickPrevPage}>{"<<<"}</PrevPage>
      {new Array(10).fill(1).map((el, index) =>
        startPage + index <= lastPage ? (
          <Page
            id={String(startPage + index)}
            key={startPage + index}
            onClick={onClickPage}
            isActive={startPage + index === ActivePage}
          >
            {startPage + index}
          </Page>
        ) : null
      )}
      <NextPage onClick={onClickNextPage}>{">>>"}</NextPage>
    </PageNation>
  );
}
