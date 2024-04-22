import { useEffect } from 'react';

const useSetCursorPosition = (inputRef, position) => {
  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      if (input.setSelectionRange) {
        input.setSelectionRange(position, position);
      } else if (input.createTextRange) {
        const range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
      }
    }
  }, [inputRef, position]);
};

export default useSetCursorPosition;
