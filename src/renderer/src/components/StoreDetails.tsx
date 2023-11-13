import { randomIntByLength, randomString } from "@renderer/utils.js";

/* TODO Extract this from database? */
const store = {
  /** https://ileaveandlive.com/2021/01/18/funny-business-names-pandemic-version/ */
  name: "C. Belen-11 Store", // cspell:disable-line
  /** https://www.grcdi.nl/gsb/philippines.html */
  address: ["979 Kundiman St., Sampaloc", "Manila, Philippines, 1009"], // cspell:disable-line
  tin: [randomIntByLength(3), randomIntByLength(3), randomIntByLength(4)].join(" "), // prettier-ignore
  min: randomIntByLength(18),
  contact: [
    "(+63)",
    randomIntByLength(3),
    randomIntByLength(3),
    randomIntByLength(4),
  ].join(" "),
  sn: randomString(8),
};

export function StoreDetails() {
  return (
    <ol className="text-center">
      <li>{store.name}</li>
      <li>{store.address[0]}</li>
      <li>{store.address[1]}</li>
      <li>TIN: {store.tin}</li>
      <li>MIN: {store.min}</li>
      <li>S/N: {store.sn}</li>
      <li>{store.contact}</li>
    </ol>
  );
}
