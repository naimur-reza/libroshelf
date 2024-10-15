import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line no-unused-vars
export const animateBooks = (cardContainerRef, searchFilterRef, books) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardContainerRef.current,
      start: "top bottom-=100",
      toggleActions: "play pause resume pause",
    },
  });

  // Animate the search and filter section
  tl.from(searchFilterRef.current, {
    delay: 2,
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power3.out",
  });

  // Animate book cards
  gsap.utils.toArray(".book-card").forEach((card) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.3,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.3,
        scrollTrigger: {
          trigger: card,
          start: "top 65%",
          end: "bottom 20%",
          toggleActions: "play pause resume pause",
        },
      }
    );
  });
};
