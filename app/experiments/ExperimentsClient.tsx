"use client";

import { Container } from "../../components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import { Experiment } from "../../lib/experiments-data";

interface ExperimentsPageProps {
  experiments: Experiment[];
}

export default function ExperimentsPage({ experiments }: ExperimentsPageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedExperiment = experiments.find((e) => e.id === selectedId);

  return (
    <Container className="pt-32 pb-20 min-h-screen">
      <div className="flex flex-col lg:flex-row-reverse lg:justify-between gap-12 lg:gap-24">
        {/* RIGHT COLUMN: Headline */}
        <div className="lg:w-1/3 text-right sticky top-32 self-start z-10">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
            Shared experiments in AI, interaction, and emerging tech.
          </h1>
          <p className="text-zinc-500 text-lg font-light hidden lg:block">
            Work-in-progress prototypes, explorations and tools I have created. These pieces often sit between R&D and production, potentially useful for sensing what&apos;s possible before committing to a full build.
          </p>
        </div>

        {/* LEFT COLUMN: Grid */}
        <div className="lg:w-2/3 relative">
          <div className="grid grid-cols-1 gap-6">
            {experiments.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`relative w-full aspect-[16/2] cursor-pointer overflow-hidden rounded-sm bg-zinc-900 group ${selectedId && selectedId !== exp.id ? "grayscale opacity-30" : ""
                  } transition-all duration-500 border border-zinc-800 hover:border-zinc-600`}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <p className="text-xs text-white font-mono tracking-wider uppercase mb-2">
                    {exp.category}
                  </p>
                  <h3 className="text-3xl font-light text-white tracking-tight">
                    {exp.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* OVERLAY - FIXED POSITION, MAXIMIZED */}
          <AnimatePresence>
            {selectedId && selectedExperiment && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-12 pointer-events-none">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedId(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-lg pointer-events-auto"
                />

                {/* Modal Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full max-w-7xl h-[85vh] bg-zinc-950 border border-zinc-800 shadow-2xl pointer-events-auto flex flex-col md:flex-row overflow-hidden mt-16 mb-16"
                  style={{ maxHeight: 'calc(100vh - 8rem)' }} // Ensure header/footer clearance
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-zinc-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>

                  {/* Left: Image (Sticky) */}
                  <div className="relative w-full md:w-1/2 h-64 md:h-full flex-shrink-0 bg-zinc-900">
                    <Image
                      src={selectedExperiment.image}
                      alt="Selected experiment"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Right: Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-8 md:p-16 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <div className="max-w-2xl mx-auto space-y-10 pb-20">

                      {/* Header */}
                      <div>
                        <span className="text-white/60 font-mono text-xs uppercase tracking-widest mb-4 block">
                          {selectedExperiment.category}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                          {selectedExperiment.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {selectedExperiment.tags?.map(tag => (
                            <span key={tag} className="text-xs border border-zinc-800 text-zinc-400 px-2 py-1 rounded-full uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xl md:text-2xl font-light text-zinc-200 leading-relaxed border-l-2 border-white/20 pl-6">
                          {selectedExperiment.description}
                        </p>
                      </div>

                      {/* Main Body Copy or Layout */}
                      <div className="prose prose-invert prose-lg max-w-none text-zinc-400 space-y-8">
                        {selectedExperiment.layout && selectedExperiment.layout.length > 0 ? (
                          selectedExperiment.layout.map((block) => (
                            <div key={block.id}>
                              {block.type === "text" && (
                                <p className="whitespace-pre-line leading-loose">
                                  {block.content}
                                </p>
                              )}
                              {block.type === "image" && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800">
                                  <Image
                                    src={block.content}
                                    alt="Process detail"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="whitespace-pre-line leading-loose">
                            {selectedExperiment.longDescription}
                          </p>
                        )}

                        {/* Details Footer */}
                        <div className="mt-12 p-8 border border-zinc-900 bg-zinc-900/30 rounded-lg">
                          <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Technical Details</p>
                          <ul className="list-disc pl-5 space-y-2 text-base">
                            <li>Stack: {selectedExperiment.tags?.join(", ")}</li>
                            <li>Status: Prototype / R&D</li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
