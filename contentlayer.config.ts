import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkGfm from "remark-gfm";
const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "标题",
      required: true,
    },
    date: {
      type: "date",
      description: "日期",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "标签",
      required: false,
    },
    introduction: {
      type: "string",
      description: "简介",
      required: false,
    },
    components: {
      type: "list",
      of: { type: "string" },
      description: "异步导入的组件集合",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeCodeTitles,
      rehypeAccessibleEmojis,
      [
        rehypePrismPlus,
        {
          ignoreMissing: true,
          showLineNumbers: true,
        },
      ],
    ],
  },
});
