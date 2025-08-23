import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function ProjectForge() {
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem("pf_projects_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [aiMode, setAiMode] = useState("phases");
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("pf_projects_v1", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function createProject() {
    if (!title.trim()) return setToast("Please add a project title");
    const id = Date.now().toString();
    const newProj = {
      id,
      title: title.trim(),
      summary: summary.trim(),
      tasks: [],
      generated: {},
      createdAt: new Date().toISOString(),
    };
    setProjects((p) => [newProj, ...p]);
    setTitle("");
    setSummary("");
    setActiveId(id);
    setToast("Project created");
  }

  function removeProject(id) {
    setProjects((p) => p.filter((x) => x.id !== id));
    if (activeId === id) setActiveId(null);
    setToast("Project removed");
  }

  function addTask(projectId, taskText) {
    if (!taskText.trim()) return;
    setProjects((ps) =>
      ps.map((proj) =>
        proj.id === projectId
          ? { ...proj, tasks: [...proj.tasks, { id: Date.now().toString(), text: taskText, done: false }] }
          : proj
      )
    );
  }

  function toggleTask(projectId, taskId) {
    setProjects((ps) =>
      ps.map((proj) =>
        proj.id === projectId
          ? { ...proj, tasks: proj.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : proj
      )
    );
  }

  function deterministicGenerate(prompt, mode) {
    const seeded = `${prompt}`.toLowerCase();
    const words = seeded.split(/\s+/).filter(Boolean);
    const size = Math.min(5, Math.max(2, Math.ceil(words.length / 3)));

    if (mode === "phases") {
      const phases = Array.from({ length: size }, (_, i) => {
        const name = `Phase ${i + 1}: ${words[i] ? capitalize(words[i]) : "Setup"}`;
        const desc = `Goal: ${shorten(prompt, 10)} — key activities include ${take(words, 3, i).join(", ") || "planning, design"}.`;
        const duration = `${7 * (i + 1)} days`;
        return { name, desc, duration };
      });
      return { type: "phases", phases };
    }

    if (mode === "milestones") {
      const milestones = Array.from({ length: size + 1 }, (_, i) => ({
        id: i + 1,
        milestone: `Milestone ${i + 1}`,
        due: plusDaysISO(i * 7),
        note: `Finish ${take(words, 2, i).join(" ") || "core work"}`,
      }));
      return { type: "milestones", milestones };
    }

    const risks = take(words, 6, 0).map((w, idx) => ({
      id: idx + 1,
      risk: `${capitalize(w)}-related delay or dependency`,
      mitigation: `Clarify ${w} early, add contingency of ${3 + idx} days`,
    }));
    return { type: "risks", risks };
  }

  function generateForProject(projectId, mode) {
    setProjects((ps) =>
      ps.map((proj) => {
        if (proj.id !== projectId) return proj;
        const generated = deterministicGenerate(proj.summary || proj.title, mode);
        return { ...proj, generated };
      })
    );
    setToast("Generated — check the right pane");
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `projectforge-export-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast("Export started");
  }

  function importJSON(file) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) throw new Error("Expected array");
        setProjects((p) => [...data, ...p]);
        setToast("Imported projects");
      } catch (err) {
        setToast("Invalid file");
      }
    };
    r.readAsText(file);
  }

  const visible = projects.filter((p) => (filter === "all" ? true : filter === "hasGenerated" ? !!p.generated?.type : p.tasks.length > 0));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Card className="p-4">
            <CardContent>
              <h2 className="text-2xl font-semibold">ProjectForge</h2>
              <p className="text-sm text-slate-600 mt-1">Create projects, auto-generate plans, and export JSON. All local — private to your browser.</p>

              <div className="mt-4">
                <Input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="w-full mt-2 p-2 border rounded h-24" placeholder="Short summary or prompt" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <div className="flex gap-2 mt-2">
                  <Button onClick={createProject}>Create</Button>
                  <Button onClick={exportJSON}>Export</Button>
                  <label className="inline-flex items-center px-3 py-2 border rounded cursor-pointer">
                    <input type="file" accept="application/json" className="hidden" onChange={(e) => importJSON(e.target.files?.[0])} />
                    Import
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="hasGenerated">Has generated plan</SelectItem>
                    <SelectItem value="hasTasks">Has tasks</SelectItem>
                  </Select>
                  <Select value={aiMode} onChange={(e) => setAiMode(e.target.value)}>
                    <SelectItem value="phases">Phases</SelectItem>
                    <SelectItem value="milestones">Milestones</SelectItem>
                    <SelectItem value="risks">Risks</SelectItem>
                  </Select>
                  <div className="text-sm text-slate-500">Mode</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {visible.map((proj) => (
                  <motion.div key={proj.id} whileHover={{ scale: 1.01 }} className={`p-2 border rounded ${activeId === proj.id ? "ring-2 ring-indigo-200" : ""}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{proj.title}</div>
                        <div className="text-xs text-slate-500">{shorten(proj.summary || "—", 8)}</div>
                        <div className="text-xs text-slate-400">Tasks: {proj.tasks.length} • Generated: {proj.generated?.type || "—"}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => { setActiveId(proj.id); }}>Open</Button>
                        <Button onClick={() => generateForProject(proj.id, aiMode)}>Generate</Button>
                        <Button onClick={() => removeProject(proj.id)}>Delete</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-8">
          <Card className="p-4">
            <CardContent>
              {!activeId ? (
                <div className="text-center py-20 text-slate-400">Select a project to see details and generated plans.</div>
              ) : (
                (() => {
                  const proj = projects.find((p) => p.id === activeId);
                  if (!proj) return <div>Project not found</div>;
                  return (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{proj.title}</h3>
                          <p className="text-sm text-slate-600">{proj.summary}</p>
                          <div className="text-xs text-slate-500 mt-1">Created {new Date(proj.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => generateForProject(proj.id, aiMode)}>Regenerate ({aiMode})</Button>
                          <Button onClick={() => { navigator.clipboard.writeText(JSON.stringify(proj, null, 2)); setToast("Copied project JSON"); }}>Copy JSON</Button>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Tasks</h4>
                          <TaskEditor project={proj} onAdd={(t) => addTask(proj.id, t)} onToggle={(tid) => toggleTask(proj.id, tid)} />
                        </div>
                        <div>
                          <h4 className="font-medium">Generated</h4>
                          <GeneratedView generated={proj.generated} />
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {toast && (
        <div className="fixed right-6 bottom-6 p-3 bg-slate-900 text-white rounded">{toast}</div>
      )}
    </div>
  );
}

function TaskEditor({ project, onAdd, onToggle }) {
  const [text, setText] = useState("");
  return (
    <div>
      <div className="flex gap-2">
        <Input placeholder="New task" value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={() => { onAdd(text); setText(""); }}>Add</Button>
      </div>
      <div className="mt-2 space-y-2">
        {project.tasks.length === 0 ? <div className="text-sm text-slate-400">No tasks yet</div> : project.tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-2 p-2 border rounded">
            <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
            <div className={`${t.done ? "line-through text-slate-400" : ""}`}>{t.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratedView({ generated }) {
  if (!generated) return <div className="text-sm text-slate-400">No generated plan — click Generate</div>;
  if (generated.type === "phases") {
    return (
      <div>
        {generated.phases.map((ph, idx) => (
          <div key={idx} className="p-2 border rounded mb-2">
            <div className="font-medium">{ph.name} <span className="text-xs text-slate-400">• {ph.duration}</span></div>
            <div className="text-sm text-slate-600">{ph.desc}</div>
          </div>
        ))}
      </div>
    );
  }
  if (generated.type === "milestones") {
    return (
      <div>
        {generated.milestones.map((m) => (
          <div key={m.id} className="p-2 border rounded mb-2">
            <div className="font-medium">{m.milestone} <span className="text-xs text-slate-400">• due {new Date(m.due).toLocaleDateString()}</span></div>
            <div className="text-sm text-slate-600">{m.note}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {generated.risks.map((r) => (
        <div key={r.id} className="p-2 border rounded mb-2">
          <div className="font-medium">{r.risk}</div>
          <div className="text-sm text-slate-600">Mitigation: {r.mitigation}</div>
        </div>
      ))}
    </div>
  );
}

function capitalize(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
function shorten(s, words = 6) { return s ? s.split(/\s+/).slice(0, words).join(" ") + (s.split(/\s+/).length > words ? "…" : "") : ""; }
function take(words, n, offset = 0) { return words.slice(offset, offset + n); }
function plusDaysISO(days) { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString(); }
