/* eslint-disable react/prop-types */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);

const TextReveal = ({
  text,
  color = "text-gray-900",
  fontSize = "text-4xl",
  delay = 0,
}) => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const splitText = text.split("");

    if (textRef.current) {
      textRef.current.innerHTML = "";
      splitText.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        textRef.current.appendChild(span);
      });

      gsap.to(textRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        delay,
        duration: 0.5,
        ease: "power3.out",
        from: { opacity: 0, y: "20px" },
      });
    }
  }, [text, delay]);

  return (
    <div
      ref={textRef}
      className={`font-bold ${color} ${fontSize}`}
      aria-label={text}
    >
      {text}
    </div>
  );
};

export default TextReveal;
