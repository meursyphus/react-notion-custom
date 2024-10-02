import { Sync } from "factory.ts";
import { ImageBlockObjectResponseExtended } from "./domloadImage.helper";

export const fileImageFactory = Sync.makeFactory<
  Extract<ImageBlockObjectResponseExtended["image"], { type: "file" }>
>({
  type: "file",
  caption: [],
  file: {
    url: "/notion-data/1101aaa6-8f2f-8063-9730-e8a5004d1d22/image_1.png",
    expiry_time: "2024-10-02T02:26:13.593Z",
  },
});
export const externalImageFactory = Sync.makeFactory<
  Extract<ImageBlockObjectResponseExtended["image"], { type: "external" }>
>({
  type: "external",
  caption: [],
  external: {
    url: "https://example.com/image.png",
  },
});

/**
 * @description Factory for ImageBlockObjectResponseExtended.
 * This mockFactory allows you to easily reproduce specific scenarios by generating mock data without making separate API calls when testing and reproducing situations based on different API response cases.
 * @link - https://github.com/willryan/factory.ts?tab=readme-ov-file#basic-factory
 * @example
 * ```ts
 * const imageBlock = fileImageBlockFactory.build({
 *  image: fileImageFactory.build({url: 'xxx'}),
 * })
 *
 * });
 * ```
 */
export const fileImageBlockFactory =
  Sync.makeFactory<ImageBlockObjectResponseExtended>({
    object: "block",
    id: "1101aaa6-8f2f-8013-b7e5-c4d3f4d5cd9e",
    parent: {
      type: "page_id",
      page_id: "1101aaa6-8f2f-8063-9730-e8a5004d1d22",
    },
    created_time: "2024-09-29T09:09:00.000Z",
    last_edited_time: "2024-09-29T09:09:00.000Z",
    created_by: {
      object: "user",
      id: "766986c2-9962-4041-904f-e8d9f50fcfb3",
    },
    last_edited_by: {
      object: "user",
      id: "766986c2-9962-4041-904f-e8d9f50fcfb3",
    },
    has_children: false,
    archived: false,
    in_trash: false,
    type: "image",
    image: fileImageFactory.build(),
    blocks: [],
  });

/**
 * @description - Factory for ImageBlockObjectResponseExtended for making external image block.
 * This mockFactory allows you to easily reproduce specific scenarios by generating mock data without making separate API calls when testing and reproducing situations based on different API response cases.

 * @link - https://github.com/willryan/factory.ts?tab=readme-ov-file#basic-factory
 * @example
 * ```ts
 * const imageBlock = externalImageBlockFactory.build({
 *  image: externalImageFactory.build({url: 'xxx'}),
 * })
 *  
 * });
 * ```
 */
export const externalImageBlockFactory = fileImageBlockFactory.extend({
  image: externalImageFactory.build(),
});
