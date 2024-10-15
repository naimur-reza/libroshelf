/* eslint-disable react/prop-types */
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const TextReveal = ({
  text,
  color = "text-gray-900",
  fontSize = "text-4xl",
  delay = 0,
}) => {
  const textRef = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const splitText = text.split(/( )/);

    if (textRef.current) {
      textRef.current.innerHTML = "";
      splitText.forEach((char) => {
        const span = document.createElement("span");

        if (char === "LibroShelf") {
          span.innerHTML = `<span style="color: #fb923c; text-decoration: underline;">${char}</span>`;
        } else {
          span.textContent = char === " " ? "\u00A0" : char;
        }

        span.style.display = "inline-block";
        span.style.opacity = "0";
        textRef.current.appendChild(span);
      });

      gsap.to(textRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        delay,
        duration: 0.7,
        ease: "power3.out",
        from: { opacity: 0, y: "20px" },
      });
    }
  }, [text, delay]);

  return (
    <div ref={textRef} className={` ${color} ${fontSize}`} aria-label={text}>
      {text}
    </div>
  );
};

export default TextReveal;
