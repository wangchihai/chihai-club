import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import React from "react";
import  './page.css'
import { AiTwotoneTag } from "react-icons/ai";

function Tag(props:{tag: string}) {
  return (
    <Link href={`/?tag=${props.tag}`}><span className={'tag'}>
      <AiTwotoneTag color={'#ff9988'}/>
      <span className={'tag-name'}>{props.tag}</span>
    </span></Link>
  );
}

function PostCard(post: Post) {
  console.log(post.tags);

  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900"
          legacyBehavior
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div>{post.introduction}</div>
      <div></div>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  let tags:string[] =[]
  tags=posts.reduce((item1,item2)=>{
    console.log(item1)
    const tag1 = item1||[]
    const tag2 = item2.tags||[]
    return tag1.concat(tag2)
  },tags)
  return (
    <div>
      <div className={'blog-count-info'}>
        <span className={'blog-count'}>共 {posts.length} 篇博客</span>
        <span className={'blog-last-update'}>最近更新于 <span>{posts[0].date}</span></span>
      </div>
      <div className={'tag-list'}>
        {
          Array.from(new Set(tags)).map(item=>{
            return <Tag key={item} tag={item}></Tag>
          })
        }
      </div>
    </div>

  );
}
