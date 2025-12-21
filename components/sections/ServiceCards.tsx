import { Container } from "../layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const services = [
  {
    title: "Discovery & Feasibility",
    body: "Clarify the problem, map constraints, and surface the sharpest opportunities before you commit to a build.",
  },
  {
    title: "Creative Technology Direction",
    body: "Translate concept into architecture, pick the right stack, and keep the work inventive without derailing delivery.",
  },
  {
    title: "Technical Project Management",
    body: "Hold the technical thread from RFP to opening night—vendors, budgets, risks, and realities included.",
  },
  {
    title: "R&D & Prototyping",
    body: "Build fast, honest prototypes that prove what’s possible and de-risk decisions for stakeholders.",
  },
];

export function ServiceCards() {
  return (
    <section style={{ borderBottom: '1px solid rgba(39, 39, 42, 0.3)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <Container>
        {/* Two-column header */}
        <div style={{ 
          marginBottom: '6rem', 
          display: 'grid', 
          gap: '4rem', 
          gridTemplateColumns: '1fr 1.5fr', 
          alignItems: 'start' 
        }}>
          <h2 style={{ 
            fontSize: 'clamp(3rem, 10vw, 8rem)', 
            fontWeight: 700, 
            lineHeight: '0.95', 
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}>
            Services
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#a1a1aa' }}>
              Flexible engagements from early discovery to delivery support.
            </p>
          </div>
        </div>
        
        {/* Service cards - minimal, no borders */}
        <div style={{ 
          display: 'grid', 
          gap: '3rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' 
        }}>
          {services.map((service) => (
            <div key={service.title} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.75', color: '#a1a1aa' }}>
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}



