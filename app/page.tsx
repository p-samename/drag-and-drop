"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const arrayList = ["list1", "list2", "list3", "list4"];

export default function Home() {
  const [onDrag, setOnDrag] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [dndList, setDndList] = useState(arrayList);

  const handleDrag = (e) => {
    setOnDrag(true);
    e.target.style.opacity = 0;
  };

  const handleDragStart = (e, idx) => {
    dragItem.current = idx;
    console.log("drag-start ::::::::::: ", idx, e);
  };

  const handleEnd = (e) => {
    e.preventDefault();
    const list = [...dndList];
    const dragItemConotent = list[dragItem.current];
    list.splice(dragItem.current, 1);
    list.splice(dragOverItem.current, 0, dragItemConotent);

    setDndList(list);

    e.target.style.top = "0px";
    e.target.style.left = "0px";
    e.target.style.opacity = 1;
  };

  const handleDragEnter = (e, idx) => {
    e.preventDefault();
    dragOverItem.current = idx;
    console.log("drag-end ::::::::::: ", idx);
  };

  return (
    <main>
      <div className="flex gap-[12px] justify-center w-max mt-[120px] mx-auto p-[20px] border-[1px]">
        {dndList.map((v, idx) => {
          return (
            <div
              key={idx}
              draggable
              onDrag={handleDrag}
              onDragEnd={handleEnd}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnter={(e) => handleDragEnter(e, idx)}
              className="cursor-move flex justify-center items-center bg-slate-500 w-[100px] h-[100px] transition-all rounded-[16px]"
            >
              {v}
            </div>
          );
        })}
      </div>
    </main>
  );
}
