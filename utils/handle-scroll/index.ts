export const handleClickScroll = (
  value: string,
  duration: number,
  offset: number = 0
) => {
  const element = document.getElementById(value.toLowerCase());
  console.log("triggered");
  if (element) {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top - offset;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const scrollPosition = easeInOutCubic(
        elapsedTime,
        start,
        target,
        duration
      );

      window.scrollTo(0, scrollPosition);

      if (elapsedTime < duration) {
        requestAnimationFrame(scroll);
      }
    };

    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    requestAnimationFrame(scroll);
  }
};
