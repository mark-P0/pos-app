function TableRow(props: { entry: [string, string | number] }) {
  const { entry } = props;
  const [key, value] = entry;

  return (
    <tr>
      <th className="text-left font-normal normal-case">{key}</th>
      <td>:</td>
      <td>{value}</td>
    </tr>
  );
}

export function MapTable(props: { mapping: Record<string, string | number> }) {
  const { mapping } = props;

  return (
    <table className="w-full [&_td:nth-child(3)]:text-right">
      <colgroup>
        <col span={1} className="w-[calc(5/12*100%)]" />
        <col span={1} className="w-[calc(1/12*100%)]" />
        <col span={1} className="w-[calc(6/12*100%)]" />
      </colgroup>
      <thead>
        {Object.entries(mapping).map((entry, idx) => (
          <TableRow key={idx} entry={entry} />
        ))}
      </thead>
    </table>
  );
}
