import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileText, ShoppingCart, DollarSign, Package, Award, ArrowRight, Table } from 'lucide-react';

const styles = {
  container: {
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sectionBadge: {
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    maxWidth: '700px',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sidebarItem: {
    padding: '16px',
    borderRadius: '16px',
    border: '1.5px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  iconContainer: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  sidebarTitle: {
    fontSize: '14px',
    lineHeight: '1.3',
  },
  sidebarDesc: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  viewer: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '36px',
    borderRadius: '24px',
    minHeight: '400px',
    border: '1px solid var(--accent-border)',
  },
  viewerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '750',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--accent-soft)',
    paddingBottom: '12px',
    marginBottom: '8px',
    fontFamily: 'var(--font-serif)',
  },
  stepGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  stepTitle: {
    fontSize: '14px',
    fontWeight: '750',
    color: 'var(--accent-primary)',
  },
  stepText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  list: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    paddingLeft: '20px',
    lineHeight: '1.7',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '8px',
    fontSize: '12px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid var(--accent-border)',
  },
  tableHeaderRow: {
    backgroundColor: 'rgba(109, 76, 65, 0.04)',
    borderBottom: '1px solid var(--accent-border)',
  },
  th: {
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  td: {
    padding: '10px 14px',
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--accent-soft)',
  },
  altRow: {
    backgroundColor: 'rgba(250, 248, 242, 0.5)',
  },
  subStepLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    marginTop: '10px',
  },
  screenshotSection: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  screenshotTitle: {
    fontSize: '12px',
    fontWeight: '800',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--accent-border)',
    boxShadow: 'var(--shadow-md)',
    backgroundColor: '#ffffff',
  },
  screenshotImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  }
};

const SECTIONS = [
  {
    id: 'masters',
    title: 'Masters Setup & Chart of Accounts',
    icon: Settings,
    desc: 'Establish company defaults, stock/service items, customer/supplier profiles, warehouse tree hierarchy, and custom account ledgers.',
    content: (
      <div>
        <h4 style={styles.sectionTitle}>1. Establishing Masters & Warehouses</h4>
        
        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Techsource Pvt. Ltd. Global Settings</div>
          <p style={styles.stepText}>
            Set default values for currency (<strong>INR</strong>) and abbreviation (<strong>TPL</strong>) to automatically initialize all sub-ledgers.
          </p>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Stock vs Service Items configuration</div>
          <ul style={styles.list}>
            <li><strong>Wireless Mouse (Stock Item)</strong>: Valuation set to FIFO, tracking enabled, Central Warehouse raw material store as default target.</li>
            <li><strong>Consultation Service (Service Item)</strong>: "Is Stock Item" unchecked (disabled) to bypass ledger movements.</li>
          </ul>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Custom Chart of Accounts Mappings</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Ledger Account</th>
                <th style={styles.th}>Parent Group</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Bank - HDFC / ICICI</td>
                <td style={styles.td}>Bank Accounts (Assets)</td>
                <td style={styles.td}>Bank</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Hardware Sales Income</td>
                <td style={styles.td}>Direct Income</td>
                <td style={styles.td}>Income Account</td>
              </tr>
              <tr>
                <td style={styles.td}>Service Income</td>
                <td style={styles.td}>Direct Income</td>
                <td style={styles.td}>Income Account</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Repair & Maintenance / Travel</td>
                <td style={styles.td}>Indirect Expenses</td>
                <td style={styles.td}>Expense Account</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.screenshotSection}>
          <div style={styles.screenshotTitle}>📷 ERPNext Mockup: Chart of Accounts & Tree Hierarchy</div>
          <div style={styles.imageContainer}>
            <img 
              src={import.meta.env.BASE_URL + 'erpnext_chart_of_accounts.png'} 
              alt="Chart of Accounts Mockup" 
              style={styles.screenshotImg} 
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'purchase',
    title: 'Purchase Cycle & Ledger Impacts',
    icon: ShoppingCart,
    desc: 'Verify procurement: RFQ comparisons, Purchase Orders, Stock Receipts (Stock in Hand), and Accounts Payable bookings.',
    content: (
      <div>
        <h4 style={styles.sectionTitle}>2. Purchase Cycle (Procurement to Billing)</h4>
        
        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Procurement Actions & Selected Vendor</div>
          <p style={styles.stepText}>
            Requested quotes for 6 Laptops, 12 Mice, and 1 Service from Metro Supplies and Apex Distributors. Selected <strong>Metro Supplies</strong> due to a lower overall quote ($282,100).
          </p>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Accounting Ledger Impacts</div>
          
          <div style={styles.subStepLabel}>A. Purchase Receipt (Stock Inward Value: $279,600)</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Account Name</th>
                <th style={styles.th}>Debit</th>
                <th style={styles.th}>Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Stock In Hand (Asset)</td>
                <td style={styles.td} className="text-success">$279,600</td>
                <td style={styles.td}>-</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Stock Received But Not Billed (Liability)</td>
                <td style={styles.td}>-</td>
                <td style={styles.td} className="text-danger">$279,600</td>
              </tr>
            </tbody>
          </table>

          <div style={styles.subStepLabel} style={{ marginTop: '14px', fontWeight: 'bold' }}>B. Purchase Invoice (Total Accounts Payable: $282,100)</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Account Name</th>
                <th style={styles.th}>Debit</th>
                <th style={styles.th}>Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Stock Received But Not Billed</td>
                <td style={styles.td} className="text-success">$279,600</td>
                <td style={styles.td}>-</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Repair & Maintenance (Expense)</td>
                <td style={styles.td} className="text-success">$2,500</td>
                <td style={styles.td}>-</td>
              </tr>
              <tr>
                <td style={styles.td}>Metro Supplies (Accounts Payable)</td>
                <td style={styles.td}>-</td>
                <td style={styles.td} className="text-danger">$282,100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.screenshotSection}>
          <div style={styles.screenshotTitle}>📷 ERPNext Mockup: General Ledger & Purchase Journal Entries</div>
          <div style={styles.imageContainer}>
            <img 
              src={import.meta.env.BASE_URL + 'erpnext_purchase_ledger.png'} 
              alt="Purchase Ledger Mockup" 
              style={styles.screenshotImg} 
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'sales',
    title: 'Sales Cycle & Invoice Receivables',
    icon: DollarSign,
    desc: 'Verify client transactions: Sales Order with 5% discount, Delivery Notes (COGS adjustments), and Accounts Receivable tracking.',
    content: (
      <div>
        <h4 style={styles.sectionTitle}>3. Sales Cycle (Order to Cash)</h4>
        
        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Sales Deal Configuration (Alpha Retail Pvt. Ltd.)</div>
          <p style={styles.stepText}>
            Drafted quotation for 2 Laptops, 3 Wireless Mice, and 1 Installation Service ($117,600). Converted to Sales Order with <strong>5% discount</strong>, resulting in a Net Grand Total of <strong>$111,720</strong>.
          </p>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Ledger Entries & Valuation Release</div>
          
          <div style={styles.subStepLabel}>A. Delivery Note (Releasing inventory valuation: $92,400)</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Account Name</th>
                <th style={styles.th}>Debit</th>
                <th style={styles.th}>Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Cost of Goods Sold (Expense)</td>
                <td style={styles.td} className="text-success">$92,400</td>
                <td style={styles.td}>-</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Stock In Hand (Asset)</td>
                <td style={styles.td}>-</td>
                <td style={styles.td} className="text-danger">$92,400</td>
              </tr>
            </tbody>
          </table>

          <div style={styles.subStepLabel} style={{ marginTop: '14px', fontWeight: 'bold' }}>B. Sales Invoice (Receivable booked: $111,720)</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Account Name</th>
                <th style={styles.th}>Debit</th>
                <th style={styles.th}>Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Alpha Retail Pvt. Ltd. (Accounts Receivable)</td>
                <td style={styles.td} className="text-success">$111,720</td>
                <td style={styles.td}>-</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Hardware Sales Income</td>
                <td style={styles.td}>-</td>
                <td style={styles.td} className="text-danger">$107,920</td>
              </tr>
              <tr>
                <td style={styles.td}>Service Income</td>
                <td style={styles.td}>-</td>
                <td style={styles.td} className="text-danger">$3,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 'inventory',
    title: 'Serialized & Reserved Stock',
    icon: Package,
    desc: 'Deep dive into ERPNext v14/v15 Serial and Batch Bundle (SBB) document structure and Sales Order Stock Reservations.',
    content: (
      <div>
        <h4 style={styles.sectionTitle}>4. Serialized Inventory & Stock Reservation</h4>
        
        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Serial and Batch Bundle (SBB) Architecture</div>
          <p style={styles.stepText}>
            Modern ERPNext versions utilize the <strong>Serial and Batch Bundle (SBB)</strong> to optimize database performance. Rather than storing large arrays of comma-separated serial numbers directly inside transaction rows, SBB creates a single child ledger document mapping transaction entries to their corresponding active serial IDs.
          </p>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Sales Order Stock Reservation (SRE)</div>
          <p style={styles.stepText}>
            Reserving 150 units of Bluetooth Speakers from 200 available physical units creates a <strong>Stock Reservation Entry (SRE)</strong>.
          </p>
          <ul style={styles.list}>
            <li><strong>Actual Quantity (Physical)</strong>: Remains 200 (no physical movements yet).</li>
            <li><strong>Reserved Quantity</strong>: Accrues 150 units.</li>
            <li><strong>Projected Quantity (Available for Sale)</strong>: Reduces to 50 (200 - 150).</li>
          </ul>
          <p style={styles.stepText} style={{ marginTop: '8px' }}>
            This lock blocks subsequent warehouse orders from stealing this allocated stock, guaranteeing customer fulfillment.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Production Process',
    icon: Award,
    desc: 'Verify assembly logic: BOM ingredient list, Work Orders, raw material WIP transfers, and finished goods entries.',
    content: (
      <div>
        <h4 style={styles.sectionTitle}>5. Manufacturing & Production Flow</h4>
        
        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Bill of Materials (BOM) & Work Orders</div>
          <p style={styles.stepText}>
            Created a BOM for <strong>Bluetooth Speaker (TPL-BS-01)</strong> listing plastic casings, electronics, battery components, and packaging boxes. Issued a Work Order to construct 10 units.
          </p>
        </div>

        <div style={styles.stepGroup}>
          <div style={styles.stepTitle}>Inventory Locations during Manufacturing Entry</div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Warehouse Location</th>
                <th style={styles.th}>Item Type</th>
                <th style={styles.th}>Pre-Mfg Quantity</th>
                <th style={styles.th}>Post-Mfg Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Raw Material Store</td>
                <td style={styles.td}>Raw Ingredients</td>
                <td style={styles.td}>50</td>
                <td style={styles.td} style={{ color: 'var(--text-muted)' }}>40 (-10 transfer)</td>
              </tr>
              <tr style={styles.altRow}>
                <td style={styles.td}>Mumbai WIP Store</td>
                <td style={styles.td}>Ingredients in Process</td>
                <td style={styles.td}>0</td>
                <td style={styles.td}>0 (Fully Consumed)</td>
              </tr>
              <tr>
                <td style={styles.td}>Finished Goods Store</td>
                <td style={styles.td}>Finished Bluetooth Speaker</td>
                <td style={styles.td}>0</td>
                <td style={styles.td} className="text-success">+10 (Production Entry)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.screenshotSection}>
          <div style={styles.screenshotTitle}>📷 ERPNext Mockup: Bill of Materials & Manufacturing flowchart</div>
          <div style={styles.imageContainer}>
            <img 
              src={import.meta.env.BASE_URL + 'erpnext_manufacturing.png'} 
              alt="Manufacturing Mockup" 
              style={styles.screenshotImg} 
            />
          </div>
        </div>
      </div>
    )
  }
];

export default function ERPNextShowcase() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.sectionBadge}>Assignment Showcase</span>
        <h3 style={styles.title}>ERPNext Configuration Report</h3>
        <p style={styles.subtitle}>
          Interactive view of the step-by-step organizational master configurations, purchase journals, sales pipelines, and manufacturing flows.
        </p>
      </div>

      <div className="responsive-grid-sidebar">
        
        {/* Navigation Sidebar */}
        <div style={styles.sidebar}>
          {SECTIONS.map((sec) => {
            const IconComp = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <motion.div
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                style={{
                  ...styles.sidebarItem,
                  backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                  borderColor: isActive ? 'var(--accent-primary)' : 'transparent',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                }}
                className={isActive ? "glass-panel" : ""}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div style={{
                  ...styles.iconContainer,
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--accent-soft)',
                  color: isActive ? '#ffffff' : 'var(--accent-primary)',
                }}>
                  <IconComp size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...styles.sidebarTitle,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '750' : '600',
                  }}>
                    {sec.title}
                  </div>
                  <div style={styles.sidebarDesc}>{sec.desc.substring(0, 50)}...</div>
                </div>
                <ArrowRight size={14} style={{ opacity: isActive ? 1 : 0, color: 'var(--accent-primary)', transition: 'opacity 0.2s' }} />
              </motion.div>
            );
          })}
        </div>

        {/* Content Viewer Panel */}
        <div style={styles.viewer} className="glass-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={styles.viewerContent}
            >
              {SECTIONS.find(s => s.id === activeSection)?.content}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
