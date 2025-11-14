"use client";
import { useEffect, useState } from "react";
import apiService from "@/lib/services/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


interface Web {
    id: string;
    name: string;
    content: string;
    domain: string;
    userId: string;
}

export default function Page() {
    const [webs, setWebs] = useState<Web[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [domain, setDomain] = useState("");

    const router = useRouter();
    const mainFeUrl = process.env.NEXT_PUBLIC_MAIN_FE_URL || "http://localhost:3000";
    mainFeUrl.replace('http://', '').replace('https://', '');
    // Fetch all webs for the user
    const fetchWebs = async () => {
        setLoading(true);
        try {
            const response = await apiService.getUserWebs();
            if (response.error) {
                console.error("Error fetching webs:", response.error);
                alert("Failed to fetch webs: " + response.error);
            } else if (response.data) {
                setWebs(response.data);
            }
        } catch (error) {
            console.error("Error fetching webs:", error);
            alert("Failed to fetch webs");
        } finally {
            setLoading(false);
        }
    };

    // Create new web
    const handleCreateWeb = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !content || !domain) {
            alert("Please fill in all fields");
            return;
        }

        setCreating(true);
        try {
            const response = await apiService.createWeb(name, content, domain);
            if (response.error) {
                alert("Failed to create web: " + response.error);
            } else {
                // Reset form
                setName("");
                setContent("");
                setDomain("");
                setShowForm(false);
                // Refresh webs list
                await fetchWebs();
                alert("Web created successfully!");
            }
        } catch (error) {
            console.error("Error creating web:", error);
            alert("Failed to create web");
        } finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        fetchWebs();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Webs</h1>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    variant={showForm ? "outline" : "default"}
                >
                    {showForm ? "Cancel" : "Create New Web"}
                </Button>
            </div>

            {/* Create Web Form */}
            {showForm && (
                <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Create New Web</h2>
                    <form onSubmit={handleCreateWeb} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <Input
                                type="text"
                                placeholder="Enter web name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Domain</label>
                            <Input
                                type="text"
                                placeholder="example.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter web content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={creating}>
                                {creating ? "Creating..." : "Create Web"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false);
                                    setName("");
                                    setContent("");
                                    setDomain("");
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <p className="text-gray-600">Loading webs...</p>
                </div>
            )}

            {/* Webs List */}
            {!loading && webs.length === 0 && (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                    <p className="text-gray-600 mb-4">No webs found. Create your first web!</p>
                    <Button onClick={() => setShowForm(true)}>Create Web</Button>
                </div>
            )}

            {!loading && webs.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {webs.map((web) => (
                        <div
                            key={web.id}
                            className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-2">{web.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Domain:</span> {web.domain}
                            </p>
                            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                                {web.content}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const isCustomDomain = web.domain.includes('.');
                                        const url = isCustomDomain
                                            ? `https://${web.domain}`
                                            : `https://${web.domain}.${mainFeUrl.replace(/^https?:\/\//, '')}`;

                                        router.push(url);
                                    }}

                                >
                                    View
                                </Button>

                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
