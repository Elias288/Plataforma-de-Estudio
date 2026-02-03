type MarkedDate = {
  date: string;
  color?: string;
  label?: string;
};
type Props = {
  year: number;
  month: number;
  markedDates: MarkedDate[];
};

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const Calendar = ({ year, month, markedDates = [] }: Props) => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startDay = (firstDay.getDay() + 6) % 7;

  const getMarkedDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return markedDates.find((d) => d.date === dateStr);
  };

  const cells = [];

  for (let i = 0; i < startDay; i++) cells.push(<div key={`empty-${i}`} />);

  for (let day = 1; day <= daysInMonth; day++) {
    const marked = getMarkedDate(day);

    cells.push(
      <div
        key={day}
        title={marked?.label}
        style={{
          padding: '4px',
          borderRadius: '6px',
          background: marked?.color ?? '#f1f3f5',
          textAlign: 'center',
          cursor: marked ? 'pointer' : 'default',
          fontWeight: marked ? 'bold' : 'normal',
        }}
      >
        {day}
      </div>,
    );
  }
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
          marginBottom: 6,
          fontWeight: 'bold',
        }}
      >
        {weekDays.map((d) => (
          <div key={d} style={{ textAlign: 'center' }}>
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
        }}
      >
        {cells}
      </div>
    </div>
  );
};
