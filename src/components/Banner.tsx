const MESSAGE =
  "⚠️  Please reach out to support at support@dotfilehelp.zendesk.com as your session is currently blocked  •  " +
  "⚠️  Please reach out to support at support@dotfilehelp.zendesk.com as your session is currently blocked  •  ";

export default function Banner() {
  return (
    <div className="w-full bg-amber-400 border-b border-amber-500 overflow-hidden h-9 flex items-center shrink-0">
      <div className="animate-marquee text-sm font-medium text-amber-900">
        {MESSAGE}
      </div>
    </div>
  );
}
