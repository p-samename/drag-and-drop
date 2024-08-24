"use client";
import Image from "next/image";
import { useRef, useState, DragEvent } from "react";

const arrayList: string[] = ["list1", "list2", "list3", "list4"];

export default function Home() {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dndList, setDndList] = useState<string[]>(arrayList);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "0";
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, idx: number) => {
    dragItem.current = idx;
    console.log("drag-start ::: ", idx, e);
  };

  const handleEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const list = [...dndList];
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const dragItemContent = list[dragItem.current];
      list.splice(dragItem.current, 1);
      list.splice(dragOverItem.current, 0, dragItemContent);

      setDndList(list);
    }
    e.currentTarget.style.top = "0px";
    e.currentTarget.style.left = "0px";
    e.currentTarget.style.opacity = "1";
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, idx: number) => {
    e.preventDefault();
    dragOverItem.current = idx;
    console.log("drag-end ::: ", idx);
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
