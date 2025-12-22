"use client";

import { useState, useEffect } from "react";
import { Container } from "../../components/layout/Container";
import { Plus, Trash2, Save, MoveUp, MoveDown, Image as ImageIcon, Type } from "lucide-react";

interface LayoutItem {
    id: string;
    type: "text" | "image";
    content: string;
}

interface Experiment {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    featured: boolean;
    layout: LayoutItem[];
}

export default function AdminPage() {
    const [experiments, setExperiments] = useState<Experiment[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/experiments")
            .then((res) => res.json())
            .then((data) => {
                setExperiments(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/experiments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiments),
        });
        setSaving(false);
        alert("Saved successfully!");
    };

    const selectedExperiment = experiments.find((e) => e.id === selectedId);

    const updateExperiment = (field: keyof Experiment, value: any) => {
        setExperiments((prev) =>
            prev.map((e) => (e.id === selectedId ? { ...e, [field]: value } : e))
        );
    };

    const addLayoutItem = (type: "text" | "image") => {
        if (!selectedExperiment) return;
        const newItem: LayoutItem = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: "",
        };
        updateExperiment("layout", [...(selectedExperiment.layout || []), newItem]);
    };

    const updateLayoutItem = (itemId: string, content: string) => {
        if (!selectedExperiment) return;
        const newLayout = (selectedExperiment.layout || []).map((item) =>
            item.id === itemId ? { ...item, content } : item
        );
        updateExperiment("layout", newLayout);
    };

    const removeLayoutItem = (itemId: string) => {
        if (!selectedExperiment) return;
        const newLayout = (selectedExperiment.layout || []).filter(
            (item) => item.id !== itemId
        );
        updateExperiment("layout", newLayout);
    };

    const moveLayoutItem = (index: number, direction: -1 | 1) => {
        if (!selectedExperiment || !selectedExperiment.layout) return;
        const newLayout = [...selectedExperiment.layout];
        if (index + direction < 0 || index + direction >= newLayout.length) return;

        const temp = newLayout[index];
        newLayout[index] = newLayout[index + direction];
        newLayout[index + direction] = temp;

        updateExperiment("layout", newLayout);
    };

    const addNewExperiment = () => {
        const newExp: Experiment = {
            id: Math.random().toString(36).substr(2, 9),
            slug: "new-experiment",
            title: "New Experiment",
            category: "Category",
            description: "Short description...",
            longDescription: "Long description...",
            image: "/experiments/gen_art.png",
            tags: [],
            featured: false,
            layout: [],
        };
        setExperiments([...experiments, newExp]);
        setSelectedId(newExp.id);
    };

    const deleteExperiment = async () => {
        if (!selectedExperiment) return;
        if (!confirm("Are you sure you want to delete this experiment? This cannot be undone.")) return;

        const newExperiments = experiments.filter((e) => e.id !== selectedExperiment.id);
        setExperiments(newExperiments);
        setSelectedId(null);

        // Auto-save after delete
        await fetch("/api/experiments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExperiments),
        });
    };

    const handleFileUpload = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) return data.url;
            return null;
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
            return null;
        }
    };

    const onThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = await handleFileUpload(e.target.files[0]);
            if (url) updateExperiment("image", url);
        }
    };

    const onLayoutImageUpload = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = await handleFileUpload(e.target.files[0]);
            if (url) updateLayoutItem(itemId, url);
        }
    };

    if (loading) return <div className="p-20 text-white">Loading CMS...</div>;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 border-r border-zinc-800 flex flex-col pt-24 pb-8">
                <div className="px-6 mb-6">
                    <h1 className="text-xl font-bold tracking-tight text-white mb-2">CMS</h1>
                    <p className="text-xs text-zinc-500">Local Content Manager</p>
                </div>

                <div className="px-4 mb-4">
                    <button
                        onClick={addNewExperiment}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors"
                    >
                        <Plus size={16} /> New Experiment
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-1">
                    {experiments.map((exp) => (
                        <button
                            key={exp.id}
                            onClick={() => setSelectedId(exp.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedId === exp.id
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                                }`}
                        >
                            {exp.title}
                        </button>
                    ))}
                </div>


            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden pt-24">
                {selectedExperiment ? (
                    <>
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50 backdrop-blur-sm z-10">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Editing: {selectedExperiment.title}</h2>
                                <p className="text-xs text-zinc-500 font-mono">{selectedExperiment.id}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={deleteExperiment}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-900/50 text-red-200 text-sm font-medium hover:bg-red-900 transition-colors border border-red-900"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-500 transition-colors disabled:opacity-50"
                                >
                                    <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Form */}
                        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full pb-20">

                            {/* Basic Info */}
                            <div className="space-y-6 mb-12">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={selectedExperiment.title}
                                            onChange={(e) => updateExperiment("title", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Category</label>
                                        <input
                                            type="text"
                                            value={selectedExperiment.category}
                                            onChange={(e) => updateExperiment("category", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Short Description</label>
                                    <textarea
                                        value={selectedExperiment.description}
                                        onChange={(e) => updateExperiment("description", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 h-20 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Thumbnail</label>
                                    <div className="flex gap-4 items-center">
                                        {selectedExperiment.image && (
                                            <div className="relative w-24 h-24 rounded overflow-hidden border border-zinc-700 bg-black">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={selectedExperiment.image} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={selectedExperiment.image}
                                                onChange={(e) => updateExperiment("image", e.target.value)}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 font-mono mb-2"
                                                placeholder="Image URL or upload below"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onThumbnailUpload}
                                                className="block w-full text-sm text-zinc-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-zinc-800 file:text-zinc-300
                             hover:file:bg-zinc-700
                           "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Layout Builder */}
                            <div className="border-t border-zinc-800 pt-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-md font-semibold text-white">Page Layout</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => addLayoutItem("text")}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700 hover:text-white transition-colors"
                                        >
                                            <Type size={14} /> Add Text
                                        </button>
                                        <button
                                            onClick={() => addLayoutItem("image")}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700 hover:text-white transition-colors"
                                        >
                                            <ImageIcon size={14} /> Add Image
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {(selectedExperiment.layout || []).map((item, index) => (
                                        <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 group">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-xs font-mono text-zinc-500 uppercase bg-zinc-900 px-2 py-1 rounded inline-block">
                                                    {item.type} Block
                                                </span>
                                                <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => moveLayoutItem(index, -1)} className="p-1 hover:text-white"><MoveUp size={14} /></button>
                                                    <button onClick={() => moveLayoutItem(index, 1)} className="p-1 hover:text-white"><MoveDown size={14} /></button>
                                                    <button onClick={() => removeLayoutItem(item.id)} className="p-1 text-red-500 hover:text-red-400 ml-2"><Trash2 size={14} /></button>
                                                </div>
                                            </div>

                                            {item.type === "text" ? (
                                                <textarea
                                                    value={item.content}
                                                    onChange={(e) => updateLayoutItem(item.id, e.target.value)}
                                                    placeholder="Enter text..."
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 h-32"
                                                />
                                            ) : (
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            value={item.content}
                                                            onChange={(e) => updateLayoutItem(item.id, e.target.value)}
                                                            placeholder="Image URL..."
                                                            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 font-mono mb-2"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => onLayoutImageUpload(item.id, e)}
                                                            className="block w-full text-sm text-zinc-500
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-md file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-zinc-800 file:text-zinc-300
                                 hover:file:bg-zinc-700
                               "
                                                        />
                                                    </div>
                                                    {item.content && (
                                                        <div className="w-32 h-32 relative bg-zinc-900 border border-zinc-800 rounded overflow-hidden flex-shrink-0">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={item.content} alt="Preview" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {(selectedExperiment.layout || []).length === 0 && (
                                        <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg text-zinc-600">
                                            <p>No layout blocks yet. Add one above.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-500">
                        Select an experiment to edit
                    </div>
                )}
            </div>
        </div>
    );
}
