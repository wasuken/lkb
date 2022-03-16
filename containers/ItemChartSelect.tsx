import { useEffect, useState } from "react";
import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
import * as dayjs from "dayjs";
import { KakeiItem } from "../types/kakei";

export default function ItemChartSelect() {
  const { items, setItems } = useUser();
  let map: Map<string, Map<string, Map<string, KakeiItem>>> = new Map();
  useEffect(() => {
    items.forEach((i) => {
      const d = dayjs(i.date);
      const year: string = d.format("YYYY");
      const month: string = d.format("MM");
      const day: string = d.format("DD");
      if (!map.get(year)) map.set(year, new Map());
      if (!map.get(year)?.get(month)) map.get(year)?.set(month, new Map());
      if (!map.get(year)?.get(month)?.get(day)) {
        map.get(year)?.get(month)?.set(day, i);
      }
		console.log(map);
    });
  }, [items]);
  return <div></div>;
}
