import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Tree from "./../../../components/Tree";
import "github-markdown-css/github-markdown-light.css";
import Link from "next/link";
import { AiTwotoneTag } from "react-icons/ai";
import React from "react";
import './page.css'


const mdxComponents = {
  Tree: ({ treeData }) => <Tree treeData={treeData} isRoot={true} />,
};


const PageHeader=({post}:{post:Post})=>{
  let style = {};
  if (post.cover !== undefined) {
    style["backgroundImage"] = `url(${post.cover})`;
  }
  return (
    <div
      className={post.cardTheme === "dark" ? "detail-card card-dark" : "detail-card card-light"}
      style={style}
    >
      <h2 className="post-title">
        <Link href={post.url} legacyBehavior>
          <span className="post-header">{post.title}</span>
        </Link>
      </h2>
      <div className={"flex justify-between items-center"}>
        <time dateTime={post.date} className="post-time">
          {post.date}
        </time>
        <div className={'post-tags'}>
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className={"flex justify-between items-center"}>
              <AiTwotoneTag className={'tag-icon'} />
              {post.tags.map((tag) => {
                return (
                  <Link href={`/?tag=${tag}`} key={tag}>
                    <span className={"tag"}>{tag}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="py-8 mx-auto">
      <PageHeader post={post} />
      <div className={"markdown-body"}>
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  );
};

export default PostLayout;
