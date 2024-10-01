import type { ContextedBlock } from "../../../types";

export const getImgUrlOrNull = (block: ContextedBlock): string | null => {
  if (block.type !== "image") return null;
  const { image } = block;
  const { url } =
    image.type === "file"
      ? image.file
      : image.type === "external"
        ? image.external
        : { url: null };
  return url ? url : null;
};
