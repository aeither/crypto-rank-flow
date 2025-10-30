interface HighlightCardProps {
  flag: string;
  title: string;
  description: string;
}

export const HighlightCard = ({ flag, title, description }: HighlightCardProps) => {
  return (
    <div className="border border-border rounded-lg p-6 bg-card hover:bg-card/80 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl flex-shrink-0">
          {flag}
        </div>
      </div>
      <p className="text-sm leading-relaxed">
        <span className="font-semibold">{title}</span> {description}
      </p>
    </div>
  );
};
