"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Interface strictly mapping CreateProductDto
export interface CreateProductDto {
  code: string;
  name: string;
  item: string;
  shortName: string;
  company: string;
  productGroup: string;
  manufacturer: string;
  uom: string;
  generic: string;
  active: "Yes" | "No";
  activeDate: string;
  inactiveDate: string;
  fridge: "Yes" | "No";
  type: string;
  cartonQty: number | string;
  drugType: string;
  location: string;
  wht: "Yes" | "No";
  weight: number | string;
  liters: number | string;
  devBox: "Yes" | "No";
  tradePrice: number | string;
  purchasePrice: number | string;
  retailPrice: number | string;
  distributionPrice: number | string;
  tax: number | string;
  saleDiscount: number | string;
  purchaseDiscount: number | string;
  bonus: number | string;
  purchaseDiscountRs: number | string;
  priceRange: number | string;
  percentageBonus: number | string;
  purchaseCalculation: string;
  status: "Active" | "Inactive";
}

const initialFormState: CreateProductDto = {
  code: "",
  name: "",
  item: "",
  shortName: "",
  company: "",
  productGroup: "",
  manufacturer: "",
  uom: "",
  generic: "",
  active: "Yes",
  activeDate: "",
  inactiveDate: "",
  fridge: "No",
  type: "",
  cartonQty: "",
  drugType: "",
  location: "",
  wht: "No",
  weight: "",
  liters: "",
  devBox: "No",
  tradePrice: "",
  purchasePrice: "",
  retailPrice: "",
  distributionPrice: "",
  tax: "",
  saleDiscount: "",
  purchaseDiscount: "",
  bonus: "",
  purchaseDiscountRs: "",
  priceRange: "",
  percentageBonus: "",
  purchaseCalculation: "",
  status: "Active",
};

export default function ProductsManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<CreateProductDto>(initialFormState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API Call to NestJS backend endpoint (POST /products) goes here
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
      {/* ==========================================
          HEADER & TOP CONTROL BAR
          ========================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-md bg-[var(--cream-dark)] text-[var(--gold)] border border-[var(--gold)]/20">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight">
              Products Management
            </h1>
            <p className="text-xs text-[var(--slate)]">
              Manage inventory master items, prices, and classifications
            </p>
          </div>
        </div>

        {/* Primary Add Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--cream)] font-semibold text-xs h-9 px-4 active:scale-95 transition-transform w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Product
        </Button>
      </div>

      {/* ==========================================
          SEARCH, FILTER & ACTION BAR
          ========================================== */}
      <div className="bg-[var(--cream)] p-3 sm:p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--slate)]" />
            <Input
              type="text"
              placeholder="Search code, name, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 text-[var(--ink)] focus:border-[var(--gold)]"
            />
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
            >
              <Filter className="h-3.5 w-3.5 mr-1 text-[var(--cyan)]" />
              Filter
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1 text-[var(--slate)]" />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
            >
              <Download className="h-3.5 w-3.5 mr-1 text-[var(--purple)]" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* ==========================================
          RESPONSIVE PRODUCTS TABLE
          ========================================== */}
      <div className="rounded-lg border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[var(--cream-dark)]">
              <TableRow className="border-b border-[var(--slate)]/15">
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  Product Code
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  Product Name
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  Company
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  Product Group
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  Manufacturer
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10">
                  UOM
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10 text-right">
                  Trade Price
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10 text-right">
                  Retail Price
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10 text-center">
                  Status
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider h-10 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Ready for API population. Empty state placeholder shown below. */}
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-12 text-xs text-[var(--slate)]"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Layers className="h-8 w-8 text-[var(--slate)]/40" />
                    <p className="font-medium text-[var(--ink)]">
                      No product records loaded
                    </p>
                    <p className="text-[11px]">
                      Click &quot;Add Product&quot; to create a new entry or adjust your search filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ==========================================
          ADD PRODUCT MODAL / DIALOG (CreateProductDto)
          ========================================== */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl backdrop-blur-md p-4 sm:p-6">
          <DialogHeader className="border-b border-[var(--slate)]/10 pb-3">
            <DialogTitle className="text-base sm:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--gold)]" />
              Add New Product Master
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--slate)]">
              Fill out all required inventory, classification, and price details.
            </DialogDescription>
          </DialogHeader>

          <form id="create-product-form" onSubmit={handleFormSubmit} className="space-y-6 pt-2">
            {/* Grid Layout: Desktop 2-Col | Tablet 2-Col | Mobile 1-Col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {/* 1. Code */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Code
                </label>
                <Input
                  type="text"
                  name="code"
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 2. Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 3. Item */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Item
                </label>
                <Input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 4. Short Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Short Name
                </label>
                <Input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 5. Company */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Company
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 6. Product Group */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Product Group
                </label>
                <Input
                  type="text"
                  name="productGroup"
                  value={formData.productGroup}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 7. Manufacturer */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Manufacturer
                </label>
                <Input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 8. UOM */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  UOM
                </label>
                <Input
                  type="text"
                  name="uom"
                  value={formData.uom}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 9. Generic */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Generic
                </label>
                <Input
                  type="text"
                  name="generic"
                  value={formData.generic}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 10. Active */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Active
                </label>
                <select
                  name="active"
                  value={formData.active}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* 11. Active Date */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Active Date
                </label>
                <Input
                  type="date"
                  name="activeDate"
                  value={formData.activeDate}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 12. Inactive Date */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Inactive Date
                </label>
                <Input
                  type="date"
                  name="inactiveDate"
                  value={formData.inactiveDate}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 13. Fridge */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Fridge
                </label>
                <select
                  name="fridge"
                  value={formData.fridge}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* 14. Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Type
                </label>
                <Input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 15. Carton Qty */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Carton Qty
                </label>
                <Input
                  type="number"
                  name="cartonQty"
                  value={formData.cartonQty}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 16. Drug Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Drug Type
                </label>
                <Input
                  type="text"
                  name="drugType"
                  value={formData.drugType}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 17. Location */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Location
                </label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 18. WHT */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  WHT
                </label>
                <select
                  name="wht"
                  value={formData.wht}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* 19. Weight */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Weight
                </label>
                <Input
                  type="number"
                  step="0.001"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 20. Liters */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Liters
                </label>
                <Input
                  type="number"
                  step="0.001"
                  name="liters"
                  value={formData.liters}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 21. Dev Box */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Dev Box
                </label>
                <select
                  name="devBox"
                  value={formData.devBox}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* 22. Status */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* PRICES AND FINANCIALS SECTION */}
              <div className="md:col-span-2 pt-3 border-t border-[var(--slate)]/10">
                <h3 className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider mb-3">
                  Pricing & Financial Calculations
                </h3>
              </div>

              {/* 23. Trade Price */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Trade Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="tradePrice"
                  value={formData.tradePrice}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 24. Purchase Price */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Purchase Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 25. Retail Price */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Retail Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="retailPrice"
                  value={formData.retailPrice}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 26. Distribution Price */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Distribution Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="distributionPrice"
                  value={formData.distributionPrice}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 27. Tax */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Tax
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="tax"
                  value={formData.tax}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 28. Sale Discount */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Sale Discount
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="saleDiscount"
                  value={formData.saleDiscount}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 29. Purchase Discount */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Purchase Discount
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="purchaseDiscount"
                  value={formData.purchaseDiscount}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 30. Bonus */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Bonus
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 31. Purchase Discount (Rs) */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Purchase Discount (Rs)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="purchaseDiscountRs"
                  value={formData.purchaseDiscountRs}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 32. Price Range */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Price Range
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 33. Percentage Bonus */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Percentage Bonus
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="percentageBonus"
                  value={formData.percentageBonus}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>

              {/* 34. Purchase Calculation */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Purchase Calculation
                </label>
                <Input
                  type="text"
                  name="purchaseCalculation"
                  value={formData.purchaseCalculation}
                  onChange={handleInputChange}
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                />
              </div>
            </div>

            <DialogFooter className="border-t border-[var(--slate)]/10 pt-3 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-9 text-xs font-semibold border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 text-xs font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--cream)]"
              >
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}