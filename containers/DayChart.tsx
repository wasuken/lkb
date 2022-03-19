import { useEffect, useState } from "react";
import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
/* import * as dayjs from "dayjs"; */
import { default as dayjs } from 'dayjs';
import { default as isBetween} from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function DayChart() {
  const { items } = useUser();
  const [ymd, setYmd] = useState<string | undefined>(undefined);
  let data = [...items];
  data.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  let months = new Set<string>();
  let days = new Set<string>();
  let [map, setMap] = useState<Map<string, number>>(new Map<string, number>());

  data.forEach((x) => {
    const m: string = dayjs(x.date).format("YYYY/MM");
    const d: string = dayjs(x.date).format("YYYY/MM/DD");
    months.add(m);
    days.add(d);
  });

  useEffect(() => {
    let mmap = new Map<string, number>();
    if (months.size >= 1 && ymd === undefined) setYmd(Array.from(months)[0]);
    const rg = new RegExp(`^${ymd}`);
    data.forEach((x) => {
      const m: string = dayjs(x.date).format("YYYY/MM");
      const d: string = dayjs(x.date).format("YYYY/MM/DD");
      if (m.match(rg)) {
        if (!mmap.get(d)) {
          mmap.set(d, x.amount * x.ktype);
        } else {
          const old = mmap.get(d) ?? 0;
          mmap.set(d, old + x.amount * x.ktype);
        }
      }
    });
    setMap(mmap);
  }, [ymd]);

  return (
    <div>
      <select onChange={(e) => setYmd(e.target.value)} value={ymd}>
        {Array.from(months).map((x, i) => (
          <option value={x} key={i}>
            {x}
          </option>
        ))}
      </select>
      <ChartBox
        data={Array.from(map.values())}
        header={Array.from(map.keys())}
      />
    </div>
  );
}
