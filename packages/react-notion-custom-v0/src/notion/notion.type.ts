import type {
  GetPageResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { ContentfulPage } from "@cozy-blog/notion-client";

export type _Block = BlockObjectResponse & { blocks: Block[] };
export type Page = GetPageResponse;
export type Block = _Block;
export type ContextedBlock = _Block &
  BlockContext & { blocks?: ContextedBlock[] };
export type Content = ContentfulPage;

export type BlockContext = {
  context: {
    previous?: ContextedBlock | null;
    after?: ContextedBlock | null;
    parent?: ContextedBlock | null;
  };
};
