# ERPNext Evaluation & Configuration Report

**Company Name:** Techsource Pvt. Ltd.  
**Document Purpose:** ERPNext Evaluation Preparation Assignment  
**Shareable Link:** [Insert your Google Doc Shareable Link here (Ensure "Anyone with the link can comment" is enabled)]

---

## Table of Contents
1. [Setting Up Masters](#1-setting-up-masters)
   - [Company Configuration](#company-configuration)
   - [Item Masters](#item-masters)
   - [Customer & Supplier Setup](#customer--supplier-setup)
   - [Warehouse Structure Tree](#warehouse-structure-tree)
   - [Chart of Accounts (CoA) Customization](#chart-of-accounts-coa-customization)
2. [Purchase Cycle (Procurement to Billing)](#2-purchase-cycle-procurement-to-billing)
   - [Procurement Workflow Steps](#procurement-workflow-steps)
   - [Ledger & Stock Impacts](#ledger--stock-impacts-purchase)
   - [Screenshot Guide (Purchase)](#screenshot-guide-purchase)
3. [Sales Cycle (Order to Cash)](#3-sales-cycle-order-to-cash)
   - [Sales Workflow Steps](#sales-workflow-steps)
   - [Ledger & Stock Impacts](#ledger--stock-impacts-sales)
   - [Screenshot Guide (Sales)](#screenshot-guide-sales)
4. [Serialized and Batched Inventory Management](#4-serialized-and-batched-inventory-management)
   - [Configuration & Procurement Setup](#configuration--procurement-setup)
   - [Technical Explanation: Serial and Batch Bundle](#technical-explanation-serial-and-batch-bundle)
   - [Outward Transaction & Impact](#outward-transaction--impact)
5. [Sales Order Stock Reservation Process](#5-sales-order-stock-reservation-process)
   - [Stock Reservation Walkthrough](#stock-reservation-walkthrough)
   - [Core Benefits & Mechanics](#core-benefits--mechanics)
6. [Manufacturing & Production Process](#6-manufacturing--production-process)
   - [Manufacturing Workflow Steps](#manufacturing-workflow-steps)
   - [Inventory Flow Verification](#inventory-flow-verification)
   - [Screenshot Guide (Manufacturing)](#screenshot-guide-manufacturing)

---

## 1. Setting Up Masters

### Company Configuration
To establish the base organization within ERPNext:
- **Company Name:** `Techsource Pvt. Ltd.`
- **Abbreviation:** `TPL`
- **Default Currency:** `INR` (Indian Rupee) or appropriate local currency.
- **Default Settings:** Checked **"Is Default Company"** under Global Defaults so that all subsequent vouchers, warehouses, and transactions default to `Techsource Pvt. Ltd.`

### Item Masters
Two types of items were created in the Item Master:

#### A. Stock Item (Wireless Mouse)
- **Item Name:** `Wireless Mouse`
- **Item Code:** `TPL-WM-01`
- **Item Group:** `Products` (or `Hardware`)
- **Default Unit of Measure (UoM):** `Nos`
- **Is Stock Item:** `Yes` (Checked)
- **Default Warehouse:** `Central Warehouse - Raw Material Store - TPL`
- **Valuation Rate:** Managed via FIFO/Moving Average.

#### B. Service Item (Consultation Service)
- **Item Name:** `Consultation Service`
- **Item Code:** `TPL-SRV-01`
- **Item Group:** `Services`
- **Default Unit of Measure (UoM):** `Hours`
- **Is Stock Item:** `No` (Unchecked) — *Ensures no physical stock or valuation ledger entries are created.*

---

### Customer & Supplier Setup

#### Customer (Bright Enterprises)
- **Customer Name:** `Bright Enterprises`
- **Customer Group:** `Commercial` (or `All Customer Groups`)
- **Address Configuration:**
  - Created a new **Address** record: `Bright HQ, Mumbai, Maharashtra, India`.
  - Check **"Is Billing Address"** and **"Is Shipping Address"** and link it to the Customer `Bright Enterprises`.
  - This linkage guarantees the address auto-populates on sales orders, delivery notes, and invoices.

#### Supplier (Metro Supplies)
- **Supplier Name:** `Metro Supplies`
- **Supplier Group:** `Distributor` (or `All Supplier Groups`)
- **Contact Configuration:**
  - Created a new **Contact** record: Name: `Metro Representative`, Email: `sales@metrosupplies.com`, Phone: `+91 98765 43210`.
  - Linked this Contact directly to `Metro Supplies` using the Link Document table.

---

### Warehouse Structure Tree
The company's storage locations are organized hierarchically to represent physical branches and storage zones:

```text
All Warehouses (TPL)
├── Central Warehouse (TPL) [Group]
│   ├── Raw Material Store (TPL) [Ledger]
│   └── Service Spare Store (TPL) [Ledger]
├── India Branch (TPL) [Group]
│   ├── Mumbai (TPL) [Ledger]
│   └── Delhi (TPL) [Ledger]
└── Middle East (TPL) [Group]
    ├── Dubai (TPL) [Ledger]
    └── Egypt (TPL) [Ledger]
```

*Note: Group warehouses cannot directly store stock; only Leaf/Ledger warehouses are eligible for transaction entries.*

---

### Chart of Accounts (CoA) Customization
The Chart of Accounts (CoA) was modified under the default template to map custom ledger accounts:

| Ledger Name | Parent Group | Account Type |
| :--- | :--- | :--- |
| **Bank – HDFC** | Bank Accounts (Assets -> Current Assets) | Bank |
| **Bank – ICICI** | Bank Accounts (Assets -> Current Assets) | Bank |
| **Hardware Sales Income** | Direct Income (Income -> Revenue) | Income Account |
| **Service Income** | Direct Income (Income -> Revenue) | Income Account |
| **AMC Income** | Direct/Indirect Income | Income Account |
| **Internet & Communication** | Indirect Expenses (Expenses) | Expense Account |
| **Travel & Conveyance** | Indirect Expenses (Expenses) | Expense Account |
| **Repair & Maintenance** | Indirect Expenses (Expenses) | Expense Account |
| **Marketing Expense** | Indirect Expenses (Expenses) | Expense Account |

---

## 2. Purchase Cycle (Procurement to Billing)

### Procurement Workflow Steps
1. **Purchase Material Request:**
   - Created a Material Request of type **"Purchase"** for:
     - 6 Laptops (Stock Item)
     - 12 Wireless Mice (Stock Item)
     - 1 Installation Service (Service Item)
2. **Request for Quotation (RFQ):**
   - Generated an RFQ from the Material Request.
   - Added two Suppliers: `Metro Supplies` and `Apex Distributors`.
   - Emailed/submitted the RFQ to both.
3. **Supplier Quotations:**
   - Recorded the responses by creating **Supplier Quotation** documents:
     - **Metro Supplies:** Laptop = ₹45,000/ea, Wireless Mouse = ₹800/ea, Installation Service = ₹2,500. (Total = ₹282,100)
     - **Apex Distributors:** Laptop = ₹47,000/ea, Wireless Mouse = ₹750/ea, Installation Service = ₹3,000. (Total = ₹294,000)
4. **Supplier Selection:**
   - Selected `Metro Supplies` as the primary vendor due to the lower overall cost (₹282,100 vs. ₹294,000).
5. **Purchase Order (PO):**
   - Converted Metro Supplies' quotation into a **Purchase Order** and submitted it.
6. **Purchase Receipt (PR):**
   - Created a Purchase Receipt to receive the Laptops and Wireless Mice into the `Raw Material Store (TPL)` warehouse.
7. **Purchase Invoice (PI):**
   - Generated a Purchase Invoice to book the Accounts Payable invoice for both physical items and the service.

---

### Ledger & Stock Impacts (Purchase)

#### A. Purchase Receipt (Stock Booking)
- **Stock Ledger Impact:**
  - `Raw Material Store (TPL)`: **+6 Laptops** (Qty)
  - `Raw Material Store (TPL)`: **+12 Wireless Mice** (Qty)
- **General Ledger (GL) Impact (Perpetual Inventory):**
  - **Debit:** `Stock In Hand` (Asset) — ₹279,600 *(6 * ₹45,000 + 12 * ₹800)*
  - **Credit:** `Stock Received But Not Billed` (Temporary Liability) — ₹279,600
  *(Note: The Installation Service is not recorded in the Stock Ledger or PR ledger impact because it is a non-stock service item.)*

#### B. Purchase Invoice (Accounting Booking)
- **General Ledger (GL) Impact:**
  - **Debit:** `Stock Received But Not Billed` (Liability Clear) — ₹279,600
  - **Debit:** `Repair & Maintenance` (or Installation Expense) — ₹2,500 *(Installation Service cost)*
  - **Credit:** `Metro Supplies` (Accounts Payable) — ₹282,100 *(Grand Total)*

---

### Screenshot Guide (Purchase)

> [!TIP]
> **How to take the required screenshots in ERPNext:**
>
> 1. **RFQ & Supplier Quotation:** Open the **Request for Quotation** screen showing the linked Supplier Quotation documents in the connection dashboard sidebar, or take a screenshot of the **Supplier Quotation Comparison** report.
> 2. **Purchase Order:** Navigate to **Buying > Purchase Order**, open the submitted PO for Metro Supplies, and take a screenshot showing the status as "To Receive and Bill".
> 3. **Purchase Receipt Stock Ledger:** Go to **Stock > Stock Ledger** report. Filter by voucher type "Purchase Receipt" and document ID. Capture the line items demonstrating the addition of Laptops and Wireless Mice to the `Raw Material Store`.
> 4. **Purchase Invoice General Ledger:** Go to **Accounts > General Ledger**. Filter by Voucher No (your Purchase Invoice ID). Take a screenshot showing the Debits to *Stock Received But Not Billed* & *Expenses*, and Credit to *Metro Supplies*.

---

## 3. Sales Cycle (Order to Cash)

### Sales Workflow Steps
1. **Quotation:**
   - Created a Quotation for customer `Alpha Retail Pvt. Ltd.` with:
     - 2 Laptops (Unit Price: ₹55,000)
     - 3 Wireless Mice (Unit Price: ₹1,200)
     - 1 Installation Service (Unit Price: ₹4,000)
     - Subtotal = ₹117,600.
2. **Sales Order (SO) & Discount:**
   - Converted the Quotation into a Sales Order.
   - Applied a **5% Discount** in the **Discount and Margins** section on the Grand Total.
   - 5% of ₹117,600 = ₹5,880.
   - Net Grand Total = ₹111,720.
3. **Delivery Note (DN):**
   - Issued a Delivery Note to ship the 2 Laptops and 3 Wireless Mice from `Raw Material Store (TPL)`.
4. **Sales Invoice (SI):**
   - Created a Sales Invoice to bill `Alpha Retail Pvt. Ltd.` for the discounted total of ₹111,720.

---

### Ledger & Stock Impacts (Sales)

#### A. Delivery Note (Stock Release)
- **Stock Ledger Impact:**
  - `Raw Material Store (TPL)`: **-2 Laptops** (Qty)
  - `Raw Material Store (TPL)`: **-3 Wireless Mice** (Qty)
- **General Ledger (GL) Impact (Perpetual Inventory):**
  - **Debit:** `Cost of Goods Sold` (Expense) — ₹92,400 *(Cost: 2 * ₹45,000 + 3 * ₹800)*
  - **Credit:** `Stock In Hand` (Asset) — ₹92,400

#### B. Sales Invoice (Billing Booking)
- **General Ledger (GL) Impact:**
  - **Debit:** `Alpha Retail Pvt. Ltd.` (Accounts Receivable) — ₹111,720
  - **Credit:** `Hardware Sales Income` — ₹107,920 *(Allocated discounted value for Laptops and Mice)*
  - **Credit:** `Service Income` — ₹3,800 *(Allocated discounted value for Installation)*

---

### Screenshot Guide (Sales)

> [!TIP]
> **How to take the required screenshots in ERPNext:**
>
> 1. **Quotation:** Capture the submitted Quotation to Alpha Retail Pvt. Ltd. showing items and pricing.
> 2. **Sales Order:** Open the **Sales Order** screen showing the applied 5% discount, Net Total (₹111,720), and status as "To Deliver and Bill".
> 3. **Delivery Note Stock Ledger:** Open the **Stock Ledger** report filtered by the Delivery Note. Capture the columns showing the reduction in quantities of Laptops (-2) and Wireless Mice (-3).
> 4. **Accounts Receivable Report (Unpaid Invoice):** Navigate to **Accounts > Accounts Receivable** report. Filter by customer `Alpha Retail Pvt. Ltd.` and look for the Invoice ID. Take a screenshot showing the open invoice with an "Outstanding Amount" of ₹111,720.
> 5. **Sales Invoice General Ledger:** Open the submitted **Sales Invoice**, click on **View > Ledger** in the top right. Capture the double-entry table showing Debit to Customer (Receivable) and Credits to Sales/Service Income.

---

## 4. Serialized and Batched Inventory Management

### Configuration & Procurement Setup
1. **Item Setup:**
   - Created an item named `Smart Speaker Pro`.
   - In the Item Master under **Inventory**, checked **"Has Serial Number"** and **"Has Batch Number"**.
   - Set the Serial Number Series as `SSP-XXXX` and Batch Series as `B-.`
2. **Purchase Receipt (PR):**
   - Created a Purchase Receipt for **Quantity = 2** of `Smart Speaker Pro`.
   - Navigate to the **Serial and Batch Bundle** section in the item row.
   - Click "Create Serial and Batch Bundle".
   - Entered Batch Number: `B01`.
   - Manually entered/generated Serial Numbers: `1122` and `3344`.
   - Submitted the PR.

---

### Technical Explanation: Serial and Batch Bundle
In modern ERPNext (v14 and v15+), the system utilizes a dedicated master document called the **Serial and Batch Bundle (SBB)** instead of storing lists of serial numbers directly as comma-separated text strings within purchase or sales tables. 

**Key Characteristics:**
- **Normalized Architecture:** It acts as a bridge between the physical transaction (e.g., Purchase Receipt or Delivery Note) and the individual Serial/Batch details in the database.
- **FIFO & Batch-wise Valuation:** It allows ERPNext to calculate accurate valuation rates per batch. If Batch `B01` has a different cost than Batch `B02`, the Stock Ledger tracks and offsets the exact valuation corresponding to the Serial and Batch Bundle used in the transaction.
- **Scalability:** It prevents slow-downs during database operations when processing bulk quantities (e.g., receiving thousands of serialized items in a single document).

---

### Outward Transaction & Impact
1. **Delivery Note (DN):**
   - Created a Delivery Note for **Quantity = 1** of `Smart Speaker Pro` for a customer.
   - Under the item row, clicked the **Serial and Batch Bundle** link.
   - Selected Serial Number `1122` from Batch `B01`.
   - Submitted the Delivery Note.
2. **Impact on the Serial and Batch Bundle:**
   - **Serial Status:** The status of Serial Number `1122` is set to **"Delivered/Inactive"** in the database, preventing it from being selected in any future sales transactions. Serial Number `3344` remains **"Active"** in the warehouse.
   - **Batch Quantity:** The remaining stock count for Batch `B01` in `Raw Material Store` is reduced from 2 to 1.
   - **Traceability:** The Serial and Batch Bundle created for the Delivery Note specifically links to the original Purchase Receipt's Serial and Batch Bundle, establishing a clean custody chain.

---

## 5. Sales Order Stock Reservation Process

### Stock Reservation Walkthrough
To reserve stock against a confirmed order to prevent stock-outs for critical customers:

1. **Prerequisite:** Enable **"Allow Stock Reservation"** in **Stock > Stock Settings**.
2. **Context Scenario:**
   - **Item:** `Bluetooth Speaker`
   - **Available Stock (in Warehouse):** 200 units
   - **Confirmed Sales Order:** 150 units (Customer: `Alpha Retail Pvt. Ltd.`)
3. **Execution Steps:**
   - Open the confirmed **Sales Order** for 150 units of `Bluetooth Speaker`.
   - Click **Create > Stock Reservation** from the top right actions.
   - A **Stock Reservation Entry (SRE)** document will be generated automatically.
   - Select the source warehouse where the 200 units are present (e.g., `Central Warehouse`).
   - Enter/verify the reserved quantity: `150`.
   - Click **Save** and **Submit**.

---

### Core Mechanics & Stock Parameters
Upon submission of the Stock Reservation Entry, ERPNext adjusts internal stock metrics for `Bluetooth Speaker` as follows:

- **Actual Quantity (Physical Stock):** Remains **200 units** (no inventory has physically left the warehouse).
- **Reserved Quantity:** Increases by **150 units** (specifically allocated to this Sales Order).
- **Available Qty for Sale (Projected Qty):** Decreases to **50 units** *(200 Available - 150 Reserved)*.
- **Impact on Other Orders:** If a user attempts to deliver `Bluetooth Speaker` for another customer or process a new Sales Order, the system will block any transaction that attempts to consume more than the remaining 50 units, safeguarding the 150 units for the reserved customer.
- **Consumption:** When the Delivery Note is generated from the original Sales Order, the system automatically releases the reserved stock and performs the physical stock deduction.

---

## 6. Manufacturing & Production Process

### Manufacturing Workflow Steps
Techsource Pvt. Ltd. configures the production of the `Bluetooth Speaker`:

#### A. Master Setup
1. **Item Masters Created:**
   - **Finished Good:** `Bluetooth Speaker` (Is Stock Item: Yes, Default Warehouse: `Finished Goods (TPL)`)
   - **Raw Materials (All Stock Items, Default Warehouse: `Raw Material Store (TPL)`):**
     - `Plastic Casing`
     - `Electronic Components`
     - `Battery`
     - `Packaging Material`
2. **Bill of Materials (BOM):**
   - Created BOM: `BOM-TPL-BS-001` for `Bluetooth Speaker`.
   - Specified raw materials required for **1 unit** of Finished Good:
     - 1 x `Plastic Casing`
     - 1 x `Electronic Components`
     - 1 x `Battery`
     - 1 x `Packaging Material`

#### B. Work Order & Production
1. **Work Order (WO):**
   - Created a Work Order for **10 units** of `Bluetooth Speaker`.
   - Selected `BOM-TPL-BS-001`.
   - Set Target Warehouse as `Finished Goods (TPL)`.
   - Set WIP Warehouse as `Mumbai (TPL)` (or a dedicated WIP Store).
   - Saved and Submitted the Work Order.
2. **Material Transfer to WIP:**
   - From the Work Order, clicked **Start > Transfer Material**.
   - This generated a **Stock Entry (Material Transfer for Manufacture)**.
   - Transferred 10 units of each raw material from `Raw Material Store (TPL)` to the WIP warehouse.
   - Checked and Submitted.
3. **Manufacture Entry (Completion):**
   - Once production finished, clicked **Finish > Manufacture** in the Work Order.
   - This generated a **Stock Entry (Manufacture)**.
   - The entry automatically consumes the raw materials from the WIP warehouse and registers the production of the finished speakers.
   - Checked and Submitted.

---

### Inventory Flow Verification
The following quantities were affected across the production cycle:

| Warehouse | Item | Pre-Manufacturing Qty | Post-Material Transfer Qty | Post-Manufacture Qty |
| :--- | :--- | :---: | :---: | :---: |
| **Raw Material Store** | Raw Materials (Casing, etc.) | 50 (ea) | 40 (ea) | 40 (ea) |
| **WIP Warehouse** | Raw Materials (Casing, etc.) | 0 | +10 (ea) | 0 (Consumed) |
| **Finished Goods** | `Bluetooth Speaker` | 0 | 0 | **+10 (Finished)** |

---

### Screenshot Guide (Manufacturing)

> [!TIP]
> **How to take the required screenshots in ERPNext:**
>
> 1. **Item Masters:** Take a screenshot of the **Item List** filter by group or search keyword showing `Bluetooth Speaker` and its raw materials.
> 2. **BOM:** Open **Manufacturing > Bill of Materials**, choose `BOM-TPL-BS-001` and screenshot the structural raw material list table.
> 3. **Work Order:** Go to **Manufacturing > Work Order**, select the Work Order for the Bluetooth Speakers, showing the status as "Completed" and the linked Stock Entries.
> 4. **Manufacture Entry:** Open the **Stock Entry** of type "Manufacture", showcasing the Raw Materials consumed (Source: WIP) and the Finished Good received (Target: Finished Goods).
> 5. **Stock Ledger:** Open the **Stock Ledger** report and filter by the "Manufacture" Stock Entry voucher number. The ledger should show negative quantity entries (outwards) for the raw materials from WIP and a positive quantity entry (inward) for the Bluetooth Speaker in the Finished Goods Warehouse.
