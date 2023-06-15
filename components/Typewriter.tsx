import React, { useState, useEffect } from "react";

const Typewriter: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(200); // Adjust typing speed here (in milliseconds)
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const type = () => {
      setDisplayText((prevText) => currentText.substr(0, currentIndex));

      if (currentIndex < currentText.length) {
        currentIndex++;
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        setIsDeleting(true);
        timeoutId = setTimeout(erase, typingSpeed * 2);
      }
    };

    const erase = () => {
      setDisplayText((prevText) => currentText.substr(0, currentIndex));

      if (currentIndex > 0) {
        currentIndex--;
        timeoutId = setTimeout(erase, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timeoutId = setTimeout(type, typingSpeed / 2);
      }
    };

    timeoutId = setTimeout(type, typingSpeed);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentTextIndex, texts, typingSpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible);
    }, 500); // Adjust cursor blinking speed here (in milliseconds)

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div>
      <span>{displayText}</span>
      {cursorVisible && <span>|</span>}
    </div>
  );
};

export default Typewriter;
