export const GROUPS = [
  { id: "getting-started", name: "Getting Started", order: "01" },
  { id: "customization-guide", name: "Customization Guide", order: "02" },
  { id: "block-types", name: "Block Types", order: "03" },
] as const;

export type GroupId = (typeof GROUPS)[number]["id"];

export function getGroupOrder(groupId: GroupId): string {
  const group = GROUPS.find((g) => g.id === groupId);
  return group ? group.order : "00";
}
