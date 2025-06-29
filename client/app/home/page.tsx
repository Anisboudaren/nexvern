/* eslint-disable @next/next/no-img-element */
import ProjectPopCard from "@/components/Project-pop-card";
import ProjectCard2 from "@/components/Projet-card";

const sampleProject = {
  id: "1",
  projectId: "1",
  title: "Bookingz.one booking management with AI",
  description:
    "Bookingz.one is a smart booking platform with an AI-powered booking bot. Built for service businesses, it's fully customizable, scalable, and ready for partners to grow and profit with.",
  category: "AI",
  teamSize: 1,
  stage: "MVP Stage",
  stageColor: "#22d3ee",
  founder: "Jason Lee",
  datePosted: "2024-06-29",
  website: "https://bookingz.one",
  status: "Development",
  marginRate: "15-25%",
  roles: [
    {
      title: "Growth Partner",
      description: "Help scale our platform and acquire new customers",
    },
    {
      title: "Chief Technology Officer",
      description: "Lead technical strategy and development team",
    },
    {
      title: "Chief Marketing Officer",
      description: "Drive marketing strategy and brand growth",
    },
  ],
  image: "https://chekin.com/wp-content/uploads/2022/12/booking.com_-768x432.jpeg",
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-semibold text-foreground relative inline-block">
        {title}
       <span className="absolute left-0 bottom-[-10px] w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      </h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-muted min-h-svh flex flex-col">
      {/* Top bar */}
      <div className="flex justify-end items-center p-4">
        <div className="flex items-center gap-2 bg-white rounded px-3 py-1 shadow text-sm">
          <img src="/logo-purple.png" alt="Logo" className="w-6 h-6" />
          <span className="text-gray-700">You are logged in</span>
        </div>
      </div>

      {/* Active Startups Section */}
      <section className="px-6 md:px-10 pt-6">
        <SectionTitle title="Active Startups" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-8xl mx-auto">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProjectCard2 key={idx} project={sampleProject} />
          ))}
        </div>
      </section>

      {/* Explore Opportunities Section */}
      <section className="px-6 md:px-10 pt-14 pb-10">
        <SectionTitle title="Explore Opportunities" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-8xl mx-auto">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProjectPopCard key={idx} project={sampleProject} />
          ))}
        </div>
      </section>
    </div>
  );
}
