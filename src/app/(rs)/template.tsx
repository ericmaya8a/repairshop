export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-appear">{children}</div>;
}
