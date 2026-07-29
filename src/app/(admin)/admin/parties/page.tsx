"use client";

import React, { useState } from "react";
import {
    Search,
    Plus,
    RefreshCw,
    Download,
    Filter,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Building,
    User,
    Phone,
    Mail,
    FileText,
    ShieldAlert,
    Calendar,
    CheckCircle2,
    XCircle,
    X,
    CreditCard,
    MapPin,
    Briefcase,
    AlertCircle,
    Clock,
    Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

// ----------------------------------------------------------------------
// Types & Form Interfaces
// ----------------------------------------------------------------------

export type PartyType = "Distributor" | "Wholesaler" | "Retailer" | "Institution" | "Pharmacy";
export type PartySubType = "Key Account" | "General" | "Sub-Dealer" | "Chain Store";

export interface PartyFormData {
    // General Information
    partyCode: string;
    partyName: string;
    area: string;
    company: string;
    phone: string;
    fax: string;
    contactPerson: string;
    address: string;
    mobile: string;
    whatsApp: string;
    email: string;

    // Business Information
    partyType: PartyType;
    subType: PartySubType;
    dealer: string;
    wht: string;
    nic: string;
    strn: string;
    ntn: string;
    salesman: string;
    region: string;
    creditLimit: number | string;
    creditDays: number | string;

    // Status & Licensing
    isActive: boolean;
    isBlacklisted: boolean;
    allowBooking: boolean;
    isDistribution: boolean;
    licenceNo: string;
    expiryDate: string;

    // Remarks
    notes: string;
    internalRemarks: string;
}

const INITIAL_FORM_STATE: PartyFormData = {
    partyCode: "PRT-0000", // Generated automatically
    partyName: "",
    area: "",
    company: "",
    phone: "",
    fax: "",
    contactPerson: "",
    address: "",
    mobile: "",
    whatsApp: "",
    email: "",
    partyType: "Retailer",
    subType: "General",
    dealer: "",
    wht: "",
    nic: "",
    strn: "",
    ntn: "",
    salesman: "",
    region: "",
    creditLimit: "",
    creditDays: "",
    isActive: true,
    isBlacklisted: false,
    allowBooking: true,
    isDistribution: false,
    licenceNo: "",
    expiryDate: "",
    notes: "",
    internalRemarks: "",
};

export default function PartiesPage() {
    // ----------------------------------------------------------------------
    // State Management (Local State - API Integration Ready)
    // ----------------------------------------------------------------------
    const [parties, setParties] = useState<PartyFormData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter States
    const [typeFilter, setTypeFilter] = useState<string>("ALL");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Modal & Sheet Controls
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingCode, setEditingCode] = useState<string | null>(null);
    const [viewingParty, setViewingParty] = useState<PartyFormData | null>(null);

    // Form State & Validation
    const [formData, setFormData] = useState<PartyFormData>(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;

    // ----------------------------------------------------------------------
    // Form Handlers & Validation
    // ----------------------------------------------------------------------
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear field-level error on edit
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.partyName.trim()) newErrors.partyName = "Party name is required.";
        if (!formData.company.trim()) newErrors.company = "Company is required.";
        if (!formData.area.trim()) newErrors.area = "Area is required.";
        if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
        if (!formData.region.trim()) newErrors.region = "Region is required.";

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOpenAddModal = () => {
        const newCode = `PRT-${String(parties.length + 1001).padStart(4, "0")}`;
        setFormData({ ...INITIAL_FORM_STATE, partyCode: newCode });
        setErrors({});
        setIsEditing(false);
        setEditingCode(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (party: PartyFormData) => {
        setFormData(party);
        setErrors({});
        setIsEditing(true);
        setEditingCode(party.partyCode);
        setIsModalOpen(true);
    };

    const handleSaveParty = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (isEditing && editingCode) {
            setParties((prev) =>
                prev.map((p) => (p.partyCode === editingCode ? { ...formData } : p))
            );
        } else {
            setParties((prev) => [formData, ...prev]);
        }

        setIsModalOpen(false);
    };

    const handleDeleteParty = (code: string) => {
        setParties((prev) => prev.filter((p) => p.partyCode !== code));
    };

    // ----------------------------------------------------------------------
    // Filter & Pagination Calculations
    // ----------------------------------------------------------------------
    const filteredParties = parties.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !q ||
            item.partyName.toLowerCase().includes(q) ||
            item.partyCode.toLowerCase().includes(q) ||
            item.company.toLowerCase().includes(q) ||
            item.mobile.includes(q) ||
            item.ntn.toLowerCase().includes(q);

        const matchesType = typeFilter === "ALL" || item.partyType === typeFilter;
        const matchesStatus =
            statusFilter === "ALL" ||
            (statusFilter === "Active" && item.isActive && !item.isBlacklisted) ||
            (statusFilter === "Blacklisted" && item.isBlacklisted) ||
            (statusFilter === "Inactive" && !item.isActive);

        return matchesSearch && matchesType && matchesStatus;
    });

    const totalPages = Math.ceil(filteredParties.length / pageSize) || 1;
    const paginatedParties = filteredParties.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="space-y-4 sm:space-y-6 max-w-full p-2 sm:p-4 font-sans text-[var(--ink)]">
            {/* ==========================================
          BREADCRUMB & HEADER
          ========================================== */}
            <div className="space-y-1">
                <nav className="flex items-center text-[11px] font-semibold text-[var(--slate)] uppercase tracking-wider gap-1.5">
                    <span>DMS ERP</span>
                    <span>/</span>
                    <span>Customers & Sales</span>
                    <span>/</span>
                    <span className="text-[var(--gold)]">Parties Management</span>
                </nav>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--cream)] p-4 sm:p-6 rounded-lg border border-[var(--slate)]/15 shadow-sm">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] flex items-center gap-2">
                            <Building className="h-6 w-6 text-[var(--gold)]" />
                            Parties (Customers)
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--slate)] mt-0.5">
                            Manage accounts, credit terms, tax identification, and licensing statuses.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={() => setIsLoading(true)}
                            className="h-9 sm:h-10 text-xs sm:text-sm font-medium border-[var(--slate)]/25 text-[var(--ink)] hover:bg-[var(--cream-dark)] flex-1 sm:flex-initial"
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-2 text-[var(--cyan)] ${isLoading ? "animate-spin" : ""
                                    }`}
                            />
                            Refresh
                        </Button>
                        <Button
                            variant="outline"
                            className="h-9 sm:h-10 text-xs sm:text-sm font-medium border-[var(--slate)]/25 text-[var(--ink)] hover:bg-[var(--cream-dark)] flex-1 sm:flex-initial"
                        >
                            <Download className="h-4 w-4 mr-2 text-[var(--purple)]" />
                            Export
                        </Button>
                        <Button
                            onClick={handleOpenAddModal}
                            className="h-9 sm:h-10 text-xs sm:text-sm font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white flex-1 sm:flex-initial"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            Add Party
                        </Button>
                    </div>
                </div>
            </div>

            {/* ==========================================
          SEARCH & FILTERS BAR
          ========================================== */}
            <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--slate)]" />
                    <Input
                        type="text"
                        placeholder="Search by Code, Name, Company, Mobile or NTN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 text-xs sm:text-sm bg-[var(--cream-dark)] border-[var(--slate)]/20 focus:border-[var(--gold)] text-[var(--ink)] placeholder:text-[var(--slate)]/60"
                    />
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="w-36">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                        >
                            <option value="ALL">All Types</option>
                            <option value="Distributor">Distributor</option>
                            <option value="Wholesaler">Wholesaler</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Institution">Institution</option>
                            <option value="Pharmacy">Pharmacy</option>
                        </select>
                    </div>

                    <div className="w-36">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="Active">Active Only</option>
                            <option value="Blacklisted">Blacklisted</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ==========================================
          RESPONSIVE TABLE CONTAINER
          ========================================== */}
            <div className="bg-[var(--cream)] border border-[var(--slate)]/15 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto relative">
                    <Table>
                        <TableHeader className="bg-[var(--cream-dark)] sticky top-0 z-10 shadow-sm">
                            <TableRow className="border-b border-[var(--slate)]/15">
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                                    Code / Party Name
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                                    Type / Sub-Type
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                                    Area & Region
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                                    Contact Person
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-right">
                                    Credit Limit
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-center">
                                    Credit Days
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-center">
                                    Status
                                </TableHead>
                                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-right pr-4">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-[var(--slate)]/10">
                            {isLoading ? (
                                /* LOADING STATE */
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-16">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <RefreshCw className="h-8 w-8 text-[var(--cyan)] animate-spin" />
                                            <p className="text-xs font-semibold text-[var(--slate)]">
                                                Loading Party Ledger & Master Records...
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedParties.length > 0 ? (
                                /* DATA ROWS */
                                paginatedParties.map((item) => (
                                    <TableRow
                                        key={item.partyCode}
                                        className="hover:bg-[var(--cream-dark)]/50 transition-colors"
                                    >
                                        <TableCell className="text-xs font-bold text-[var(--ink)]">
                                            <div>
                                                {item.partyName}
                                                <span className="block text-[10px] font-mono text-[var(--gold)]">
                                                    {item.partyCode} • {item.company}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-xs text-[var(--ink)]">
                                            <span className="font-semibold">{item.partyType}</span>
                                            <span className="block text-[10px] text-[var(--slate)]">
                                                {item.subType}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-xs text-[var(--ink)]">
                                            <div>{item.area}</div>
                                            <div className="text-[10px] text-[var(--slate)]">
                                                {item.region}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-xs text-[var(--slate)]">
                                            <div className="font-medium text-[var(--ink)]">
                                                {item.contactPerson || "N/A"}
                                            </div>
                                            <div className="text-[10px]">{item.mobile}</div>
                                        </TableCell>

                                        <TableCell className="text-xs font-semibold text-right text-[var(--ink)]">
                                            {item.creditLimit
                                                ? `Rs ${Number(item.creditLimit).toLocaleString()}`
                                                : "No Limit"}
                                        </TableCell>

                                        <TableCell className="text-xs text-center font-medium text-[var(--ink)]">
                                            {item.creditDays ? `${item.creditDays} Days` : "Immediate"}
                                        </TableCell>

                                        <TableCell className="text-center py-2.5">
                                            {item.isBlacklisted ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                                                    Blacklisted
                                                </span>
                                            ) : item.isActive ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                                                    Inactive
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-right pr-4 py-2.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setViewingParty(item)}
                                                    className="h-7 w-7 p-0 text-[var(--cyan)] hover:bg-[var(--cream-dark)]"
                                                    title="View Party Details"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleOpenEditModal(item)}
                                                    className="h-7 w-7 p-0 text-[var(--purple)] hover:bg-[var(--cream-dark)]"
                                                    title="Edit Party Master"
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteParty(item.partyCode)}
                                                    className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50"
                                                    title="Delete Party Record"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                /* EMPTY STATE */
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-16">
                                        <div className="flex flex-col items-center justify-center space-y-2 text-[var(--slate)]">
                                            <Briefcase className="h-10 w-10 text-[var(--slate)]/30" />
                                            <p className="font-bold text-sm text-[var(--ink)]">
                                                No Party Customer Records Found
                                            </p>
                                            <p className="text-xs max-w-sm">
                                                No active parties matching your current search criteria. Click below to register a new customer party.
                                            </p>
                                            <Button
                                                onClick={handleOpenAddModal}
                                                className="mt-2 h-8 text-xs font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white"
                                            >
                                                <Plus className="h-3.5 w-3.5 mr-1" />
                                                Create First Party
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* ==========================================
            PAGINATION FOOTER
            ========================================== */}
                <div className="flex items-center justify-between p-3.5 bg-[var(--cream-dark)] border-t border-[var(--slate)]/15 text-xs text-[var(--slate)]">
                    <div>
                        Showing{" "}
                        <span className="font-bold text-[var(--ink)]">
                            {filteredParties.length === 0
                                ? 0
                                : (currentPage - 1) * pageSize + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-bold text-[var(--ink)]">
                            {Math.min(currentPage * pageSize, filteredParties.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-[var(--ink)]">
                            {filteredParties.length}
                        </span>{" "}
                        parties
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="h-8 px-2 border-[var(--slate)]/20 text-[var(--ink)] disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-2 font-semibold text-[var(--ink)]">
                            {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage >= totalPages}
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            className="h-8 px-2 border-[var(--slate)]/20 text-[var(--ink)] disabled:opacity-40"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* ==========================================
          ADD / EDIT PARTY MODAL (CENTERED & BLURRED)
          ========================================== */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--cream)] border border-[var(--slate)]/20 shadow-2xl backdrop-blur-md p-6">
                    <DialogHeader className="border-b border-[var(--slate)]/15 pb-4">
                        <DialogTitle className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                            <Building className="h-5 w-5 text-[var(--gold)]" />
                            {isEditing ? "Edit Customer Party Master" : "Register New Customer Party"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-[var(--slate)]">
                            Fill in the master entity profile, credit terms, tax details, and licensing status.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSaveParty} className="space-y-6 pt-2">
                        {/* 1. GENERAL INFORMATION SECTION */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5 border-b border-[var(--slate)]/10 pb-1">
                                <User className="h-3.5 w-3.5" />
                                General Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Party Code (Readonly) */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Party Code
                                    </label>
                                    <Input
                                        readOnly
                                        value={formData.partyCode}
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 font-mono font-bold text-[var(--gold)]"
                                    />
                                </div>

                                {/* Party Name */}
                                <div className="sm:col-span-2">
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Party Name *
                                    </label>
                                    <Input
                                        name="partyName"
                                        value={formData.partyName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Al-Madina Wholesale Medical Store"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.partyName ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.partyName && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.partyName}
                                        </span>
                                    )}
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Company *
                                    </label>
                                    <Input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Al-Madina Group"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.company ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.company && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.company}
                                        </span>
                                    )}
                                </div>

                                {/* Area */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Area *
                                    </label>
                                    <Input
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Korangi Industrial Area"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.area ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.area && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.area}
                                        </span>
                                    )}
                                </div>

                                {/* Contact Person */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Contact Person
                                    </label>
                                    <Input
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Tariq Mahmood"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-3">
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Complete Address
                                    </label>

                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Plot 45-C, Medicine Market, Korangi, Karachi"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Mobile & WhatsApp */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Mobile *
                                    </label>
                                    <Input
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        placeholder="+92 300 1234567"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.mobile ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.mobile && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.mobile}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        WhatsApp
                                    </label>
                                    <Input
                                        name="whatsApp"
                                        value={formData.whatsApp}
                                        onChange={handleInputChange}
                                        placeholder="+92 300 1234567"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="info@almadina.pk"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.email ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.email && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                {/* Phone & Fax */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Landline Phone
                                    </label>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+92 21 35001234"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Fax
                                    </label>
                                    <Input
                                        name="fax"
                                        value={formData.fax}
                                        onChange={handleInputChange}
                                        placeholder="+92 21 35001235"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. BUSINESS INFORMATION SECTION */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5 border-b border-[var(--slate)]/10 pb-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                Business & Tax Details
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Party Type */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Party Type
                                    </label>
                                    <select
                                        name="partyType"
                                        value={formData.partyType}
                                        onChange={handleInputChange}
                                        className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                                    >
                                        <option value="Distributor">Distributor</option>
                                        <option value="Wholesaler">Wholesaler</option>
                                        <option value="Retailer">Retailer</option>
                                        <option value="Institution">Institution</option>
                                        <option value="Pharmacy">Pharmacy</option>
                                    </select>
                                </div>

                                {/* Sub Type */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Sub Type
                                    </label>
                                    <select
                                        name="subType"
                                        value={formData.subType}
                                        onChange={handleInputChange}
                                        className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                                    >
                                        <option value="General">General</option>
                                        <option value="Key Account">Key Account</option>
                                        <option value="Sub-Dealer">Sub-Dealer</option>
                                        <option value="Chain Store">Chain Store</option>
                                    </select>
                                </div>

                                {/* Dealer */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Assigned Dealer
                                    </label>
                                    <Input
                                        name="dealer"
                                        value={formData.dealer}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Master Dealer South"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Region */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Region *
                                    </label>
                                    <Input
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Sindh South"
                                        className={`h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 ${errors.region ? "border-rose-500" : ""
                                            }`}
                                    />
                                    {errors.region && (
                                        <span className="text-[10px] text-rose-600 font-medium">
                                            {errors.region}
                                        </span>
                                    )}
                                </div>

                                {/* Salesman */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Assigned Salesman
                                    </label>
                                    <Input
                                        name="salesman"
                                        value={formData.salesman}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Kamran Malik"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* WHT */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        WHT % Rate
                                    </label>
                                    <Input
                                        name="wht"
                                        value={formData.wht}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2.5%"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* NTN */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        NTN Number
                                    </label>
                                    <Input
                                        name="ntn"
                                        value={formData.ntn}
                                        onChange={handleInputChange}
                                        placeholder="1234567-8"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* STRN */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        STRN Number
                                    </label>
                                    <Input
                                        name="strn"
                                        value={formData.strn}
                                        onChange={handleInputChange}
                                        placeholder="12-34-5678-901-23"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* NIC */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        CNIC Number
                                    </label>
                                    <Input
                                        name="nic"
                                        value={formData.nic}
                                        onChange={handleInputChange}
                                        placeholder="42101-1234567-1"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Credit Limit */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Credit Limit (PKR)
                                    </label>
                                    <Input
                                        type="number"
                                        name="creditLimit"
                                        value={formData.creditLimit}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 500000"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>

                                {/* Credit Days */}
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Credit Days Allowed
                                    </label>
                                    <Input
                                        type="number"
                                        name="creditDays"
                                        value={formData.creditDays}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 30"
                                        className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. STATUS & LICENSING SECTION */}
                        <div className="grid grid-cols-2 gap-4 bg-[var(--cream-dark)] p-3 rounded-md border border-[var(--slate)]/15">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="rounded border-[var(--slate)] text-[var(--gold)] focus:ring-[var(--gold)]"
                                />
                                <span className="text-xs font-semibold text-[var(--ink)]">
                                    Active
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isBlacklisted"
                                    checked={formData.isBlacklisted}
                                    onChange={handleInputChange}
                                    className="rounded border-[var(--slate)] text-rose-600 focus:ring-rose-500"
                                />
                                <span className="text-xs font-semibold text-rose-700">
                                    Blacklisted
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="allowBooking"
                                    checked={formData.allowBooking}
                                    onChange={handleInputChange}
                                    className="rounded border-[var(--slate)] text-[var(--gold)] focus:ring-[var(--gold)]"
                                />
                                <span className="text-xs font-semibold text-[var(--ink)]">
                                    Allow Booking
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isDistribution"
                                    checked={formData.isDistribution}
                                    onChange={handleInputChange}
                                    className="rounded border-[var(--slate)] text-[var(--gold)] focus:ring-[var(--gold)]"
                                />
                                <span className="text-xs font-semibold text-[var(--ink)]">
                                    Distribution
                                </span>
                            </label>
                        </div>

                        {/* 4. REMARKS SECTION */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] flex items-center gap-1.5 border-b border-[var(--slate)]/10 pb-1">
                                <FileText className="h-3.5 w-3.5" />
                                Remarks & Ledger Notes
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Public Notes
                                    </label>
                                    <Textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Delivery instructions, special discounts..."
                                        className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[70px]"
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                        Internal Admin Remarks
                                    </label>
                                    <Textarea
                                        name="internalRemarks"
                                        value={formData.internalRemarks}
                                        onChange={handleInputChange}
                                        placeholder="Internal risk evaluation, payment history notes..."
                                        className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[70px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MODAL FOOTER BUTTONS */}
                        <DialogFooter className="border-t border-[var(--slate)]/15 pt-4 gap-2">
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
                                className="h-9 text-xs font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white"
                            >
                                {isEditing ? "Update Party Record" : "Save Party Record"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ==========================================
          VIEW PARTY DETAILS DRAWER (SHEET)
          ========================================== */}
            <Sheet
                open={Boolean(viewingParty)}
                onOpenChange={(open) => !open && setViewingParty(null)}
            >
                <SheetContent className="w-full sm:max-w-md bg-[var(--cream)] border-l border-[var(--slate)]/20 p-6 overflow-y-auto space-y-6">
                    <SheetHeader className="border-b border-[var(--slate)]/10 pb-4">
                        <SheetTitle className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                            <Building className="h-5 w-5 text-[var(--gold)]" />
                            Party Master Profile
                        </SheetTitle>
                        <SheetDescription className="text-xs text-[var(--slate)]">
                            Complete ERP profile and financial parameters for this account.
                        </SheetDescription>
                    </SheetHeader>

                    {viewingParty && (
                        <div className="space-y-5 text-xs text-[var(--ink)]">
                            {/* Header Badge */}
                            <div className="bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15 space-y-1">
                                <span className="text-[10px] font-mono text-[var(--gold)] font-bold">
                                    {viewingParty.partyCode}
                                </span>
                                <p className="font-bold text-sm text-[var(--ink)]">
                                    {viewingParty.partyName}
                                </p>
                                <p className="text-[var(--slate)]">{viewingParty.company}</p>
                            </div>

                            {/* General Contact Info */}
                            <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)]">
                                    Contact Information
                                </h4>
                                <div className="space-y-1 text-[var(--slate)]">
                                    <p>
                                        <strong className="text-[var(--ink)]">Contact Person:</strong>{" "}
                                        {viewingParty.contactPerson || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">Mobile:</strong>{" "}
                                        {viewingParty.mobile}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">WhatsApp:</strong>{" "}
                                        {viewingParty.whatsApp || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">Email:</strong>{" "}
                                        {viewingParty.email || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">Address:</strong>{" "}
                                        {viewingParty.address || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Financial Terms */}
                            <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)]">
                                    Credit & Financial Terms
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-[10px] text-[var(--slate)] block uppercase font-semibold">
                                            Credit Limit
                                        </span>
                                        <span className="font-bold">
                                            {viewingParty.creditLimit
                                                ? `Rs ${Number(viewingParty.creditLimit).toLocaleString()}`
                                                : "No Limit"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-[var(--slate)] block uppercase font-semibold">
                                            Credit Days
                                        </span>
                                        <span className="font-bold">
                                            {viewingParty.creditDays ? `${viewingParty.creditDays} Days` : "Immediate"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tax & Identifiers */}
                            <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)]">
                                    Tax & Regulatory Identifiers
                                </h4>
                                <div className="space-y-1 text-[var(--slate)]">
                                    <p>
                                        <strong className="text-[var(--ink)]">NTN:</strong>{" "}
                                        {viewingParty.ntn || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">STRN:</strong>{" "}
                                        {viewingParty.strn || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">CNIC:</strong>{" "}
                                        {viewingParty.nic || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">Licence No:</strong>{" "}
                                        {viewingParty.licenceNo || "N/A"}
                                    </p>
                                    <p>
                                        <strong className="text-[var(--ink)]">Expiry Date:</strong>{" "}
                                        {viewingParty.expiryDate || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}