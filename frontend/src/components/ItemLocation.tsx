interface ItemLocationProps {
  location: string | undefined;
}

export default function ItemLocation({ location }: ItemLocationProps) {
  return (
    <span className="text-text-secondary mb-2">
      <span className="material-symbols-outlined text-xl align-middle">
        location_on
      </span>
      <span className="align-middle mr-1 text-sm">{location}</span>
    </span>
  );
}
