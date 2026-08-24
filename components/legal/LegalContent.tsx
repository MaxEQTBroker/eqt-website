import { Fragment, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { LegalDoc, LegalSection, LegalList } from "./LegalDoc";
import { site } from "@/lib/site";

/** A block inside a legal section: a paragraph, a plain list, or a list whose
 * items lead with a bold term. Text may contain {tokens} (see renderText). */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ulRich"; items: { lead: string; text: string }[] };

export type LegalDocContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: { heading: string; blocks: LegalBlock[] }[];
  privacyLinkText?: string;
  cookieLinkText?: string;
  creditsLinkText?: string;
  gaOptOutText?: string;
};

const { email, phone } = site.contact;
const addr = site.contact.address;
const fullAddress = `${addr.street}, ${addr.city}, United Arab Emirates`;
const domain = site.url.replace("https://", "");

/**
 * Render a legal string, replacing a fixed set of {tokens} with real values or
 * links. Keeps translated copy free of embedded markup while still producing the
 * correct mailto/anchor/Link elements and bold contact values.
 */
function renderText(text: string, d: LegalDocContent): ReactNode {
  const parts = text.split(/(\{[a-zA-Z]+\})/g);
  return parts.map((part, i) => {
    switch (part) {
      case "{email}":
        return <a key={i} href={`mailto:${email}`} className="link-quiet">{email}</a>;
      case "{phone}":
        return <Fragment key={i}>{phone}</Fragment>;
      case "{address}":
        return <Fragment key={i}>{fullAddress}</Fragment>;
      case "{domain}":
      case "{url}":
        return <Fragment key={i}>{domain}</Fragment>;
      case "{legalName}":
        return <Fragment key={i}>{site.legalName}</Fragment>;
      case "{orn}":
        return <Fragment key={i}>{site.regulatory.reraOrn}</Fragment>;
      case "{ded}":
        return <Fragment key={i}>{site.regulatory.dedLicense}</Fragment>;
      case "{privacyLink}":
        return <Link key={i} href="/privacy-policy" className="link-quiet">{d.privacyLinkText}</Link>;
      case "{cookieLink}":
        return <Link key={i} href="/cookies" className="link-quiet">{d.cookieLinkText}</Link>;
      case "{creditsLink}":
        return <Link key={i} href="/credits" className="link-quiet">{d.creditsLinkText}</Link>;
      case "{gaOptOut}":
        return (
          <a key={i} href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="link-quiet">
            {d.gaOptOutText}
          </a>
        );
      default:
        return <Fragment key={i}>{part}</Fragment>;
    }
  });
}

export function LegalContent({
  doc,
  path,
  eyebrow,
  lastUpdatedLabel,
}: {
  doc: LegalDocContent;
  path: string;
  eyebrow?: string;
  lastUpdatedLabel?: string;
}) {
  return (
    <LegalDoc
      title={doc.title}
      path={path}
      intro={renderText(doc.intro, doc)}
      eyebrow={eyebrow}
      lastUpdatedLabel={lastUpdatedLabel}
    >
      {doc.sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          {section.blocks.map((block, bi) => {
            if (block.type === "p") {
              return <p key={bi}>{renderText(block.text, doc)}</p>;
            }
            if (block.type === "ul") {
              return <LegalList key={bi} items={block.items.map((it) => renderText(it, doc))} />;
            }
            return (
              <LegalList
                key={bi}
                items={block.items.map((it) => (
                  <>
                    <strong className="text-ink">{it.lead}</strong>
                    {renderText(it.text, doc)}
                  </>
                ))}
              />
            );
          })}
        </LegalSection>
      ))}
    </LegalDoc>
  );
}
