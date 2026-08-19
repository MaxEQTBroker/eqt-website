import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalSection, LegalList } from "@/components/legal/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EQT Real Estate Brokerage LLC collects, uses and protects your personal data when you use eqt.ae or make an enquiry, and your rights under UAE data protection law.",
  alternates: { canonical: "/privacy-policy" },
};

const { email, phone } = site.contact;
const addr = site.contact.address;
const fullAddress = `${addr.street}, ${addr.city}, United Arab Emirates`;

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      path="/privacy-policy"
      intro={`This policy explains how ${site.legalName} ("EQT", "we", "us") collects, uses and safeguards your personal data when you use ${site.url.replace("https://", "")} or contact us.`}
    >
      <LegalSection heading="Who we are">
        <p>
          {site.legalName} is a real estate brokerage licensed in Dubai, United Arab Emirates
          (RERA ORN {site.regulatory.reraOrn}, DED licence {site.regulatory.dedLicense}). We are the
          data controller responsible for your personal data. You can reach us at{" "}
          <a href={`mailto:${email}`} className="link-quiet">{email}</a>, on {phone}, or by post at{" "}
          {fullAddress}.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>We only collect what we need to respond to you and provide our services:</p>
        <LegalList
          items={[
            <><strong className="text-ink">Contact details</strong> you give us: your name, phone number, email address or WhatsApp number.</>,
            <><strong className="text-ink">Enquiry details</strong>: the information you share through our enquiry and valuation forms, such as whether you are buying, selling, investing or relocating, your preferred community, budget, timeframe and property details.</>,
            <><strong className="text-ink">Message content</strong>: anything you send us by form, email or WhatsApp.</>,
            <><strong className="text-ink">Technical and usage data</strong>: your device, browser, IP address and how you use the site, collected through cookies and analytics (see our <Link href="/cookies" className="link-quiet">Cookie Policy</Link>).</>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="How we use your data">
        <LegalList
          items={[
            "To respond to your enquiry and prepare property shortlists or valuations.",
            "To provide, arrange and administer our brokerage services.",
            "To contact you about properties, market updates or your enquiry, by phone, email or WhatsApp.",
            "To operate, secure and improve our website and understand how it is used.",
            "To meet our legal, regulatory and tax obligations in the UAE.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Legal basis">
        <p>
          We process your data on the basis of your consent (given when you submit a form or contact
          us), to take steps at your request before entering an agreement, to perform our services,
          and to comply with our legal obligations. We handle your data in line with UAE Federal
          Decree-Law No. 45 of 2021 on the Protection of Personal Data.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing your data">
        <p>We never sell your personal data. We share it only with:</p>
        <LegalList
          items={[
            "Our advisors and staff who handle your enquiry.",
            "Trusted service providers who help us operate, such as our CRM and lead-management system, hosting provider, WhatsApp (Meta) for messaging, and Google Analytics for website measurement.",
            "Developers, sellers or other parties where necessary to progress a transaction you have asked us to pursue.",
            "Authorities or regulators where we are legally required to do so.",
          ]}
        />
        <p>
          Some of these providers may process data outside the UAE. Where that happens, we take
          reasonable steps to ensure your data remains protected.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep your personal data only for as long as needed to serve your enquiry, meet our
          regulatory and record-keeping obligations, and support any ongoing relationship. When it is
          no longer needed, we securely delete or anonymise it.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>Subject to UAE law, you may:</p>
        <LegalList
          items={[
            "Ask for a copy of the personal data we hold about you.",
            "Ask us to correct or update inaccurate data.",
            "Ask us to delete your data where there is no overriding legal reason to keep it.",
            "Withdraw your consent or ask us to stop contacting you at any time.",
          ]}
        />
        <p>
          To exercise any of these, email us at{" "}
          <a href={`mailto:${email}`} className="link-quiet">{email}</a>. We will respond within a
          reasonable time.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We use appropriate technical and organisational measures to protect your data against loss,
          misuse and unauthorised access. No method of transmission over the internet is completely
          secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The current version is always published on
          this page with its revision date.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about this policy or your data? Email{" "}
          <a href={`mailto:${email}`} className="link-quiet">{email}</a> or write to us at{" "}
          {fullAddress}.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
