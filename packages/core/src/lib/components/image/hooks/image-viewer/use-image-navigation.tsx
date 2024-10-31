import { useCallback, useMemo } from "react";

export const useImageNavigation = (
  currentImageIndex: number,
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>,
  urlsLength: number,
) => {
  const toNextImage = useCallback(() => {
    setCurrentImageIndex((previousIndex) => {
      if (previousIndex < urlsLength - 1) {
        return previousIndex + 1;
      }
      return previousIndex;
    });
  }, [urlsLength, setCurrentImageIndex]);

  const toPreviousImage = useCallback(() => {
    setCurrentImageIndex((previousIndex) => {
      if (previousIndex > 0) {
        return previousIndex - 1;
      }
      return previousIndex;
    });
  }, [setCurrentImageIndex]);

  const hasNext = useMemo(
    () => currentImageIndex < urlsLength - 1,
    [currentImageIndex, urlsLength],
  );
  const hasPrevious = useMemo(() => currentImageIndex > 0, [currentImageIndex]);

  return {
    toNextImage,
    toPreviousImage,
    hasNext,
    hasPrevious,
  };
};
