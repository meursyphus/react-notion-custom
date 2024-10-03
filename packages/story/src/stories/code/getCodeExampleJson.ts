export function getCodeExampleJson(code: string, language: string) {
  return [
    {
      object: "block",
      type: "code",
      id: "id",
      code: {
        caption: [],
        language: language,
        rich_text: [
          {
            type: "text",
            text: {
              content: code,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: code,
            href: null,
          },
        ],
      },
    },
  ] as any;
}
