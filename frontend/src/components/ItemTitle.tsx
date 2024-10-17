interface ItemTitleProps {
  title: string;
}

export default function ItemTitle({ title }: ItemTitleProps) {
  return <div className="text-2xl">{title}</div>;
}
