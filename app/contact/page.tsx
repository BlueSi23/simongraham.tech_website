import { ContactForm } from "../../components/sections/ContactForm";

export const revalidate = 0;

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
      <ContactForm />
    </div>
  );
}
