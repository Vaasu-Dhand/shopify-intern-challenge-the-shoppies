import { useEffect } from 'react';

export default function useFadeUp() {
  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  useEffect(() => {
    let sections = Array.from(document.getElementsByClassName('section'));
    for (let section of sections) {
      observer.observe(section);
    }
    return () => {
      observer.disconnect()
    };
  }, [observer]);
}