export const slideInFromBottom = {
  offscreen: {
    y: 500,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.5,
    },
  },
  exit: {
    y: 500,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const slideInFromTop = {
  offscreen: {
    y: -25,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.5,
    },
  },
};

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const toastAn = {
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  offscreen: {
    opacity: 0,
    y: -25,
    scale: 0.9,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};
