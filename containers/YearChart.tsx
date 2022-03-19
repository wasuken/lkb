import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
import { default as dayjs } from 'dayjs';
import { default as isBetween} from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function YearChart() {
	const { items } = useUser();
	let data = [...items];
  let map = new Map<number, number>();
	data.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
	data.forEach((x) => {
		const y = x.date.getFullYear();
		if (!map.get(y)) {
			map.set(y, x.amount * x.ktype);
		} else {
			const old = map.get(y) ?? 0;
			map.set(y, old + x.amount * x.ktype);
		}
	});

	return (
		<ChartBox
			data={Array.from(map.values())}
			header={Array.from(map.keys()).map((x) => `${x}`)}
		/>
	);
}
