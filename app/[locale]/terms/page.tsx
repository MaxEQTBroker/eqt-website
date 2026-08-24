import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalSection, LegalList } from "@/components/legal/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing your use of eqt.ae, EQT Real Estate Brokerage LLC's website, including intellectual property, listing accuracy and liability.",
  alternates: { canonical: "/terms" },
};

const { email } = site.contact;
const domain = site.url.replace("https://", "");

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      path="/terms"
      intro={`These terms govern your use of ${domain}. By using this website you agree to them. If you do not agree, please do not use the site.`}
    >
      <LegalSection heading="About us">
        <p>
          This website is operated by {site.legalName}, a real estate brokerage licensed in Dubai,
          United Arab Emirates (RERA ORN {site.regulatory.reraOrn}, DED licence{" "}
          {site.regulatory.dedLicense}). References to "EQT", "we", "us" and "our" mean{" "}
          {site.legalName}.
        </p>
      </LegalSection>

      <LegalSection heading="Use of the website">
        <p>You agree to use this website lawfully and not to:</p>
        <LegalList
          items={[
            "Use it in any way that breaches applicable UAE or other laws.",
            "Attempt to gain unauthorised access to the site, its servers or any connected system.",
            "Introduce viruses or other malicious or harmful material.",
            "Copy, scrape, republish or exploit any content for commercial purposes without our written permission.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Property listings and information">
        <p>
          Property details, prices, availability and imagery on this website are provided for general
          information and may change without notice. Listings are indicative and do not form part of
          any offer or contract. A significant share of our inventory is off-market and may not be
          shown here. While we take care to keep information accurate, we do not warrant that it is
          complete, current or error-free, and you should verify any detail important to you with us
          directly before relying on it.
        </p>
      </LegalSection>

      <LegalSection heading="No advice">
        <p>
          Nothing on this website constitutes legal, financial, tax or investment advice. Any market
          figures, guides or valuations are indicative only. You should obtain independent
          professional advice before making any property or investment decision.
        </p>
      </LegalSection>

      <LegalSection heading="Enquiries">
        <p>
          When you submit an enquiry or valuation request, you consent to us contacting you about it
          by phone, email or WhatsApp. We handle your information in line with our{" "}
          <Link href="/privacy-policy" className="link-quiet">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          All content on this website, including text, branding, logos, layout and design, is owned
          by or licensed to EQT and is protected by intellectual property laws. Photography is
          credited on our <Link href="/credits" className="link-quiet">Photography Credits</Link>{" "}
          page. You may not reproduce or reuse any content without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links">
        <p>
          This website may link to third-party sites and services (for example WhatsApp, Instagram or
          developer websites). We are not responsible for their content, availability or privacy
          practices, and a link does not imply our endorsement.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, EQT is not liable for any loss or damage arising
          from your use of, or inability to use, this website or from reliance on any content on it.
          This does not exclude any liability that cannot be excluded under UAE law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the United Arab Emirates as applied in the Emirate
          of Dubai, and any disputes are subject to the exclusive jurisdiction of the Dubai courts.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p>
          We may update these terms from time to time; the current version is always published on
          this page. Questions? Email{" "}
          <a href={`mailto:${email}`} className="link-quiet">{email}</a>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
