// antd에서 Tag사용 chatGPT를 통해 간편화 했음
// 태그 저장을 Recoil로 했으며 사용은 useRecoilValue로 가져와 DB에 저장

import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Tag, theme } from "antd";
import { useRecoilState } from "recoil";
import { isTagsState } from "../../../../commons/stores";

interface UseTagEditProps {
  initialTags: string[];
}

const UseTagEdit = ({ initialTags }: UseTagEditProps): JSX.Element => {
  const { token } = theme.useToken();
  const [tags, setTags] = useRecoilState(isTagsState);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  // Input이 보이게 되었을 때 포커스 설정
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  // data에 있는 태그를 불러와 tag에 담는 작업
  useEffect(() => {
    // initialTags.length은 요소를 확인 한다.
    if (initialTags.length > 0 && tags.length === 0) {
      setTags(initialTags);
    }
  }, [initialTags, setTags, tags.length]);

  // 태그 삭제
  const handleClose = (removedTag: string): void => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  // Input 보이게 설정
  const showInput = (): void => {
    setInputVisible(true);
  };

  // Input 값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Input에서 Enter 키를 누르거나 포커스를 잃었을 때 호출
  const handleInputConfirm = (): void => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  // 태그 렌더링
  const tagChild = tags.map((tag) => (
    <Tag
      key={tag}
      closable
      onClose={(e) => {
        e.preventDefault();
        handleClose(tag);
      }}
    >
      {tag}
    </Tag>
  ));

  // 태그 추가 버튼 스타일
  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <div>
      <div style={{ minHeight: "22px", marginBottom: 5 }}>{tagChild}</div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        tags.length < 5 && (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> New Tag
          </Tag>
        )
      )}
    </div>
  );
};

export default UseTagEdit;
