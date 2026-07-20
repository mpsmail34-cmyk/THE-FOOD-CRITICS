import React, { useState } from "react";
import { pdrSections } from "../data/pdr";
import { PdrSection } from "../types";
import { Search, ChevronDown, BookOpen, Layers, Menu, FileText, ChevronRight } from "lucide-react";

export default function PdrExplorer() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Spec Chapters" },
    { key: "Strategic", label: "Strategic Vision" },
    { key: "Product & UX", label: "Product & UX UI" },
    { key: "Technical Design", label: "Technical Design" },
    { key: "AI & Features", label: "AI & Smart Features" },
    { key: "Marketing & Security", label: "Security & Growth" },
    { key: "Project Lifecycle", label: "Project Lifecycle" },
  ];

  const currentSection = pdrSections.find((s) => s.id === selectedSectionId) || pdrSections[0];

  // Filter sections by category and search query
  const filteredSections = pdrSections.filter((section) => {
    const matchesCategory = activeCategory === "all" || section.category === activeCategory;
    const matchesSearch =
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to parse simple markdown titles and lists into rich HTML elements safely
  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-base font-bold text-brand-text mt-5 mb-2.5 border-b border-brand-border/20 pb-1.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }

      // Heading 4
      if (trimmed.startsWith("####")) {
        return (
          <h4 key={idx} className="text-sm font-bold text-emerald-400 mt-4 mb-2">
            {trimmed.replace("####", "").trim()}
          </h4>
        );
      }

      // Bullet points
      if (trimmed.startsWith("-")) {
        // Check for strong text inside bullet point
        const parts = trimmed.replace("-", "").trim().split("**");
        if (parts.length >= 3) {
          return (
            <li key={idx} className="text-xs text-brand-text-muted list-none pl-4 relative my-1.5">
              <span className="absolute left-0 text-brand-accent">•</span>
              <strong>{parts[1]}</strong>
              {parts.slice(2).join("")}
            </li>
          );
        }
        return (
          <li key={idx} className="text-xs text-brand-text-muted list-none pl-4 relative my-1.5">
            <span className="absolute left-0 text-brand-accent">•</span>
            {trimmed.replace("-", "").trim()}
          </li>
        );
      }

      // Table parsing (simple check)
      if (trimmed.startsWith("|")) {
        // Skip separators
        if (trimmed.includes("---")) return null;
        const columns = trimmed
          .split("|")
          .map((col) => col.trim())
          .filter((col) => col !== "");

        const isHeader = line.toLowerCase().includes("field") || line.toLowerCase().includes("competitor");

        return (
          <div key={idx} className={`grid grid-cols-${columns.length} gap-2 p-2.5 text-xs font-mono border-b border-brand-border/10 ${
            isHeader ? "bg-brand-border/30 text-brand-text font-bold" : "text-brand-text-muted hover:bg-brand-border/5"
          }`}>
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="truncate" title={col}>
                {col}
              </div>
            ))}
          </div>
        );
      }

      // Code blocks
      if (trimmed.startsWith("```")) {
        if (trimmed === "```" || trimmed === "```json") return null;
        return null;
      }
      if (line.includes("├──") || line.includes("└──") || line.includes("│")) {
        return (
          <pre key={idx} className="bg-brand-bg/60 p-3 rounded-xl border border-brand-border/30 font-mono text-[10px] text-brand-accent overflow-x-auto my-2">
            {line}
          </pre>
        );
      }

      // Paragraph
      if (trimmed.length > 0) {
        // Check if strong text
        const strongParts = trimmed.split("**");
        if (strongParts.length >= 3) {
          return (
            <p key={idx} className="text-xs text-brand-text-muted leading-relaxed my-2">
              {strongParts.map((part, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="text-brand-text">{part}</strong> : part))}
            </p>
          );
        }
        return (
          <p key={idx} className="text-xs text-brand-text-muted leading-relaxed my-2">
            {trimmed}
          </p>
        );
      }

      return <div key={idx} className="h-2" />;
    });
  };

  return (
    <div className="bg-brand-bg border border-brand-border/40 rounded-2xl overflow-hidden flex flex-col md:flex-row h-[600px] shadow-2xl">
      
      {/* Sidebar of Sections */}
      <div className={`${sidebarOpen ? "w-full md:w-80" : "w-0 md:w-0"} bg-brand-card/25 border-r border-brand-border/40 transition-all duration-300 flex flex-col overflow-hidden`}>
        {/* Search */}
        <div className="p-4 border-b border-brand-border/40 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-brand-text-muted" />
            <input
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-brand-bg border border-brand-border/60 rounded-xl text-xs text-brand-text placeholder-brand-text-muted/50 focus:outline-none focus:border-brand-accent"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex gap-2.5 items-center">
            <Layers className="w-3.5 h-3.5 text-brand-accent" />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-transparent border-none text-xs text-brand-text font-bold cursor-pointer focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key} className="bg-brand-card text-brand-text">
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List of sections */}
        <div className="flex-1 overflow-y-auto divide-y divide-brand-border/10">
          {filteredSections.length === 0 ? (
            <div className="p-6 text-center text-xs text-brand-text-muted italic">
              No matching specifications.
            </div>
          ) : (
            filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full p-3.5 text-left flex items-start gap-3 cursor-pointer hover:bg-brand-border/10 transition-colors ${
                  selectedSectionId === section.id
                    ? "bg-brand-accent/5 border-l-2 border-brand-accent"
                    : ""
                }`}
              >
                <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                  selectedSectionId === section.id ? "bg-brand-accent/10 text-brand-accent" : "bg-brand-border/20 text-brand-text-muted"
                }`}>
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-bold truncate ${
                    selectedSectionId === section.id ? "text-brand-text" : "text-brand-text-muted"
                  }`}>
                    {section.title}
                  </h4>
                  <span className="text-[10px] text-brand-text-muted/60 mt-0.5 block">
                    {section.category}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main content display section */}
      <div className="flex-1 flex flex-col min-w-0 bg-brand-bg/30">
        {/* Toggle Button / Breadcrumb */}
        <div className="p-3 bg-brand-card/25 border-b border-brand-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-brand-border hover:bg-brand-border/40 text-brand-text-muted cursor-pointer transition-colors"
              title="Toggle specifications sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-text-muted">
              <span>Smart BMI Spec Hub</span>
              <ChevronRight className="w-3.5 h-3.5 text-brand-border" />
              <span className="text-brand-accent font-semibold">{currentSection.category}</span>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-brand-text-muted">
            Section {currentSection.id} of 30
          </div>
        </div>

        {/* Content reader */}
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs bg-brand-accent/15 border border-brand-accent/30 text-brand-accent font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {currentSection.category} Specification
              </span>
              <BookOpen className="w-4 h-4 text-brand-text-muted" />
            </div>

            <h1 className="text-2xl font-bold text-brand-text tracking-tight border-b border-brand-border/30 pb-3">
              {currentSection.title}
            </h1>

            <div className="text-xs text-brand-text-muted leading-relaxed pt-2 space-y-1">
              {renderMarkdown(currentSection.content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
