import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
import * as dayjs from "dayjs";

export default function ChartYMD() {
  const { items } = useUser();
  let data = [...items];
  data.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  // 現在値のみ
  const curr = data.reduce((acm, i) => acm + i.ktype * i.amount, 0);
  // 累積
  let acc: number[] = [];
  let cur = 0;
  data.forEach((i) => {
    const v = i.ktype * i.amount;
    cur += v;
    acc.push(cur);
  });
  return (
    <ChartBox
      data={acc}
      header={data.map((i) => dayjs(i.date).format("YYYY-MM-DDTHH:mm"))}
    />
  );
}
