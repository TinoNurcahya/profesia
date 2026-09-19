interface StoryLabelProps { label: string; dark?: boolean }

export default function StoryLabel({ label }: StoryLabelProps) {
  return <span className="eyebrow">{label}</span>;
}
