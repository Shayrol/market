// section23 / 23-07-wrap-async-hof 참고

import type { FormEvent } from "react";

export const wrapAsync = (비동기함수: () => Promise<void>) => () => {
  void 비동기함수();
};

// event 타입 때문에 form 전용 하나 만듦
export const wrapFormAsync =
  (비동기함수: () => Promise<void>) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void 비동기함수();
  };

// 아무 타입 가능함
export const wrapAsyncGeneric =
  <E>(asyncFunc: (event: E) => Promise<void>) =>
  (event: E) => {
    void asyncFunc(event);
  };
