import { getUserWebs, createWeb } from "@/lib/actions/web-action";
import { Web } from "@/lib/types/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const dynamic = "force-dynamic"; // ensures SSR on every request

export default async function Page() {
    const response = await getUserWebs();
    const webs: Web[] = response?.data || [];

    return (
        <div className="w-full overflow-x-hidden">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Webs</h1>

                {/* Create Web Form - SERVER ACTION FORM */}
                <form
                    action={async (formData: FormData) => {
                        "use server";
                        const name = formData.get("name") as string;
                        const domain = formData.get("domain") as string;
                        const content = formData.get("content") as string;

                        await createWeb(name, content, domain);
                    }}
                    className="mb-10 p-6 border rounded-lg bg-white shadow-sm space-y-4"
                >
                    <h2 className="text-xl font-semibold">Create New Web</h2>

                    <input
                        name="name"
                        required
                        className="border w-full p-2 rounded"
                        placeholder="Web name"
                    />

                    <input
                        name="domain"
                        required
                        className="border w-full p-2 rounded"
                        placeholder="example.com"
                    />

                    <textarea
                        name="content"
                        required
                        className="border w-full p-2 rounded min-h-[100px]"
                        placeholder="Web content..."
                    />

                    <Button type="submit">Create Web</Button>
                </form>



                <div className="flex flex-col gap-4">

                {webs.map((web) => {
                    const isCustomDomain = web.domain.includes(".");
                    const host = process.env.NEXT_PUBLIC_MAIN_FE_URL?.replace(/^https?:\/\//, "") || "";
                    const url = isCustomDomain
                        ? `https://${web.domain}`
                        : `https://${web.domain}.${host}`;

                    return (
                        <div
                            key={web.id}
                            className="p-6 border rounded-lg bg-white shadow-sm"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {web.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Domain:</strong> {web.domain}
                            </p>

                            <p className="text-sm text-gray-700 line-clamp-3">
                                {web.content}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <Link href={url} target="_blank">
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </Link>

                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            </div>
                        </div>
                        );
                    })}
                </div>

            </main>

        </div>
    );
}
