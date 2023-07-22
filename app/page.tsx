import Link from "next/link";
import { isAfter,compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import React from "react";
import "./page.css";
import { AiTwotoneTag } from "react-icons/ai";

function Tag(props: { tag: string }) {
  return (
    <Link href={`/?tag=${props.tag}`}>
      <span className={"tag"}>
        <AiTwotoneTag color={"#ff9988"} />
        <span className={"tag-name"}>{props.tag}</span>
      </span>
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {

  let style = {};
  if (post.cover !== undefined) {
    style["backgroundImage"] = `url(${post.cover})`;
  }
  return (
    <div
      className={post.cardTheme === "dark" ? "card card-dark" : "card card-light"}
      style={style}
    >
      <h2 className="post-title">
        <Link href={post.url} legacyBehavior>
          <span className="post-header">{post.title}</span>
        </Link>
      </h2>
      <div className={"post-introduction"}>{post.introduction}</div>

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

export default function Home(props) {
  const { searchParams } = props;
  let tags: string[] = [];
  let posts: Post[] = [];
  let lastUpdate = "2016-01-25 13:16:00 ";

  allPosts.forEach((post) => {
    if(isAfter(new Date(post.date),new Date(lastUpdate))){
      lastUpdate = post.date
    }



    if (Array.isArray(post.tags)) {
      tags = tags.concat(post.tags);
    }
    const tag = searchParams.tag as string | undefined;
    const query = searchParams["query"] as string | undefined;
    if (tag === undefined && query === undefined) {
      posts.push(post);
    }
    if (
      tag !== undefined &&
      query === undefined &&
      post.tags !== undefined &&
      post.tags.includes(tag)
    ) {
      posts.push(post);
    }
    if (
      tag !== undefined &&
      query !== undefined &&
      post.tags!== undefined &&
      post.tags.includes(tag) &&
      (post.title.indexOf(query) >= 0 ||
        post.introduction?.indexOf(query) >= 0 ||
        post.body.raw.indexOf(query) >= 0)
    ) {
      posts.push(post);
    }
    if (
      tag === undefined &&
      query !== undefined &&
      (post.title.indexOf(query) >= 0 ||
        post.introduction?.indexOf(query) >= 0 ||
        post.body.raw.indexOf(query) >= 0)
    ) {
      posts.push(post);
    }
  });

  posts = posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div>
      <div className={"blog-count-info"}>
        <span className={"blog-count"}>共 {allPosts.length} 篇博客</span>
        <span className={"blog-last-update"}>
          最近更新于 <span>{lastUpdate}</span>
        </span>
      </div>
      <div className={"tag-list"}>
        {Array.from(new Set(tags)).map((item) => {
          return <Tag key={item} tag={item}></Tag>;
        })}
      </div>
      <div className={"mt-6"}>
        {posts.map((post) => {
          return <PostCard post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}
