/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
let loaded = false;

export default function load(Prism: any) {
  if (loaded) return;
  _load(Prism);
  loaded = true;
}

function _load(Prism: any) {
  // Allow only one line break
  let inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;

  /**
   * This function is intended for the creation of the bold or italic pattern.
   *
   * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
   *
   * _Note:_ Keep in mind that this adds a capturing group.
   *
   * @param {string} pattern
   * @returns {RegExp}
   */
  function createInline(pattern: any) {
    pattern = pattern.replace(/<inner>/g, function () {
      return inner;
    });
    return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
  }

  let tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/
    .source;
  let tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
    /__/g,
    function () {
      return tableCell;
    },
  );
  let tableLine =
    /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/
      .source;

  Prism.languages.markdown = Prism.languages.extend("markup", {});
  Prism.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: true,
      greedy: true,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: Prism.languages.yaml,
        },
      },
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation",
    },
    table: {
      pattern: RegExp(
        "^" + tableRow + tableLine + "(?:" + tableRow + ")*",
        "m",
      ),
      inside: {
        "table-data-rows": {
          pattern: RegExp(
            "^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$",
          ),
          lookbehind: true,
          inside: {
            "table-data": {
              pattern: RegExp(tableCell),
              inside: Prism.languages.markdown,
            },
            punctuation: /\|/,
          },
        },
        "table-line": {
          pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
          lookbehind: true,
          inside: {
            punctuation: /\||:?-{3,}:?/,
          },
        },
        "table-header-row": {
          pattern: RegExp("^" + tableRow + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(tableCell),
              alias: "important",
              inside: Prism.languages.markdown,
            },
            punctuation: /\|/,
          },
        },
      },
    },
    code: [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern:
          /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: true,
        alias: "keyword",
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: true,
        inside: {
          "code-block": {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: true,
          },
          "code-language": {
            pattern: /^(```).+/,
            lookbehind: true,
          },
          punctuation: /```/,
        },
      },
    ],
    title: [
      {
        // title 1
        // =======

        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
        alias: "important",
        inside: {
          punctuation: /==+$|--+$/,
        },
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: true,
        alias: "important",
        inside: {
          punctuation: /^#+|#+$/,
        },
      },
    ],
    hr: {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: "punctuation",
    },
    list: {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: true,
      alias: "punctuation",
    },
    "url-reference": {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern:
        /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        letiable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true,
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: "url",
    },
    bold: {
      // **strong**
      // __strong__

      // allow one nested instance of italic text using the same delimiter
      pattern: createInline(
        /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/
          .source,
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /\*\*|__/,
      },
    },
    italic: {
      // *em*
      // _em_

      // allow one nested instance of bold text using the same delimiter
      pattern: createInline(
        /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/
          .source,
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /[*_]/,
      },
    },
    strike: {
      // ~~strike through~~
      // ~strike~
      pattern: createInline(/(~~?)(?:(?!~)<inner>)+\1/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: {}, // see below
        },
        punctuation: /~~?/,
      },
    },
    "code-snippet": {
      // `code`
      // ``code``
      pattern:
        /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: true,
      greedy: true,
      alias: ["code", "keyword"],
    },
    url: {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline(
        /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/
          .source,
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {}, // see below
        },
        letiable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: true,
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: true,
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: true,
        },
      },
    },
  });

  ["url", "bold", "italic", "strike"].forEach(function (token: any) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(
      function (inside) {
        if (token !== inside) {
          Prism.languages.markdown[token].inside.content.inside[inside] =
            Prism.languages.markdown[inside];
        }
      },
    );
  });

  Prism.hooks.add("after-tokenize", function (env: any) {
    if (env.language !== "markdown" && env.language !== "md") {
      return;
    }

    function walkTokens(tokens: any) {
      if (!tokens || typeof tokens === "string") {
        return;
      }

      for (let i = 0, l = tokens.length; i < l; i++) {
        let token = tokens[i];

        if (token.type !== "code") {
          walkTokens(token.content);
          continue;
        }

        /*
         * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
         * is optional. But the grammar is defined so that there is only one case we have to handle:
         *
         * token.content = [
         *     <span class="punctuation">```</span>,
         *     <span class="code-language">xxxx</span>,
         *     '\n', // exactly one new lines (\r or \n or \r\n)
         *     <span class="code-block">...</span>,
         *     '\n', // exactly one new lines again
         *     <span class="punctuation">```</span>
         * ];
         */

        let codeLang = token.content[1];
        let codeBlock = token.content[3];

        if (
          codeLang &&
          codeBlock &&
          codeLang.type === "code-language" &&
          codeBlock.type === "code-block" &&
          typeof codeLang.content === "string"
        ) {
          // this might be a language that Prism does not support

          // do some replacements to support C++, C#, and F#
          let lang = codeLang.content
            .replace(/\b#/g, "sharp")
            .replace(/\b\+\+/g, "pp");
          // only use the first word
          lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
          let alias = "language-" + lang;

          // add alias
          if (!codeBlock.alias) {
            codeBlock.alias = [alias];
          } else if (typeof codeBlock.alias === "string") {
            codeBlock.alias = [codeBlock.alias, alias];
          } else {
            codeBlock.alias.push(alias);
          }
        }
      }
    }

    walkTokens(env.tokens);
  });

  Prism.hooks.add("wrap", function (env: any) {
    if (env.type !== "code-block") {
      return;
    }

    let codeLang = "";
    for (let i = 0, l = env.classes.length; i < l; i++) {
      let cls = env.classes[i];
      let match = /language-(.+)/.exec(cls);
      if (match) {
        codeLang = match[1];
        break;
      }
    }

    let grammar = Prism.languages[codeLang];

    if (!grammar) {
      if (codeLang && codeLang !== "none" && Prism.plugins.autoloader) {
        let id =
          "md-" + new Date().valueOf() + "-" + Math.floor(Math.random() * 1e16);
        env.attributes["id"] = id;

        Prism.plugins.autoloader.loadLanguages(codeLang, function () {
          let ele = document.getElementById(id);
          if (ele) {
            ele.innerHTML = Prism.highlight(
              ele.textContent,
              Prism.languages[codeLang],
              codeLang,
            );
          }
        });
      }
    } else {
      env.content = Prism.highlight(
        textContent(env.content),
        grammar,
        codeLang,
      );
    }
  });

  let tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, "gi");

  /**
   * A list of known entity names.
   *
   * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
   *
   * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
   */
  let KNOWN_ENTITY_NAMES = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
  };

  // IE 11 doesn't support `String.fromCodePoint`
  let fromCodePoint = String.fromCodePoint || String.fromCharCode;

  /**
   * Returns the text content of a given HTML source code string.
   *
   * @param {string} html
   * @returns {string}
   */
  function textContent(html: any) {
    // remove all tags
    let text = html.replace(tagPattern, "");

    // decode known entities
    text = text.replace(
      /&(\w{1,8}|#x?[\da-f]{1,8});/gi,
      function (m: any, code: any) {
        code = code.toLowerCase();

        if (code[0] === "#") {
          let value;
          if (code[1] === "x") {
            value = parseInt(code.slice(2), 16);
          } else {
            value = Number(code.slice(1));
          }

          return fromCodePoint(value);
        } else {
          let known = (KNOWN_ENTITY_NAMES as any)[code];
          if (known) {
            return known;
          }

          // unable to decode
          return m;
        }
      },
    );

    return text;
  }

  Prism.languages.md = Prism.languages.markdown;
}
