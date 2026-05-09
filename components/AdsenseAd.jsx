import AdSenseUnit from "@/components/AdSenseUnit";

export default function AdsenseAd({
  pId,
  slotId,
  format = "auto",
  responsive = "true",
  style = { display: "block" },
  className = "",
}) {
  return (
    <AdSenseUnit
      pId={pId}
      slotId={slotId}
      format={format}
      responsive={responsive}
      style={style}
      className={className}
    />
  );
}
