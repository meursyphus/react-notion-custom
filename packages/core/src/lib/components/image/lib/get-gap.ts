interface GapOffset {
  left: number;
  top: number;
  right: number;
  gap: number;
}

export const zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};

const parse = (x: string | null) => parseInt(x || "", 10) || 0;

export const getOffset = (): number[] => {
  const cs = window.getComputedStyle(document.body);

  const left = cs["marginLeft"];
  const top = cs["marginTop"];
  const right = cs["marginRight"];

  return [parse(left), parse(top), parse(right)];
};

export const getGapWidth = (): GapOffset => {
  if (typeof window === "undefined") {
    return zeroGap;
  }

  const offsets = getOffset();
  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;

  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
  };
};

export const getGapStyles = ({ left, top, right, gap }: GapOffset) => `
  body[data-scroll-locked] {
    padding-left: ${left}px;
    padding-top: ${top}px;
    padding-right: ${right}px;
    margin-right: ${gap}px !important;
    overflow: hidden !important;
    overscroll-behavior: contain;
    margin-left: 0;
    margin-top: 0;
    position: relative !important;
    }
`;
