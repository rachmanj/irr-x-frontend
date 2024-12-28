"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";

export default function InvoiceTypePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [invoiceTypes, setInvoiceTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoiceTypes = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/invoice-types`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.user?.accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch invoice types");
                }

                const data = await response.json();
                setInvoiceTypes(data);
            } catch (error) {
                console.error("Error fetching invoice types:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.accessToken) {
            fetchInvoiceTypes();
        }
    }, [session?.user?.accessToken]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Invoice Types</h1>
                <Button onClick={() => router.push("/dashboard/master/invoice-type/new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={invoiceTypes}
                loading={loading}
            />
        </div>
    );
}
