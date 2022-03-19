import { useEffect, useState } from "react";
import ChartBox from "../components/ChartBox";
import { useUser } from "../context/user";
import * as dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { KakeiItem } from "../types/kakei";
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";

export default function ItemChartSelect() {
	const { items } = useUser();
	const [year, setYear] = useState<string | null>(null);
	const [month, setMonth] = useState<string | null>(null);
	const [day, setDay] = useState<string | null>(null);
	function renderKFmt(item: KakeiItem) {
		return (
			<div>
				<p>項目名: {item.name}</p>
				<p>金額: {item.amount}</p>
				<p>登録日: {dayjs(item.date).format("YYYY/MM/DD HH:mm:ss")}</p>
			</div>
		);
	}
	function ymdRecurRenderY() {
		let dt_s = "";
		if (year !== null) dt_s += year;
		if (month !== null) dt_s += "/" + month;
		if (day !== null) dt_s += "/" + day;
		const dy = dayjs(dt_s);
		const rngItems = items.filter((x) => dayjs(x.date).is)
		return (
			<ul>
				{Array.from(node.keys()).map((k, i) => (
					<li key={i}>
						{node.get(k).kind === "string"
							? renderKFmt(node.get(k))
							: ymdRecurRender(node.get(k))}
					</li>
				))}
			</ul>
		);
	}
	return (
		<div>
			{Array.from(map.keys()).map((k, i) => ymdRecurRender(map.get(k)))}
		</div>
	);
}
