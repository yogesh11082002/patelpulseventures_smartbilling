
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InvoiceItemSchema = z.object({
  materialHsn: z.string().describe('Material/HSN code.'),
  description: z.string().describe('Product description.'),
  qty: z.number().describe('Quantity (integer).'),
  packs: z.string().describe('Packs (e.g., 2 CAR).'),
  volume: z.string().describe('Volume (Kg/Lt/M value).'),
  rate: z.number().describe('Rate (INR/%).'),
  value: z.number().describe('Base value before discounts.'),
  disc1: z.number().describe('In-Bill Disc 1 amount.'),
  disc2: z.number().describe('In-Bill Disc 2 amount.'),
  cashDisc: z.number().describe('Cash Disc amount.'),
  taxableAmount: z.number().describe('Taxable Amount after all discounts.'),
  taxAmount: z.number().describe('Total Tax Amount.'),
  totalAmount: z.number().describe('Final Total for this item.'),
});

const AddressDetailsSchema = z.object({
  name: z.string().default(''),
  address: z.string().default(''),
  gstin: z.string().default(''),
  pan: z.string().default(''),
  state: z.string().default(''),
  stateCode: z.string().default(''),
  phone: z.string().default(''),
});

const ParseInvoiceOutputSchema = z.object({
  documentType: z.string().default('TAX INVOICE'),
  documentCopy: z.string().default('Original for Recipient'),
  reverseCharge: z.string().default('No'),
  supplyingLocation: AddressDetailsSchema,
  invoiceNo: z.string().default(''),
  invoiceDate: z.string().default(''),
  category: z.string().default('B2B'),
  transactionType: z.string().default('Regular'),
  orderNo: z.string().default(''),
  orderDate: z.string().default(''),
  delivery: z.string().default(''),
  delDate: z.string().default(''),
  intRefNo: z.string().default(''),
  reference: z.string().default(''),
  seller: AddressDetailsSchema,
  billToParty: AddressDetailsSchema,
  shipToParty: AddressDetailsSchema,
  details: z.object({
    termsOfPayment: z.string().default(''),
    dueDate: z.string().default(''),
    grossWeight: z.string().default(''),
    volumeTotal: z.string().default(''),
    netWeight: z.string().default(''),
    currency: z.string().default('INR/Indian Rupee'),
    storageLoc: z.string().default(''),
    logSheetNo: z.string().default(''),
    gcRouteNo: z.string().default(''),
    vehicleNo: z.string().default(''),
    modeOfTransport: z.string().default(''),
  }),
  items: z.array(InvoiceItemSchema),
  summary: z.object({
    valueSale: z.number().default(0),
    inBillDisc: z.number().default(0),
    fastCashDisc: z.number().default(0),
    taxableAmount: z.number().default(0),
    centralGst: z.number().default(0),
    stateGst: z.number().default(0),
    commercialRounding: z.number().default(0),
    totalDocumentAmount: z.number().default(0),
  }),
  totalInWords: z.string().default(''),
  irn: z.string().default(''),
  acknowledgementNo: z.string().default(''),
  acknowledgementDate: z.string().default(''),
});

export type ParseInvoiceOutput = z.infer<typeof ParseInvoiceOutputSchema>;

const parseInvoicePrompt = ai.definePrompt({
  name: 'parseInvoicePrompt',
  input: { schema: z.object({ pdfDataUri: z.string() }) },
  output: { schema: ParseInvoiceOutputSchema },
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert industrial document analyst for Asian Paints. 
  Extract EVERY detail into the structured JSON schema.
  
  Columns to extract for items:
  - Material HSN
  - Description
  - Qty
  - Packs
  - Volume (Kg/Lt/M)
  - Rate (INR/%)
  - Value
  - In-Bill Disc 1
  - In-Bill Disc 2
  - Cash Disc
  - Taxable Amount
  - Tax Amount
  - Total Amount

  Also extract all header dates, numbers, parties and the summary table at the bottom precisely.
  
  Document:
  {{media url=pdfDataUri}}
  `,
});

export async function parseInvoiceFromPdf(pdfDataUri: string): Promise<ParseInvoiceOutput> {
  const { output } = await parseInvoicePrompt({ pdfDataUri });
  if (!output) throw new Error('Failed to parse document');
  return output;
}
