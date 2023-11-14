import { random$intByLength, random$string } from "@renderer/utils/random.js";

/* TODO Extract the following from database? */
let store$name: string,
  store$address: string[],
  store$tin: string,
  store$min: number,
  store$contact: string,
  store$sn: string;
{
  /** https://ileaveandlive.com/2021/01/18/funny-business-names-pandemic-version/ */
  store$name = "C. Belen-11 Store"; // cspell:disable-line
  /** https://www.grcdi.nl/gsb/philippines.html */
  store$address = [
    "979 Kundiman St., Sampaloc", // cspell:disable-line
    "Manila, Philippines, 1009",
  ];
  store$tin = [random$intByLength(3), random$intByLength(3), random$intByLength(4)].join(" ") // prettier-ignore
  store$min = random$intByLength(18);
  store$contact = [
    "(+63)",
    random$intByLength(3),
    random$intByLength(3),
    random$intByLength(4),
  ].join(" ");
  store$sn = random$string(8);
}

export function StoreDetails() {
  return (
    <ol className="text-center">
      <li>{store$name}</li>
      <li>{store$address[0]}</li>
      <li>{store$address[1]}</li>
      <li>TIN: {store$tin}</li>
      <li>MIN: {store$min}</li>
      <li>S/N: {store$sn}</li>
      <li>{store$contact}</li>
    </ol>
  );
}
