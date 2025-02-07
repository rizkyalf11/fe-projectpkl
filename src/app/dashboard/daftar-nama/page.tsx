import { TypographyH1 } from "@/components/h1";
import { TypographyH2 } from "@/components/h2";
import { TypographyP } from "@/components/p";
import React from "react";

export default function DaftarNamaPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="w-full overflow-y-auto px-4 pb-4"
      >
        <TypographyH1>Hello World</TypographyH1>
        <TypographyH2>Hello World</TypographyH2>
        <TypographyP>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quod tempora ut ex praesentium corrupti earum, repudiandae dolorem officiis itaque. ipsum dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</TypographyP>
      </div>
    </div>
  );
}
