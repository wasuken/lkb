import { useState } from "react";
import { useUser } from "../context/user";
import { KakeiItem, KakeiType } from "../types/kakei";
import { Label, Button, Input } from "reactstrap";
import * as dayjs from "dayjs";

export default function ItemInput() {
  const { items, setItems } = useUser();
  const [iname, setIname] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [tp, setTp] = useState<boolean>(false);
  const [accDate, setAccDate] = useState<Date>(new Date());
  function submit() {
    let nitems: KakeiItem[] = [...items];
    const it: KakeiItem = {
      amount: amount,
      name: iname,
      ktype: tp ? KakeiType.Plus : KakeiType.Minus,
      date: accDate,
    };
    nitems.push(it);
    setItems(nitems);
    setIname("");
    setAmount(0);
    setAccDate(new Date());
    setTp(false);
  }
  return (
    <div>
      <div>
        <Label>
          金額
          <Input
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            placeholder="amount"
          />
        </Label>

        <Label>
          項目名
          <Input
            type="text"
            value={iname}
            onChange={(e) => setIname(e.target.value)}
            placeholder="name"
          />
        </Label>
        <div>
          <Label check>
            発生日
            <Input
              type="datetime-local"
              onChange={(e) => setAccDate(new Date(e.target.value))}
              value={dayjs(accDate).format("YYYY-MM-DDTHH:mm")}
              placeholder="date"
            />
          </Label>
        </div>
        <div>
          <Label check>
            <Input
              type="checkbox"
              checked={tp}
              onChange={(e) => setTp(e.target.checked)}
            />
            {tp ? "収入" : "支出"}
          </Label>
        </div>
      </div>
      <Button color="primary" outline onClick={submit}>
        submit
      </Button>
    </div>
  );
}
