import { useUser } from "../context/user";
import { useState, useEffect } from "react";
import { KakeiItem } from "../types/kakei";
import {
  Button,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Label,
} from "reactstrap";
import { default as dayjs } from 'dayjs';
import { default as isBetween} from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface KakeiCheckItem extends KakeiItem {
  originIndex: number; // 元々の位置
  checked: boolean;
}

export default function ItemInput() {
  const { items, setItems } = useUser();
  const [checkItems, setCheckItems] = useState<KakeiCheckItem[]>(
    items.map((i, ind) => {
      const ni = { ...i, checked: false, originIndex: ind };
      return ni;
    })
  );

  const [dispDateBegin, setDispDateBegin] = useState<Date>(dayjs().startOf('week').toDate());
  const [dispDateEnd, setDispDateEnd] = useState<Date>(dayjs().endOf('week').toDate());
  useEffect(() => {
    setCheckItems(
      items.map((i, ind) => {
        const ni = { ...i, checked: false, originIndex: ind };
        return ni;
      })
    );
  }, [items]);

  function check(v: boolean, i: number) {
    let niList = [...checkItems];
    niList[i].checked = v;
    setCheckItems(niList);
  }
  function deleteSelected() {
    let niList: KakeiItem[] = [];
    let rmList: number[] = [];
    [...checkItems].forEach((i) => {
      if (i.checked) {
        rmList.push(i.originIndex);
      }
    });
    items.forEach((i, ind) => {
      if (!rmList.includes(ind)) {
        niList.push(i);
      }
    });
    setItems(niList);
  }
  function clearSelected() {
    let niList = [...checkItems];
    setCheckItems(
      niList.map((i) => {
        return { ...i, checked: false };
      })
    );
  }
  function allSelect() {
    let niList = [...checkItems];
    setCheckItems(
      niList.map((i) => {
        return { ...i, checked: true };
      })
    );
  }
  function setBegin(dt: Date) {
    if (dayjs(dispDateEnd).isAfter(dayjs(dt))) {
      setDispDateBegin(dt);
    }
  }
  function setEnd(dt: Date) {
    if (dayjs(dt).isAfter(dayjs(dispDateBegin))) {
      setDispDateEnd(dt);
    }
  }
  function dtFilter() {
    const b = dayjs(dispDateBegin);
    const e = dayjs(dispDateEnd);
    const v = checkItems.filter((i) => dayjs(i.date).isBetween(b, e));
    return v;
  }

  return (
    <div className="container">
      <div className="row mb-2">
        <Label className="col-md-5 col-xs-12">
          家計簿表示範囲開始
          <Input
            type="datetime-local"
            placeholder="begin of kakie book range"
            onChange={(e) => setBegin(new Date(e.target.value))}
            value={dayjs(dispDateBegin).format("YYYY-MM-DDTHH:mm")}
          />
        </Label>
        <div className="tilda mt-4 h3 col-md-1 col-xs-1">
          <p className="exp">〜</p>
        </div>
        <Label className="col-md-5 col-xs-12">
          家計簿表示範囲終了
          <Input
            type="datetime-local"
            placeholder="end of kakie book range"
            onChange={(e) => setEnd(new Date(e.target.value))}
            value={dayjs(dispDateEnd).format("YYYY-MM-DDTHH:mm")}
          />
        </Label>
      </div>
      <div className="container row mb-2">
        <Button
          className="col-md-2 col-xs-4"
          color="primary"
          outline
          onClick={deleteSelected}
        >
          削除
        </Button>
        <Button
          className="col-md-2 col-xs-4"
          color="primary"
          outline
          onClick={clearSelected}
        >
          選択クリア
        </Button>
        <Button
          className="col-md-2 col-xs-4"
          color="primary"
          outline
          onClick={allSelect}
        >
          全選択
        </Button>
      </div>
      <div className="row">
        {dtFilter().map((item, i) => (
          <div
            className={
              "d-flex justify-content-" + (item.ktype == 1 ? "start" : "end")
            }
            key={i}
          >
            <Card className="w-50">
              <CardBody>
                <CardTitle tag="h5">
                  <Input
                    className="mx-2"
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => check(e.target.checked, i)}
                  />
                  {item.name}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {item.amount * item.ktype}
                </CardSubtitle>
                <CardText>
                  {item.ktype == 1 ? "収入" : "支出"}
                  <hr />
                  {dayjs(item.date).format("YYYY/MM/DD hh:mm:ss")}
                </CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
