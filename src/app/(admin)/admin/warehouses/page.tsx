"use client";

import React, { useState } from "react";
import {
    Warehouse,
    Plus,
    RefreshCw,
    Search,
    Eye,
    Edit,
    Trash2,
    Building2,
    MapPin,
    Phone,
    Mail,
    User,
    X,
    FileText,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ----------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------
export interface WarehouseData {
    id?: string;
    code: string;
    name: string;
    branch: string;
    managerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    province: string;
    country: string;
    zipCode: string;
    description: string;
    status: "Active" | "Inactive";
}

const INITIAL_FORM_STATE: WarehouseData = {
    code: "WH-0000",
    name: "",
    branch: "",
    managerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
    description: "",
    status: "Active",
};

export default function WarehousesPage() {
    // ----------------------------------------------------------------------
    // Local States (Ready for NestJS API replacement)
    // ----------------------------------------------------------------------
    const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Modal Controls
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);

    // Form & Selection State
    const [formData, setFormData] = useState<WarehouseData>(INITIAL_FORM_STATE);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedWarehouseCode, setSelectedWarehouseCode] = useState<string | null>(null);
    const [viewingWarehouse, setViewingWarehouse] = useState<WarehouseData | null>(null);

    // ----------------------------------------------------------------------
    // Backend API Handlers (Stubs ready for Integration)
    // ----------------------------------------------------------------------
    const handleRefresh = async () => {
        setIsLoading(true);
        // Future API call: GET /api/v1/warehouses
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const handleCreateWarehouse = async () => {
        // Future API call: POST /api/v1/warehouses
        setWarehouses((prev) => [formData, ...prev]);
        setIsModalOpen(false);
    };

    const handleUpdateWarehouse = async () => {
        // Future API call: PATCH /api/v1/warehouses/:id
        if (!selectedWarehouseCode) return;
        setWarehouses((prev) =>
            prev.map((wh) => (wh.code === selectedWarehouseCode ? { ...formData } : wh))
        );
        setIsModalOpen(false);
    };

    const handleDeleteWarehouse = async () => {
        // Future API call: DELETE /api/v1/warehouses/:id
        if (!selectedWarehouseCode) return;
        setWarehouses((prev) => prev.filter((wh) => wh.code !== selectedWarehouseCode));
        setIsDeleteDialogOpen(false);
        setSelectedWarehouseCode(null);
    };

    // ----------------------------------------------------------------------
    // UI Trigger Helpers
    // ----------------------------------------------------------------------
    const handleOpenAddModal = () => {
        const nextCode = `WH-${String(warehouses.length + 1001).padStart(4, "0")}`;
        setFormData({ ...INITIAL_FORM_STATE, code: nextCode });
        setIsEditing(false);
        setSelectedWarehouseCode(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (warehouse: WarehouseData) => {
        setFormData(warehouse);
        setSelectedWarehouseCode(warehouse.code);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleOpenDeleteDialog = (code: string) => {
        setSelectedWarehouseCode(code);
        setIsDeleteDialogOpen(true);
    };

    const handleOpenViewDialog = (warehouse: WarehouseData) => {
        setViewingWarehouse(warehouse);
        setIsViewDialogOpen(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdateWarehouse();
        } else {
            handleCreateWarehouse();
        }
    };

    // ----------------------------------------------------------------------
    // Search Calculation
    // ----------------------------------------------------------------------
    const filteredWarehouses = warehouses.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        return (
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q) ||
            item.branch.toLowerCase().includes(q) ||
            item.city.toLowerCase().includes(q) ||
            item.managerName.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-6 max-w-full font-sans text-[var(--ink)]">
            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <PageHeader
                    title="Warehouses"
                    description="Manage all warehouses used for inventory and stock distribution."
                />
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        className="h-9 sm:h-10 text-xs sm:text-sm font-medium border-[var(--slate)]/25 text-[var(--ink)] hover:bg-[var(--cream-dark)] flex-1 sm:flex-initial"
                    >
                        <RefreshCw
                            className={`h-4 w-4 mr-2 text-[var(--cyan)] ${isLoading ? "animate-spin" : ""
                                }`}
                        />
                        Refresh
                    </Button>
                    <Button
                        onClick={handleOpenAddModal}
                        className="h-9 sm:h-10 text-xs sm:text-sm font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white flex-1 sm:flex-initial"
                    >
                        <Plus className="h-4 w-4 mr-1.5" />
                        Add Warehouse
                    </Button>
                </div>
            </div>

            {/* SEARCH BAR */}
            <Card className="bg-[var(--cream)] border-[var(--slate)]/15 shadow-sm p-4">
                <div className="relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--slate)]" />
                    <Input
                        type="text"
                        placeholder="Search by warehouse name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 text-xs sm:text-sm bg-[var(--cream-dark)] border-[var(--slate)]/20 focus:border-[var(--gold)] text-[var(--ink)] placeholder:text-[var(--slate)]/60"
                    />
                </div>
            </Card>

            {/* TABLE (DESKTOP) & CARDS (MOBILE) */}
            <Card className="bg-[var(--cream)] border-[var(--slate)]/15 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    {filteredWarehouses.length === 0 ? (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-3">
                            <div className="p-4 bg-[var(--cream-dark)] rounded-full border border-[var(--slate)]/15">
                                <Warehouse className="h-10 w-10 text-[var(--slate)]" />
                            </div>
                            <h3 className="text-base font-bold text-[var(--ink)]">
                                No Warehouses Found
                            </h3>
                            <p className="text-xs text-[var(--slate)] max-w-sm">
                                Create your first warehouse to start managing inventory.
                            </p>
                            <Button
                                onClick={handleOpenAddModal}
                                className="mt-2 h-9 text-xs font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white"
                            >
                                <Plus className="h-4 w-4 mr-1.5" />
                                Add Warehouse
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* DESKTOP TABLE */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-[var(--cream-dark)]">
                                        <TableRow className="border-b border-[var(--slate)]/15">
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Warehouse Code
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Warehouse Name
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Branch
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Manager
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Phone
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                                Address
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase text-center">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase text-right pr-6">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-[var(--slate)]/10">
                                        {filteredWarehouses.map((wh) => (
                                            <TableRow
                                                key={wh.code}
                                                className="hover:bg-[var(--cream-dark)]/50 transition-colors"
                                            >
                                                <TableCell className="font-mono text-xs font-bold text-[var(--gold)]">
                                                    {wh.code}
                                                </TableCell>
                                                <TableCell className="text-xs font-bold text-[var(--ink)]">
                                                    {wh.name}
                                                </TableCell>
                                                <TableCell className="text-xs text-[var(--slate)]">
                                                    {wh.branch || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-xs text-[var(--ink)]">
                                                    {wh.managerName || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-xs text-[var(--slate)] font-mono">
                                                    {wh.phone || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-xs text-[var(--slate)] max-w-xs truncate">
                                                    {wh.address ? `${wh.address}, ${wh.city}` : wh.city || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {wh.status === "Active" ? (
                                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-100 text-[10px] font-semibold">
                                                            Active
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-100 text-[10px] font-semibold">
                                                            Inactive
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleOpenViewDialog(wh)}
                                                            className="h-7 w-7 p-0 text-[var(--cyan)] hover:bg-[var(--cream-dark)]"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleOpenEditModal(wh)}
                                                            className="h-7 w-7 p-0 text-[var(--purple)] hover:bg-[var(--cream-dark)]"
                                                            title="Edit Warehouse"
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleOpenDeleteDialog(wh.code)}
                                                            className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50"
                                                            title="Delete Warehouse"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* MOBILE CARDS VIEW */}
                            <div className="block md:hidden divide-y divide-[var(--slate)]/10">
                                {filteredWarehouses.map((wh) => (
                                    <div key={wh.code} className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs font-bold text-[var(--gold)]">
                                                {wh.code}
                                            </span>
                                            {wh.status === "Active" ? (
                                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] font-semibold">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-slate-100 text-slate-700 border-slate-300 text-[10px] font-semibold">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-[var(--ink)]">
                                                {wh.name}
                                            </h4>
                                            <p className="text-xs text-[var(--slate)]">
                                                Branch: {wh.branch || "N/A"}
                                            </p>
                                        </div>

                                        <div className="text-xs space-y-1 text-[var(--slate)] bg-[var(--cream-dark)] p-2.5 rounded border border-[var(--slate)]/10">
                                            <p>
                                                <strong className="text-[var(--ink)]">Manager:</strong>{" "}
                                                {wh.managerName || "N/A"}
                                            </p>
                                            <p>
                                                <strong className="text-[var(--ink)]">Phone:</strong>{" "}
                                                {wh.phone || "N/A"}
                                            </p>
                                            <p>
                                                <strong className="text-[var(--ink)]">Location:</strong>{" "}
                                                {wh.city ? `${wh.city}, ${wh.country}` : "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 pt-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenViewDialog(wh)}
                                                className="flex-1 h-8 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)]"
                                            >
                                                <Eye className="h-3.5 w-3.5 mr-1 text-[var(--cyan)]" />
                                                View
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenEditModal(wh)}
                                                className="flex-1 h-8 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)]"
                                            >
                                                <Edit className="h-3.5 w-3.5 mr-1 text-[var(--purple)]" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenDeleteDialog(wh.code)}
                                                className="flex-1 h-8 text-xs font-medium border-rose-200 text-rose-600 hover:bg-rose-50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* ==========================================
          ADD / EDIT WAREHOUSE MODAL
          ========================================== */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--cream)] border border-[var(--slate)]/20 shadow-2xl backdrop-blur-md p-6">
                    <DialogHeader className="border-b border-[var(--slate)]/15 pb-4">
                        <DialogTitle className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-[var(--gold)]" />
                            {isEditing ? "Edit Warehouse" : "Add Warehouse"}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-[var(--slate)]">
                            Enter operational parameters, location details, and management information.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Code */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Warehouse Code
                                </label>
                                <Input
                                    readOnly
                                    value={formData.code}
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 font-mono font-bold text-[var(--gold)]"
                                />
                            </div>

                            {/* Warehouse Name */}
                            <div className="sm:col-span-2">
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Warehouse Name *
                                </label>
                                <Input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Central Logistics Depot"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Branch */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Branch
                                </label>
                                <Input
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                    placeholder="e.g. South Region Branch"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Manager Name */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Manager Name
                                </label>
                                <Input
                                    name="managerName"
                                    value={formData.managerName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Ahmed Raza"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Status
                                </label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: (val as "Active" | "Inactive") || "Active",
                                        }))
                                    }
                                >
                                    <SelectTrigger className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[var(--cream)] border-[var(--slate)]/20">
                                        <SelectItem value="Active" className="text-xs">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="Inactive" className="text-xs">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Phone Number
                                </label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+92 21 34567890"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-2">
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="warehouse.south@dms.com"
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
                                    placeholder="Plot 12-B, Industrial Zone Sector 15"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    City
                                </label>
                                <Input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Karachi"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Province */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Province / State
                                </label>
                                <Input
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Sindh"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Zip / Postal Code
                                </label>
                                <Input
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 74900"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Country */}
                            <div className="sm:col-span-3">
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Country
                                </label>
                                <Input
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Pakistan"
                                    className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20"
                                />
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-3">
                                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                                    Description / Operational Notes
                                </label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Cold storage capacity, main distribution hub details..."
                                    className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[70px]"
                                />
                            </div>
                        </div>

                        {/* STICKY / BOTTOM BUTTONS */}
                        <DialogFooter className="sticky bottom-0 bg-[var(--cream)] border-t border-[var(--slate)]/15 pt-3 gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full sm:w-auto h-9 text-xs font-semibold border-[var(--slate)]/20 text-[var(--ink)]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto h-9 text-xs font-semibold bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white"
                            >
                                Save Warehouse
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ==========================================
          DELETE CONFIRMATION DIALOG
          ========================================== */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="max-w-md bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl backdrop-blur-md p-6">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold text-rose-600">
                            Delete Warehouse?
                        </DialogTitle>
                        <DialogDescription className="text-xs text-[var(--slate)]">
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-xs text-[var(--slate)]">
                        Are you sure you want to permanently remove warehouse record{" "}
                        <strong className="text-[var(--ink)]">{selectedWarehouseCode}</strong>?
                    </p>
                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="w-full sm:w-auto h-8 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteWarehouse}
                            className="w-full sm:w-auto h-8 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ==========================================
          VIEW WAREHOUSE DETAILS DIALOG
          ========================================== */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-md bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl p-6">
                    <DialogHeader className="border-b border-[var(--slate)]/15 pb-3">
                        <DialogTitle className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-[var(--gold)]" />
                            Warehouse Details
                        </DialogTitle>
                    </DialogHeader>

                    {viewingWarehouse && (
                        <div className="space-y-3 text-xs text-[var(--ink)]">
                            <div className="bg-[var(--cream-dark)] p-3 rounded border border-[var(--slate)]/15">
                                <span className="font-mono text-[10px] font-bold text-[var(--gold)]">
                                    {viewingWarehouse.code}
                                </span>
                                <h4 className="font-bold text-sm text-[var(--ink)]">
                                    {viewingWarehouse.name}
                                </h4>
                                <p className="text-[var(--slate)] text-[11px]">
                                    Branch: {viewingWarehouse.branch || "N/A"}
                                </p>
                            </div>

                            <div className="space-y-1.5 text-[var(--slate)]">
                                <p>
                                    <strong className="text-[var(--ink)]">Manager:</strong>{" "}
                                    {viewingWarehouse.managerName || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">Phone:</strong>{" "}
                                    {viewingWarehouse.phone || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">Email:</strong>{" "}
                                    {viewingWarehouse.email || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">Address:</strong>{" "}
                                    {viewingWarehouse.address || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">City / Province:</strong>{" "}
                                    {viewingWarehouse.city} {viewingWarehouse.province && `, ${viewingWarehouse.province}`}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">Country / Zip:</strong>{" "}
                                    {viewingWarehouse.country} {viewingWarehouse.zipCode && `(${viewingWarehouse.zipCode})`}
                                </p>
                                <p>
                                    <strong className="text-[var(--ink)]">Status:</strong>{" "}
                                    <span
                                        className={
                                            viewingWarehouse.status === "Active"
                                                ? "text-emerald-700 font-bold"
                                                : "text-slate-600 font-bold"
                                        }
                                    >
                                        {viewingWarehouse.status}
                                    </span>
                                </p>
                                {viewingWarehouse.description && (
                                    <p className="pt-1 border-t border-[var(--slate)]/10">
                                        <strong className="text-[var(--ink)]">Notes:</strong>{" "}
                                        {viewingWarehouse.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsViewDialogOpen(false)}
                            className="w-full h-8 text-xs font-medium border-[var(--slate)]/20 text-[var(--ink)]"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}