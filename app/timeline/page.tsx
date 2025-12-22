import { Container } from '../../components/layout/Container';

// Work history with refined responsibilities
const workHistory = [
    {
        company: 'Freelance / Self-Employed',
        url: '#',
        role: 'Creative Technologist | Innovation Consultant | Technical Director',
        startYear: 2026,
        endYear: 2026,
        responsibilities: [
            'Contracting to provide creative discovery, technical architecture and creative technology direction, surfacing opportunities and translating concepts into buildable systems.',
            'Leads technical project delivery from RFP to launch, including hands-on R&D prototyping that proves feasibility and de-risks stakeholder decisions.',
        ],
    },
    {
        company: 'DREAMLAB - AI',
        url: 'https://www.dreamlab-ai.com',
        role: 'Member',
        startYear: 2026,
        endYear: 2026,
        responsibilities: [
            'Innovation Studio & Community of artists, developers and pioneers working across AI, Realtime, Games, Immersive & Film.',
        ],
    },
    {
        company: 'Pixel Artworks',
        url: 'https://www.pixelartworks.com/work/',
        role: 'Creative Technology Director',
        startYear: 2024,
        endYear: 2025,
        responsibilities: [
            'Led creative technology strategy for immersive, interactive and AI-driven brand experiences across digital and physical environments.',
            'Bridged creative, client and engineering teams to deliver realtime installations, experiential campaigns and scalable toolsets at scale and pace.',
        ],
    },
    {
        company: 'Immersive International',
        url: 'https://www.immersive.international/projects',
        role: 'Head of Technical Innovation',
        startYear: 2021,
        endYear: 2024,
        responsibilities: [
            'Directed the studio\'s innovation practice, managing global teams and seven-figure budgets for immersive AV and realtime solutions.',
            'Embedded Gen AI, automation and emerging tech into workflows, growing the IP portfolio and launching new experiential products.',
        ],
    },
    {
        company: 'QED Productions',
        url: 'https://www.qed-productions.com/projection-mapping-videos',
        role: 'Technical Production Manager',
        startYear: 2019,
        endYear: 2021,
        responsibilities: [
            'Led technical delivery of projection mapping, light festivals, domes and interactive installations for major brands and broadcasters.',
            'Designed workflows and tools that made complex AV and media-server systems usable for creative and production teams.',
        ],
    },
    {
        company: 'Light Initiative',
        url: 'https://www.lightinitiative.com/work',
        role: 'Account / Project Manager',
        startYear: 2016,
        endYear: 2019,
        responsibilities: [
            'Managed key broadcast and live entertainment accounts, delivering bespoke scenic LED, video mapping and interactive systems.',
            'Coordinated design, fabrication and development teams to turn creative treatments into production-ready experiential solutions.',
        ],
    },
    {
        company: 'Media Powerhouse',
        url: 'https://www.media-powerhouse.com',
        role: 'On-Site Video & Media Server Technician',
        startYear: 2015,
        endYear: 2016,
        responsibilities: [
            'Engineered AV and interactive systems for live events, overseeing show networks, IT and cloud-based media workflows.',
        ],
    },
    {
        company: 'Avolites',
        url: 'https://www.youtube.com/watch?v=xbLHgxbfT7U',
        role: 'Trainer, Service & Support Engineer',
        startYear: 2013,
        endYear: 2015,
        responsibilities: [
            'Delivered training, frontline support, and show programming globally for media server and show-control platforms, advising on system design for large-scale events.',
        ],
    },
    {
        company: 'Abstract Space',
        url: '#',
        role: 'Video Installation Artist',
        startYear: 2011,
        endYear: 2014,
        responsibilities: [
            'Created immersive video installations using realtime graphics, motion tracking and video mapping for galleries and events as part of a digital artists collective.',
        ],
    },
    {
        company: 'Freelance / Self-Employed',
        url: '#',
        role: 'Artist & Workshop Coordinator',
        startYear: 2003,
        endYear: 2011,
        responsibilities: [
            'Designed and delivered video installations and workshops, teaching creative software and interactive media to diverse groups.',
        ],
    },
];

const currentYear = 2026; // Using 2026 to show ongoing roles as "Present"

export default function TimelinePage() {
    return (
        <div style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
            <Container>
                <header style={{ marginBottom: '2rem' }}>
                    <p style={{
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#71717a',
                        marginBottom: '0.5rem'
                    }}>
                        Timeline
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        marginBottom: '0.75rem'
                    }}>
                        Career Experience Timeline
                    </h1>
                    <p style={{
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        color: '#a1a1aa',
                        maxWidth: '42rem'
                    }}>
                        2003 to present
                    </p>
                </header>

                {/* Timeline - Simple list */}
                <div style={{ maxWidth: '48rem' }}>
                    {workHistory.map((job, jobIdx) => (
                        <div
                            key={`${job.company}-${jobIdx}`}
                            style={{
                                marginBottom: '1.5rem',
                                paddingBottom: '1.5rem',
                                borderBottom: jobIdx < workHistory.length - 1 ? '1px solid rgba(39, 39, 42, 0.2)' : 'none',
                            }}
                        >
                            {/* Role Title & Year Range */}
                            <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.125rem',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {job.role}
                                </h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#71717a',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {job.startYear}–{job.endYear === currentYear ? 'Present' : job.endYear}
                                </span>
                            </div>

                            {/* Company */}
                            <p style={{ marginBottom: '0.5rem' }}>
                                {job.url !== '#' ? (
                                    <a
                                        href={job.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            color: '#a1a1aa',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {job.company} ↗
                                    </a>
                                ) : (
                                    <span style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#a1a1aa',
                                    }}>
                                        {job.company}
                                    </span>
                                )}
                            </p>

                            {/* Responsibilities */}
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                            }}>
                                {job.responsibilities.map((resp, respIdx) => (
                                    <li
                                        key={respIdx}
                                        style={{
                                            fontSize: '0.8125rem',
                                            color: '#d4d4d8',
                                            lineHeight: '1.5',
                                            paddingLeft: '0.875rem',
                                            position: 'relative',
                                        }}
                                    >
                                        <span style={{
                                            position: 'absolute',
                                            left: '0',
                                            color: '#71717a',
                                            fontSize: '0.75rem',
                                        }}>•</span>
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
