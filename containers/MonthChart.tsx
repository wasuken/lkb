import { useEffect, useState } from "react";
import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
import { default as dayjs } from 'dayjs';
import { default as isBetween} from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function MonthChart() {
	const { items } = useUser();
  const [ym, setYm] = useState<string | undefined>(undefined);
  let data = [...items];
  data.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  let months = new Set<string>();
  let years = new Set<string>();
  let [map, setMap] = useState<Map<string, number>>(new Map<string, number>());

  data.forEach((x) => {
    const y: string = dayjs(x.date).format("YYYY");
    const m: string = dayjs(x.date).format("YYYY/MM");
    months.add(m);
    years.add(y);
  });

  useEffect(() => {
    let mmap = new Map<string, number>();
    if (years.size >= 1 && ym === undefined) setYm(Array.from(years)[0]);
    const rg = new RegExp(`^${ym}`);
    data.forEach((x) => {
      const y: string = dayjs(x.date).format("YYYY");
      const m: string = dayjs(x.date).format("YYYY/MM");
      if (y.match(rg)) {
        if (!mmap.get(m)) {
          mmap.set(m, x.amount * x.ktype);
        } else {
          const old = mmap.get(m) ?? 0;
          mmap.set(m, old + x.amount * x.ktype);
        }
      }
    });
    setMap(mmap);
  }, [ym]);

  return (
    <div>
      <select onChange={(e) => setYm(e.target.value)} value={ym}>
        {Array.from(years).map((x, i) => (
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
