const EMAIL = "support@herocorp-pong.zendesk.com";

function BannerContent() {
  return (
    <>
      🚨&nbsp; Please reach out to support at{" "}
      <a
        href={`mailto:${EMAIL}`}
        className="underline underline-offset-2 hover:text-amber-950 transition-colors"
      >
        {EMAIL}
      </a>{" "}
      as your session is currently blocked &nbsp;•&nbsp;&nbsp; 🚨&nbsp; Please
      reach out to support at{" "}
      <a
        href={`mailto:${EMAIL}`}
        className="underline underline-offset-2 hover:text-amber-950 transition-colors"
      >
        {EMAIL}
      </a>{" "}
      as your session is currently blocked &nbsp;•&nbsp;
    </>
  );
}

export default function Banner() {
  return (
    <div className="banner-track w-full bg-amber-400 border-b border-amber-500 overflow-hidden h-9 flex items-center shrink-0">
      <div className="animate-marquee text-sm font-medium text-amber-900">
        <BannerContent />
      </div>
    </div>
  );
}
