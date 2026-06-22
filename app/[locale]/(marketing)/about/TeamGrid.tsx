"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  socials: Record<string, string>;
  content: string;
}

interface TeamGridProps {
  teamList: TeamMember[];
  translations: {
    skills: string;
    connect: string;
  };
}

export default function TeamGrid({ teamList, translations }: TeamGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamList.map((member) => (
          <div 
            key={member.slug} 
            onClick={() => setSelectedMember(member)}
            className="group relative flex flex-col justify-end aspect-[3/4] rounded-3xl overflow-hidden border border-border/50 bg-white dark:bg-card shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <Image 
              src={member.avatar || "/static/images/team/default.jpg"} 
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {/* Subtle bottom shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Name and Role Overlay Box */}
            <div className="relative z-10 m-4 p-4 text-center rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-lg">
              <div className="font-extrabold text-foreground dark:text-white text-base leading-tight">
                {member.name}
              </div>
              <div className="text-xs font-semibold text-primary dark:text-white/85 mt-1">
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Glassmorphic Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setSelectedMember(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border/80 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full border border-border bg-white/80 dark:bg-zinc-900/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Photo & Socials */}
            <div className="w-full md:w-[40%] bg-muted/20 border-b md:border-b-0 md:border-r border-border/60 p-8 flex flex-col items-center justify-center gap-6 shrink-0">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-border/80 shadow-md">
                <Image 
                  src={selectedMember.avatar || "/static/images/team/default.jpg"} 
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              
              {/* Socials */}
              {Object.keys(selectedMember.socials).length > 0 && (
                <div className="text-center space-y-3 w-full">
                  <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {translations.connect}
                  </div>
                  <div className="flex gap-3 justify-center">
                    {selectedMember.socials.linkedin && (
                      <a 
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-border bg-white dark:bg-zinc-900 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-200 shadow-sm"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.socials.github && selectedMember.socials.github !== "#" && (
                      <a 
                        href={selectedMember.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-border bg-white dark:bg-zinc-900 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-200 shadow-sm"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Info & Details */}
            <div className="flex-grow p-8 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground dark:text-white leading-tight">
                  {selectedMember.name}
                </h3>
                <p className="text-primary dark:text-white/85 font-bold text-base">
                  {selectedMember.role}
                </p>
              </div>

              {/* Bio & Content */}
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {selectedMember.bio}
                </p>
                {selectedMember.content && (
                  <div 
                    className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none leading-relaxed border-t border-border/50 pt-4"
                    dangerouslySetInnerHTML={{ __html: selectedMember.content }}
                  />
                )}
              </div>

              {/* Skills */}
              {selectedMember.skills && selectedMember.skills.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {translations.skills}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-border bg-muted/40 text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
