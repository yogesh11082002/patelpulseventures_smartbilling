
"use client"

import { ParseInvoiceOutput } from "@/ai/flows/parse-invoice-from-pdf"
import { cn } from "@/lib/utils"

interface InvoiceTemplateProps {
    data: ParseInvoiceOutput
}

export function AsianPaintsInvoiceTemplate({ data }: InvoiceTemplateProps) {
    return (
        <div className="bg-white text-black min-h-[1123px] w-[794px] p-2 font-['Arial',sans-serif] text-[7px] border-t border-l border-black mx-auto overflow-hidden leading-[1.1]">
            {/* Top Section Grid */}
            <div className="grid grid-cols-12 border-b border-black">
                <div className="col-span-1 border-r border-black p-1 flex flex-col items-center justify-center">
                    <div className="font-black text-center text-lg leading-none italic scale-x-125">asian<br />paints</div>
                    <div className="text-[5px] mt-1 font-bold text-center uppercase">Automotive, Marine and Specialty Coatings</div>
                </div>
                <div className="col-span-3 border-r border-black p-1">
                    <div className="font-bold flex justify-between border-b border-black text-[8px] mb-1 pb-0.5">
                        <span>TAX INVOICE</span>
                        <span>Original for Recipient</span>
                    </div>
                    <div className="font-bold text-[6px]">Supplying Location Address</div>
                    <div className="mt-0.5 font-bold text-[7px] leading-tight max-w-[150px]">
                        {data?.supplyingLocation?.name}<br />
                        {data?.supplyingLocation?.address}
                    </div>
                    <div className="mt-1 font-bold">STATE CODE : {data?.supplyingLocation?.stateCode}</div>
                    <div className="font-bold">GSTIN : {data?.supplyingLocation?.gstin}</div>
                </div>
                <div className="col-span-2 border-r border-black p-1">
                    <div className="font-bold mb-1 border-b border-dotted border-black">Invoice Details</div>
                    <div className="flex justify-between">
                        <span>Invoice No.:</span>
                        <span className="font-bold">{data?.invoiceNo}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Invoice Date:</span>
                        <span className="font-bold">{data?.invoiceDate}</span>
                    </div>
                    <div className="mt-2 text-[6px]">Category : {data?.category}</div>
                    <div className="text-[6px]">Transaction Type : {data?.transactionType}</div>
                </div>
                <div className="col-span-3 border-r border-black p-1 text-[6.5px]">
                    <div className="grid grid-cols-2 gap-x-1 border-b border-dotted border-black mb-1">
                        <span>Order No:</span> <span className="font-bold">{data?.orderNo}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-1">
                        <span>Order Date:</span> <span className="font-bold">{data?.orderDate}</span>
                        <span>Delivery:</span> <span className="font-bold">{data?.delivery}</span>
                        <span>Del. Date:</span> <span className="font-bold">{data?.delDate}</span>
                        <span>Int. Ref. No:</span> <span className="font-bold">{data?.intRefNo}</span>
                        <span>Reference:</span> <span className="font-bold">{data?.reference}</span>
                    </div>
                </div>
                <div className="col-span-3 p-1 flex items-center justify-center relative">
                    <div className="absolute top-0 right-0 text-[4.5px] p-0.5 max-w-[100px] text-right">Whether Tax is Payable under Reverse Charge Mechanism: {data?.reverseCharge}</div>
                    <div className="w-16 h-16 border border-black flex items-center justify-center text-[7px] font-bold p-1 text-center bg-gray-50">QR CODE<br />Type : IRN</div>
                </div>
            </div>

            {/* Seller Info Row */}
            <div className="grid grid-cols-12 border-b border-black">
                <div className="col-span-4 border-r border-black p-1 pb-2">
                    <div className="font-bold text-[8px] mb-0.5">{data?.seller?.name}</div>
                    <div className="text-[6px] leading-[1.2] max-w-[200px]">
                        {data?.seller?.address}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 font-bold border-t border-dotted border-black pt-0.5 text-[6px]">
                        <div>PAN No : {data?.seller?.pan}</div>
                        <div>State : {data?.seller?.state}</div>
                        <div>State Code : {data?.seller?.stateCode}</div>
                        <div>GSTIN : {data?.seller?.gstin}</div>
                    </div>
                </div>
                <div className="col-span-8 p-1 flex items-center justify-center">
                    <div className="w-full h-8 flex flex-col items-center">
                        <div className="w-3/4 h-6 border-x border-black border-b border-black flex items-center justify-center font-mono tracking-[0.2em] text-[8px]">|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</div>
                        <div className="text-[6px] font-mono mt-0.5 tracking-widest">{data?.acknowledgementNo}</div>
                    </div>
                </div>
            </div>

            {/* IRN Info Bar */}
            <div className="p-0.5 border-b border-black text-[6px] font-bold flex gap-4">
                <div>IRN No. : {data?.irn}</div>
                <div>Acknowledgement No. : {data?.acknowledgementNo}</div>
                <div>Acknowledgement Date : {data?.acknowledgementDate}</div>
            </div>

            {/* Body Split Grid (Parties & Details) */}
            <div className="grid grid-cols-12 border-b border-black min-h-[85px]">
                <div className="col-span-4 border-r border-black flex flex-col">
                    <div className="font-bold bg-gray-100 p-0.5 border-b border-black text-center flex justify-between items-center px-2">
                        <span>Bill To Party</span>
                        <span className="text-[5px] opacity-70">Customer: 0000853062</span>
                    </div>
                    <div className="p-1 flex-1">
                        <div className="font-bold text-[8px]">{data?.billToParty?.name}</div>
                        <div className="text-[6px] leading-[1.2]">{data?.billToParty?.address}</div>
                        <div className="mt-2 space-y-0.5 font-bold">
                            <div>Tel No : {data?.billToParty?.phone || 'N/A'}</div>
                            <div>PAN : {data?.billToParty?.pan || 'N/A'}</div>
                            <div>Place of Supply : {data?.billToParty?.state || 'N/A'}</div>
                            <div>GSTIN/UniqueID : {data?.billToParty?.gstin}</div>
                            <div>State Code : {data?.billToParty?.stateCode}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border-r border-black flex flex-col">
                    <div className="font-bold bg-gray-100 p-0.5 border-b border-black text-center px-2 flex justify-between">
                        <span>Ship To Party</span>
                        <span className="text-[5px] opacity-70">Customer: 0000853062</span>
                    </div>
                    <div className="p-1 flex-1">
                        <div className="font-bold text-[8px]">{data?.shipToParty?.name}</div>
                        <div className="text-[6px] leading-[1.2]">{data?.shipToParty?.address}</div>
                        <div className="mt-2 space-y-0.5 font-bold">
                            <div>Tel No : {data?.shipToParty?.phone || 'N/A'}</div>
                            <div>State Code : {data?.shipToParty?.stateCode}</div>
                            <div>GSTIN/UniqueID : {data?.shipToParty?.gstin}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col text-[6px]">
                    <div className="font-bold bg-gray-100 p-0.5 border-b border-black text-center">Details</div>
                    <div className="p-1 flex-1 grid grid-cols-2 gap-x-2">
                        <div className="space-y-0.5">
                            <div className="flex justify-between"><span>Terms of Payment:</span> <span className="font-bold">APPG Refinishes - CD</span></div>
                            <div className="flex justify-between"><span>Due Date:</span> <span className="font-bold">{data?.details?.dueDate}</span></div>
                            <div className="flex justify-between"><span>Gross Weight:</span> <span className="font-bold">{data?.details?.grossWeight}</span></div>
                            <div className="flex justify-between"><span>Volume:</span> <span className="font-bold">{data?.details?.volumeTotal}</span></div>
                            <div className="flex justify-between"><span>Net Weight:</span> <span className="font-bold">{data?.details?.netWeight}</span></div>
                            <div className="flex justify-between"><span>Currency:</span> <span className="font-bold">{data?.details?.currency}</span></div>
                        </div>
                        <div className="space-y-0.5 pl-2 border-l border-dotted border-slate-300">
                            <div className="flex justify-between"><span>Storage Loc.:</span> <span className="font-bold">{data?.details?.storageLoc}</span></div>
                            <div className="flex justify-between"><span>LogSheet No:</span> <span className="font-bold">{data?.details?.logSheetNo}</span></div>
                            <div className="flex justify-between"><span>GC Route No:</span> <span className="font-bold">{data?.details?.gcRouteNo}</span></div>
                            <div className="flex justify-between"><span>Vehicle No:</span> <span className="font-bold">{data?.details?.vehicleNo}</span></div>
                            <div className="flex justify-between"><span>Mode of transport:</span> <span className="font-bold">{data?.details?.modeOfTransport}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 13-COLUMN TABLE HEADER */}
            <div className="grid grid-cols-[3.5rem_1fr_1.8rem_2rem_3.5rem_3.2rem_3.8rem_2.8rem_2.8rem_2.8rem_3.2rem_2.8rem_3.5rem] bg-gray-100 border-b border-black text-[5.5px] font-bold text-center h-5 items-center">
                <div className="border-r border-black h-full flex items-center justify-center">Material<br />HSN</div>
                <div className="border-r border-black h-full flex items-center justify-center">Description</div>
                <div className="border-r border-black h-full flex items-center justify-center">Qty</div>
                <div className="border-r border-black h-full flex items-center justify-center">Packs</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">Volume<br />(Kg/Lt/M)</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">Rate<br />(INR/%)</div>
                <div className="border-r border-black h-full flex items-center justify-center">Value</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">In-Bill<br />Disc. 1</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">In-Bill<br />Disc. 2</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">Cash<br />Disc.</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">Taxable<br />Amount</div>
                <div className="border-r border-black h-full flex items-center justify-center leading-none">Tax<br />Amount</div>
                <div className="h-full flex items-center justify-center leading-none">Total<br />Amount</div>
            </div>

            {/* 13-COLUMN TABLE DATA */}
            <div className="min-h-[350px] border-b border-black font-bold">
                {data?.items?.map((item, i) => (
                    <div key={i} className="grid grid-cols-[3.5rem_1fr_1.8rem_2rem_3.5rem_3.2rem_3.8rem_2.8rem_2.8rem_2.8rem_3.2rem_2.8rem_3.5rem] text-[6px] border-b border-gray-200 min-h-[16px] items-start text-center">
                        <div className="border-r border-black h-full p-0.5 font-mono text-[5.5px]">{item?.materialHsn}</div>
                        <div className="border-r border-black h-full p-0.5 text-left leading-tight text-[6.5px]">{item?.description}</div>
                        <div className="border-r border-black h-full p-0.5">{item?.qty}</div>
                        <div className="border-r border-black h-full p-0.5">{item?.packs}</div>
                        <div className="border-r border-black h-full p-0.5">{item?.volume}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.rate?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.value?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.disc1?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.disc2?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.cashDisc?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right bg-gray-50/50">{item?.taxableAmount?.toFixed(2)}</div>
                        <div className="border-r border-black h-full p-0.5 text-right">{item?.taxAmount?.toFixed(2)}</div>
                        <div className="h-full p-0.5 text-right bg-gray-100/50">{item?.totalAmount?.toFixed(2)}</div>
                    </div>
                ))}
                {/* Total Indicator row inside table */}
                <div className="grid grid-cols-[3.5rem_1fr_1.8rem_2rem_3.5rem_3.2rem_3.8rem_2.8rem_2.8rem_2.8rem_3.2rem_2.8rem_3.5rem] text-[6px] bg-gray-50 min-h-[12px] items-center text-center font-black">
                    <div className="col-span-2 border-r border-black text-left px-1 uppercase italic">Total</div>
                    <div className="border-r border-black h-full"></div>
                    <div className="border-r border-black h-full"></div>
                    <div className="border-r border-black h-full"></div>
                    <div className="border-r border-black h-full"></div>
                    <div className="border-r border-black h-full text-right px-0.5">{data?.summary?.valueSale?.toFixed(2)}</div>
                    <div className="border-r border-black h-full text-right px-0.5">{(data?.summary?.inBillDisc || 0).toFixed(2)}</div>
                    <div className="border-r border-black h-full"></div>
                    <div className="border-r border-black h-full text-right px-0.5">{data?.summary?.fastCashDisc?.toFixed(2)}</div>
                    <div className="border-r border-black h-full text-right px-0.5">{data?.summary?.taxableAmount?.toFixed(2)}</div>
                    <div className="border-r border-black h-full text-right px-0.5">{(data?.summary?.centralGst + data?.summary?.stateGst || 0)?.toFixed(2)}</div>
                    <div className="h-full text-right px-0.5 text-[7px]">{data?.summary?.totalDocumentAmount?.toFixed(2)}</div>
                </div>
            </div>

            {/* Industrial Footer Section */}
            <div className="grid grid-cols-12 min-h-[110px]">
                <div className="col-span-7 border-r border-black p-1 flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-[7px] border-b border-black mb-1 pb-0.5">Summary Section</div>
                        <div className="font-bold uppercase text-[7.5px]">Total Invoice Value (In Words) : <span className="italic">{data?.totalInWords}</span></div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 border border-black text-center min-h-[50px] font-bold">
                        <div className="border-r border-black flex items-center justify-center p-1 uppercase text-[5px]">Customer Acknowledgement<br />Receipt Date</div>
                        <div className="border-r border-black flex items-center justify-center p-1 uppercase text-[5px]">Receipt Time<br />Customer Sign & Stamp</div>
                        <div className="flex flex-col justify-between p-1 text-[6px]">
                            <div className="text-[5px] font-bold uppercase border-b border-dotted border-black leading-none pb-1">Authorized Signatory</div>
                            <div className="text-[7px] font-black uppercase mt-4">SIDDHARTH SOMNATH RANADE</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 flex items-center justify-center p-1 border-r border-black">
                    {/* QR/Bar for IRR */}
                    <div className="w-8 h-8 border border-black rotate-90 flex items-center justify-center text-[4px] font-mono">ASIA PAINT</div>
                </div>

                <div className="col-span-4 flex flex-col justify-end">
                    <div className="grid grid-cols-3 border-b border-black bg-gray-100 font-bold text-[6.5px] text-center leading-none h-4 items-center">
                        <div className="border-r border-black h-full flex items-center justify-center">Summary</div>
                        <div className="border-r border-black h-full flex items-center justify-center">Taxable Amount</div>
                        <div className="h-full flex items-center justify-center">Total Amount</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5">Value Sale</div>
                        <div className="border-r border-black"></div>
                        <div className="text-right pr-1">{data?.summary?.valueSale?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5 italic text-[5px]">In Bill SP RAGON - 7512 - Nov'25 15.00- IN</div>
                        <div className="border-r border-black"></div>
                        <div className="text-right pr-1">{(data?.summary?.inBillDisc || 0).toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5 italic">Fast Cash Discount</div>
                        <div className="border-r border-black"></div>
                        <div className="text-right pr-1">{data?.summary?.fastCashDisc?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-black text-[6.5px] bg-gray-50">
                        <div className="border-r border-black p-0.5">TAXABLE AMOUNT</div>
                        <div className="border-r border-black text-right pr-1">{data?.summary?.taxableAmount?.toFixed(2)}</div>
                        <div className="text-right pr-1">{data?.summary?.taxableAmount?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5">IN - Central GST - OP 9 %</div>
                        <div className="border-r border-black text-right pr-1">{data?.summary?.taxableAmount?.toFixed(2)}</div>
                        <div className="text-right pr-1">{data?.summary?.centralGst?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5">IN - State GST - OP 9 %</div>
                        <div className="border-r border-black text-right pr-1">{data?.summary?.taxableAmount?.toFixed(2)}</div>
                        <div className="text-right pr-1">{data?.summary?.stateGst?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black font-bold text-[6px]">
                        <div className="border-r border-black p-0.5">Commercial Rounding</div>
                        <div className="border-r border-black"></div>
                        <div className="text-right pr-1">{data?.summary?.commercialRounding?.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 bg-black text-white font-black text-[7.5px] p-0.5 h-5 items-center">
                        <div className="col-span-2">Total Document Amount</div>
                        <div className="text-right pr-1">{data?.summary?.totalDocumentAmount?.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            {/* Legal Disclaimer Box */}
            <div className="mt-1 border border-black p-1 text-[4.5px] leading-none italic font-medium">
                <div className="font-bold underline text-[5px] mb-0.5 not-italic uppercase tracking-widest text-center">Declaration</div>
                I/We hereby certify that my/our registration certificate under the GST Act, 2017 is in force on the date on which the supply of goods specified in this Tax Invoice is made by me/us and that the transaction of supply covered by this Tax Invoice has been effected by me/us. We have complied to all applicable direct and indirect taxes and other laws as mandated by local/state/central governments from time to time on our business activities.
                If you certify that you are entitled to tax concessions under the GST Act, 2017 as you have cited in the above statement, the supply of goods specified in the Tax Invoice is made by me/us only in the manner as specified in the certificate by you. <br />
                In case any differential tax is payable because of non-submission of necessary/valid declaration by you, you must pay the same along with any interest that this will be recovered from you. <br />
                The amount stated in this Invoice as due against the respective item(s) must be paid strictly within the specified period.
                <div className="mt-1 font-bold text-center border-t border-dotted border-black pt-0.5">Total Amount includes Commercial Rounding if applicable.</div>
            </div>

            {/* Printer Badge */}
            <div className="mt-1 text-center font-bold text-[5px] tracking-[0.5em] text-gray-400">Powered by WPS Office - Industrial Redesign by SmartCV</div>
        </div>
    )
}

export function ProfessionalBillTemplate({ data }: { data: ParseInvoiceOutput }) {
    return <AsianPaintsInvoiceTemplate data={data} />;
}

export function ModernInvoiceTemplate({ data }: { data: ParseInvoiceOutput }) {
    return <AsianPaintsInvoiceTemplate data={data} />;
}

export function ElegantInvoiceTemplate({ data }: { data: ParseInvoiceOutput }) {
    return <AsianPaintsInvoiceTemplate data={data} />;
}
