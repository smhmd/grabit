/*
  This component renders a textarea that resizes based on lines.
  Taken almost as is from this blog post https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc
 */

import React, { useState, useEffect, useRef } from 'react';

const AutoTextArea = (props) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight('auto');
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        {...props}
        ref={textAreaRef}
        rows={2}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default AutoTextArea;
