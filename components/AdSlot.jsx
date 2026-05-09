import AdSenseUnit from "@/components/AdSenseUnit";

const DEFAULT_PUB_ID = "8620071569452620";
const DEFAULT_SLOT_ID = "7601032301";

export default function AdSlot({ position, variant = "banner" }) {
  return (
    <AdSenseUnit
      pId={DEFAULT_PUB_ID}
      slotId={DEFAULT_SLOT_ID}
      position={position}
      variant={variant}
    />
  );
}
