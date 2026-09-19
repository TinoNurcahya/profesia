import StoryLabel from "./StoryLabel";

interface Chapter01PatternsProps {
  labels: {
    label: string;
    lead: string;
    item1: string;
    item1Desc: string;
    item2: string;
    item2Desc: string;
    item3: string;
    item3Desc: string;
    item4: string;
    item4Desc: string;
  };
}

export default function Chapter01Patterns({ labels }: Chapter01PatternsProps) {
  const patterns = [
    { title: labels.item1, description: labels.item1Desc },
    { title: labels.item2, description: labels.item2Desc },
    { title: labels.item3, description: labels.item3Desc },
    { title: labels.item4, description: labels.item4Desc },
  ];
  return <section className="atlas-chapter page-shell" aria-labelledby="patterns-heading"><div className="atlas-chapter-line"><StoryLabel label={labels.label} /></div><div className="grid gap-12 lg:grid-cols-12 lg:gap-16"><h2 id="patterns-heading" className="atlas-heading lg:col-span-5">{labels.lead}</h2><ol className="lg:col-span-7">{patterns.map((pattern,index) => <li key={pattern.title} className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-[var(--color-line)] py-7"><span className="atlas-caption pt-2" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><div><h3 className="text-2xl font-semibold tracking-tight">{pattern.title}</h3><p className="atlas-body mt-3">{pattern.description}</p></div></li>)}</ol></div></section>;
}
