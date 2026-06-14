import Link from "next/link";
import {
  meriBaiUrl,
  workerConnectLegalName,
  workerConnectUdyam,
  WORKERCONNECT_META_BRANDING,
} from "@/lib/meta-workerconnect-branding";

/** Temporary legal notice for Meta verification — remove by disabling the flag. */
export function WorkerConnectMetaNotice() {
  if (!WORKERCONNECT_META_BRANDING) return null;

  return (
    <section
      id="workerconnect-legal"
      aria-label="WorkerConnect legal business information"
      className="w-full border-b border-[#d4e8f0] bg-[#f0f8fc] px-4 py-3 text-center text-sm leading-relaxed text-[#1a4a5c]"
      style={{ fontFamily: "Figtree, sans-serif" }}
    >
      <p className="font-semibold text-[#0d3d52]">
        {workerConnectLegalName} — Udyam registered enterprise ({workerConnectUdyam})
      </p>
      <p className="mt-1 text-[#2d5f75]">
        MeriBai by {workerConnectLegalName} — WhatsApp household matching service.{" "}
        <Link href={meriBaiUrl} className="font-medium underline underline-offset-2">
          {meriBaiUrl}
        </Link>
      </p>
      <p className="mt-1 text-xs text-[#4a7a8f]">
        Frontier Challenge is operated by {workerConnectLegalName}.
      </p>
    </section>
  );
}
