export const menuConfig = {
  accounting: {
    transactions: {
      label: "Transactions",
      items: [
        {
          label: "Invoices",
          href: "/dashboard/transactions/invoices",
        },
        {
          label: "Additional Documents",
          href: "/dashboard/transactions/documents",
        },
        {
          label: "Distribution",
          href: "/dashboard/transactions/distribution",
        },
      ],
    },
  },
  admin: {
    masterData: {
      label: "Master Data",
      items: [
        {
          label: "Invoice Type",
          href: "/master/invoice-type",
        },
        {
          label: "Additional Doc Types",
          href: "/dashboard/master/doc-types",
        },
        {
          label: "Import",
          href: "/dashboard/master/import",
        },
      ],
    },
  },
};

export type UserRole = keyof typeof menuConfig;
export type MenuConfig = typeof menuConfig;
