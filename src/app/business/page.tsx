
"use client"

import { useState, useRef } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
    Loader2, Upload, Table as TableIcon, Hash, Building2,
    Download, Plus, Trash2, Settings2, Receipt, Box
} from "lucide-react"
import { parseInvoiceFromPdf, ParseInvoiceOutput } from "@/ai/flows/parse-invoice-from-pdf"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AsianPaintsInvoiceTemplate } from "@/components/business/invoice-templates"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export default function BusinessPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const { toast } = useToast()
    const invoiceRef = useRef<HTMLDivElement>(null)

    const form = useForm<ParseInvoiceOutput>({
        defaultValues: {
            documentType: "TAX INVOICE",
            invoiceNo: "",
            invoiceDate: "",
            seller: { name: "", address: "", gstin: "", pan: "", state: "", stateCode: "" },
            supplyingLocation: { name: "", address: "", gstin: "", stateCode: "" },
            billToParty: { name: "", address: "", gstin: "", stateCode: "" },
            shipToParty: { name: "", address: "", gstin: "", stateCode: "" },
            items: [],
            summary: { valueSale: 0, inBillDisc: 0, fastCashDisc: 0, taxableAmount: 0, centralGst: 0, stateGst: 0, commercialRounding: 0, totalDocumentAmount: 0 },
            details: { grossWeight: "", volumeTotal: "", netWeight: "", vehicleNo: "", termsOfPayment: "", dueDate: "", currency: "INR/Indian Rupee", storageLoc: "" }
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items" as any
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsAnalyzing(true)
        toast({ title: "Industrial Analysis...", description: "Replicating every column." })

        try {
            const reader = new FileReader()
            const dataUri = await new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string)
                reader.readAsDataURL(file)
            })

            const analysis = await parseInvoiceFromPdf(dataUri)
            form.reset(analysis)
            toast({ title: "Sync Complete", description: "All 13 columns and summary data extracted." })
        } catch (error: any) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Processing Failed",
                description: error.message || "Failed to analyze document. Please check your API configuration or try a smaller file."
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleDownloadPdf = async () => {
        if (!invoiceRef.current) return;
        setIsDownloading(true);
        toast({ title: "Rendering Industrial PDF...", description: "Capturing 1:1 Asian Paints layout." });

        try {
            const canvas = await html2canvas(invoiceRef.current, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * ratio, canvas.height * ratio);
            pdf.save(`AsianPaints_${form.getValues('invoiceNo') || 'Invoice'}.pdf`);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Export failed." });
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-100">
            <SiteHeader />
            <main className="flex-1 flex overflow-hidden">
                <div className="w-[600px] border-r border-slate-800 bg-[#020617] overflow-y-auto p-6 space-y-8 scrollbar-hide">
                    <div className="space-y-1">
                        <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                            <Receipt className="w-6 h-6 text-primary" />
                            Industrial Master
                        </h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">1:1 Asian Paints Replication</p>
                    </div>

                    <div className="relative group p-4 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/40 hover:border-primary/50 transition-all cursor-pointer">
                        <Input type="file" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} />
                        <div className="flex items-center justify-center gap-3">
                            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-slate-500" />}
                            <span className="font-bold text-slate-400">Sync Asian Paints PDF</span>
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                        <AccordionItem value="header" className="border-none bg-slate-900/40 rounded-2xl px-4">
                            <AccordionTrigger className="hover:no-underline text-xs font-black uppercase"><Settings2 className="w-4 h-4 mr-2" /> Header Info</AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <Input {...form.register("invoiceNo")} placeholder="Invoice No" className="bg-slate-950 border-slate-800 text-[11px]" />
                                <Input {...form.register("invoiceDate")} placeholder="Date" className="bg-slate-950 border-slate-800 text-[11px]" />
                                <Input {...form.register("irn")} placeholder="IRN No" className="bg-slate-950 border-slate-800 text-[11px] font-mono" />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="parties" className="border-none bg-slate-900/40 rounded-2xl px-4">
                            <AccordionTrigger className="hover:no-underline text-xs font-black uppercase"><Building2 className="w-4 h-4 mr-2" /> Party Details</AccordionTrigger>
                            <AccordionContent className="space-y-4 pb-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-primary">BILL TO</Label>
                                    <Input {...form.register("billToParty.name")} className="bg-slate-950 border-slate-800 text-[11px]" />
                                    <Input {...form.register("billToParty.address")} className="bg-slate-950 border-slate-800 text-[11px]" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-emerald-400">SHIP TO</Label>
                                    <Input {...form.register("shipToParty.name")} className="bg-slate-950 border-slate-800 text-[11px]" />
                                    <Input {...form.register("shipToParty.address")} className="bg-slate-950 border-slate-800 text-[11px]" />
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="items" className="border-none bg-slate-900/40 rounded-2xl px-4">
                            <AccordionTrigger className="hover:no-underline text-xs font-black uppercase"><TableIcon className="w-4 h-4 mr-2" /> 13-Column List</AccordionTrigger>
                            <AccordionContent className="space-y-4 pb-4">
                                {fields.map((field, index) => (
                                    <Card key={field.id} className="bg-slate-950 border-none p-4 space-y-2 relative">
                                        <div className="flex justify-between items-center mb-1">
                                            <Label className="text-[9px] text-slate-500 font-black italic">ITEM #{index + 1}</Label>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => remove(index)}><Trash2 className="w-3" /></Button>
                                        </div>
                                        <Input {...form.register(`items.${index}.description` as any)} placeholder="Description" className="bg-slate-900 border-none h-8 text-[11px] font-bold text-white" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input {...form.register(`items.${index}.materialHsn` as any)} placeholder="HSN" className="bg-slate-900 border-none h-8 text-[11px] font-mono text-white" />
                                            <Input {...form.register(`items.${index}.volume` as any)} placeholder="Volume (Kg/Lt/M)" className="bg-slate-900 border-none h-8 text-[11px] text-white" />
                                        </div>
                                        <div className="grid grid-cols-4 gap-1">
                                            <Input type="number" {...form.register(`items.${index}.qty` as any)} placeholder="Qty" className="bg-slate-900 border-none h-7 text-[10px] text-white" />
                                            <Input type="number" {...form.register(`items.${index}.rate` as any)} placeholder="Rate" className="bg-slate-900 border-none h-7 text-[10px] text-white" />
                                            <Input type="number" {...form.register(`items.${index}.taxableAmount` as any)} placeholder="Taxable" className="bg-slate-900 border-none h-7 text-[10px] text-white" />
                                            <Input type="number" {...form.register(`items.${index}.totalAmount` as any)} placeholder="Total" className="bg-slate-900 border-none h-7 text-[10px] text-white" />
                                        </div>
                                    </Card>
                                ))}
                                <Button variant="outline" size="sm" className="w-full h-10 text-[10px] font-black uppercase" onClick={() => append({ description: "", materialHsn: "", volume: "" } as any)}>Add Column Entry</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Button className="w-full h-16 rounded-[2rem] font-black uppercase tracking-widest bg-primary" onClick={handleDownloadPdf} disabled={isDownloading}>
                        {isDownloading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
                        Export Industrial Copy
                    </Button>
                </div>

                <div className="flex-1 bg-[#020617] overflow-hidden relative flex items-center justify-center p-4">
                    <div className="w-[850px] p-6 bg-slate-900/20 rounded-[4rem] border border-slate-800 shadow-2xl relative transition-transform duration-300 origin-center scale-[0.6] lg:scale-[0.65] xl:scale-[0.8] 2xl:scale-100">
                        <div className="bg-white" ref={invoiceRef}>
                            <AsianPaintsInvoiceTemplate data={form.watch()} />
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
