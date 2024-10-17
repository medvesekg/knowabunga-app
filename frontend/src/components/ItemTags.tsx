export interface ItemTagsProps {
  tags: string[];
}

export default function ItemTags({ tags }: ItemTagsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {(tags || []).map((tag) => (
        <div
          key={tag}
          className="border text-text-secondary border-text-secondary rounded-md inline-block px-3"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
