"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import { fileIcon, folderIcon } from "./fileIcon";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import classnames from "classnames";
import "./index.css";

interface ITreeNode {
  name: string;
  isDir: boolean;
  ext?: string;
  childItemList?: ITreeNode[];
  open?: boolean;
  highLight?: boolean;
  comment?: string;
  className?: string;
  isRoot?: boolean;
}

interface ITreeProps {
  treeData: ITreeNode[];
  isRoot?: boolean;
}

type ITreeNodeProps = ITreeNode;

type ITreeNodeIconProps = Pick<
  ITreeNodeProps,
  "name" | "isDir" | "ext" | "open"
>;

export const TreeNodeIcon: React.FC<ITreeNodeIconProps> = (props) => {
  const resultIcon = useMemo(() => {
    const fileName = props.name.toLowerCase();
    let icon = undefined;
    if (props.isDir) {
      for (let i = 0; i < folderIcon.length; i++) {
        const item = folderIcon[i];
        if (
          Array.isArray(item.folderNames) &&
          item.folderNames.includes(fileName)
        ) {
          icon = item.name;
          break;
        }
      }
      if (icon === undefined) {
        icon = "folder-src";
      }
      if (props.open) {
        icon = icon + "-open";
      }
    } else {
      for (let i = 0; i < fileIcon.length; i++) {
        const item = fileIcon[i];
        if (
          Array.isArray(item.fileNames) &&
          item.fileNames.includes(fileName)
        ) {
          icon = item.name;
          break;
        } else {
          let ext = props.ext;
          if (ext === "map") {
            const list = fileName.split(".");
            ext = list[list.length - 2] + "." + list[list.length - 1];
          }
          if (
            Array.isArray(item.fileExtensions) &&
            item.fileExtensions.includes(ext)
          ) {
            icon = item.name;
            break;
          }
        }
      }
      if (icon === undefined) {
        icon = "document";
      }
    }
    return icon;
  }, [props.name, props.isDir, props.open, props.ext]);

  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#icon-${resultIcon}`}></use>
    </svg>
  );
};

export const TreeNode: React.FC<ITreeNodeProps> = (props) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, []);
  const iconClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className={classnames(["flex items-center", props.className], {
          "tree-node": props.isRoot === false,
        })}
      >
        <span
          className={classnames("flex items-center mr-1.5 cursor-pointer", {
            "ml-3": props.isRoot == false,
          })}
          onClick={iconClick}
        >
          {props.isDir && (
            <span className={"mr-1.5"}>
              {open && <AiFillCaretDown />}
              {!open && <AiFillCaretRight />}
            </span>
          )}
          <TreeNodeIcon {...props} open={open} />
        </span>
        <span
          className={"node-name"}
          data-comment={props.comment ? `// ${props.comment}` : ""}
        >
          {props.name}
        </span>
      </div>
      {Array.isArray(props.childItemList) &&
        props.childItemList.length > 0 &&
        open && <Tree isRoot={false} treeData={props.childItemList} />}
    </div>
  );
};

export const Tree: FC<ITreeProps> = (props) => {
  const isRoot = props.isRoot === undefined ? true : props.isRoot;
  const nodeList = props.treeData.length;
  return (
    <div
      className={classnames({
        "ml-8": isRoot === false,
      })}
    >
      {props.treeData.map((item, index) => {
        let className = "";
        if (index === nodeList - 1) {
          className = "last-node";
        }
        if (index === 0) {
          className = "first-node";
        }
        return (
          <TreeNode
            {...item}
            key={item.name}
            className={className}
            isRoot={isRoot}
          />
        );
      })}
    </div>
  );
};

export const TreeWrapper: FC<ITreeProps> = (props) => {
  return (
    <div className={"p-2 text-amber-50 rounded-xl"} style={{background: '#282A35'}}>
      <Tree treeData={props.treeData} />
    </div>
  );
};

export default TreeWrapper;
