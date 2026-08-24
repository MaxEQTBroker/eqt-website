import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalSection, LegalList } from "@/components/legal/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How eqt.ae uses cookies and similar technologies, the cookies we set, and how you can control them.",
  alternates: { canonical: "/cookies" },
};

const { email } = site.contact;

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      title="Cookie Policy"
      path="/cookies"
      intro="This policy explains how we use cookies and similar technologies on this website, and how you can control them."
    >
      <LegalSection heading="What cookies are">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the
          site work, remember your actions and help us understand how the site is used.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies we use">
        <p>We keep our use of cookies deliberately light. We use:</p>
        <LegalList
          items={[
            <><strong className="text-ink">Essential cookies</strong>: needed for the website to function and be served securely. These are always on.</>,
            <><strong className="text-ink">Analytics cookies</strong>: we use Google Analytics 4 to understand how visitors find and use the site so we can improve it. Google sets cookies such as <code>_ga</code> and <code>_ga_&lt;id&gt;</code> to distinguish visitors and measure usage. This data is aggregated and not used to identify you personally.</>,
          ]}
        />
        <p>
          We do not use advertising or cross-site tracking cookies. Some pages link out to services
          such as WhatsApp, Instagram or Google, which may set their own cookies once you visit them;
          those are governed by the relevant provider's policy.
        </p>
      </LegalSection>

      <LegalSection heading="Managing cookies">
        <p>
          You can control or delete cookies through your browser settings, and set your browser to
          block them. Doing so will not stop you using the site, though some features may behave
          differently. To opt out of Google Analytics across all sites, you can install Google's{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet"
          >
            opt-out browser add-on
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="More information">
        <p>
          For how we handle the data collected through cookies, see our{" "}
          <Link href="/privacy-policy" className="link-quiet">Privacy Policy</Link>. Questions about
          this policy? Email <a href={`mailto:${email}`} className="link-quiet">{email}</a>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
