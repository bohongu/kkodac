export const HoverVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    zInedx: 100,
    scale: 1.2,
    y: -100,
    transition: {
      delay: 0.3,
    },
  },
};

export const HoverDownVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    zIndex: 100,
    scale: 1.2,
    transition: {
      delay: 0.3,
    },
  },
};

export const sliderVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

export const ContentVariants = {
  hover: {
    opacity: 1,
    zIndex: 100,
    transition: {
      delay: 0.3,
    },
  },
};

export const navVariants = {
  top: { backgroundColor: 'rgba(0,0,0,0)' },
  down: { backgroundColor: '#7CD0FD' },
};

export const logVariants = {
  top: { color: 'black' },
  down: { color: 'white' },
};

export const modalVarints = {
  hidden: (exit: boolean) => ({
    x: exit ? window.outerWidth : -window.outerWidth,
  }),
  visible: { x: 0 },
  exit: {
    x: -window.outerWidth,
  },
};

export const svgVariants = {
  start: { pathLength: 0, fill: 'white' },
  end: {
    pathLength: 1,
    transition: {
      duration: 2,
    },
  },
  hover: {
    fill: 'yellow',
    pathLength: 0,
    transition: {
      duration: 1,
    },
  },
};
