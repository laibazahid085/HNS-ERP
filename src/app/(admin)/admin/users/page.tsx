"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  RefreshCw,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  Building2,
  CreditCard,
  Phone,
  Mail,
  Calendar,
  FileText,
  AlertTriangle,
  Ban,
  RotateCcw,
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
// Types & Interfaces
// ----------------------------------------------------------------------

export type ApprovalStatus = "Pending" | "Approved" | "Rejected";
export type PaymentStatus = "Paid" | "Unpaid";
export type AccountStatus = "Active" | "Inactive" | "Access Denied";
export type PlanDuration = "14 Days Trial" | "3 Months" | "6 Months" | "1 Year";

export interface CustomerRegistration {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  selectedPlan: PlanDuration;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  approvalStatus: ApprovalStatus;
  accountStatus: AccountStatus;
  registrationDate: string;
  transactionId: string;
  paymentDate: string;
  generatedUsername?: string;
  rejectionReason?: string;
  approvalNotes?: string;
  denialReason?: string;
}

// Initial in-memory data state matching the customer onboarding workflow
const INITIAL_REGISTRATIONS: CustomerRegistration[] = [
  {
    id: "REG-9012",
    businessName: "Al-Madina Pharma & Distribution",
    ownerName: "Tariq Mahmood",
    email: "tariq@almadinapharma.pk",
    phone: "+92 300 1234567",
    address: "Plot 45-C, Medicine Market, Korangi, Karachi",
    selectedPlan: "1 Year",
    amountPaid: 45000,
    paymentStatus: "Paid",
    approvalStatus: "Pending",
    accountStatus: "Inactive",
    registrationDate: "2026-07-28",
    transactionId: "TXN-884920194",
    paymentDate: "2026-07-28 14:32",
  },
  {
    id: "REG-9013",
    businessName: "Khyber Medical Traders",
    ownerName: "Shahbaz Khan",
    email: "shahbaz@khybertraders.com",
    phone: "+92 321 9876543",
    address: "Shop 12, Commercial Plaza, Saddar, Rawalpindi",
    selectedPlan: "3 Months",
    amountPaid: 15000,
    paymentStatus: "Paid",
    approvalStatus: "Pending",
    accountStatus: "Inactive",
    registrationDate: "2026-07-29",
    transactionId: "TXN-773019284",
    paymentDate: "2026-07-29 09:15",
  },
  {
    id: "REG-9010",
    businessName: "Crescent Logistics & Supply",
    ownerName: "Usman Ali",
    email: "u.ali@crescentlogistics.pk",
    phone: "+92 333 4567890",
    address: "Main GT Road, Gujranwala",
    selectedPlan: "6 Months",
    amountPaid: 28000,
    paymentStatus: "Paid",
    approvalStatus: "Approved",
    accountStatus: "Active",
    registrationDate: "2026-07-25",
    transactionId: "TXN-661029384",
    paymentDate: "2026-07-25 11:20",
    generatedUsername: "crescent_admin",
    approvalNotes: "Verified NTN and payment confirmation.",
  },
  {
    id: "REG-9008",
    businessName: "Zubair Goods Transport Agency",
    ownerName: "Zubair Ahmed",
    email: "info@zubairgoods.com",
    phone: "+92 301 5551234",
    address: "Truck Stand, Hawkesbay Road, Karachi",
    selectedPlan: "14 Days Trial",
    amountPaid: 0,
    paymentStatus: "Unpaid",
    approvalStatus: "Rejected",
    accountStatus: "Inactive",
    registrationDate: "2026-07-20",
    transactionId: "N/A",
    paymentDate: "N/A",
    rejectionReason: "Payment verification failed. Unpaid bank voucher.",
  },
];

export default function UserApprovalsPage() {
  // ----------------------------------------------------------------------
  // State Management
  // ----------------------------------------------------------------------
  const [registrations, setRegistrations] = useState<CustomerRegistration[]>(
    INITIAL_REGISTRATIONS
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter States
  const [selectedPlan, setSelectedPlan] = useState<string>("ALL");
  const [selectedApprovalStatus, setSelectedApprovalStatus] =
    useState<string>("ALL");
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Drawer & Dialog States
  const [viewingRegistration, setViewingRegistration] =
    useState<CustomerRegistration | null>(null);
  const [approvingRegistration, setApprovingRegistration] =
    useState<CustomerRegistration | null>(null);
  const [rejectingRegistration, setRejectingRegistration] =
    useState<CustomerRegistration | null>(null);

  // Admin Access Denial Dialog States
  const [denyingRegistration, setDenyingRegistration] =
    useState<CustomerRegistration | null>(null);
  const [denialReasonInput, setDenialReasonInput] = useState("");

  // Approval Form Inputs
  const [generatedUsernameInput, setGeneratedUsernameInput] = useState("");
  const [approvalNotesInput, setApprovalNotesInput] = useState("");

  // Rejection Form Inputs
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");

  // ----------------------------------------------------------------------
  // Computed Summary Metrics
  // ----------------------------------------------------------------------
  const summaryMetrics = useMemo(() => {
    const pending = registrations.filter(
      (r) => r.approvalStatus === "Pending"
    ).length;
    const approved = registrations.filter(
      (r) => r.approvalStatus === "Approved"
    ).length;
    const rejected = registrations.filter(
      (r) => r.approvalStatus === "Rejected"
    ).length;
    const active = registrations.filter(
      (r) => r.accountStatus === "Active"
    ).length;
    return { pending, approved, rejected, active };
  }, [registrations]);

  // Restricted Plans List
  const planOptions: PlanDuration[] = [
    "14 Days Trial",
    "3 Months",
    "6 Months",
    "1 Year",
  ];

  // ----------------------------------------------------------------------
  // Filter & Search Logic
  // ----------------------------------------------------------------------
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.businessName.toLowerCase().includes(q) ||
        item.ownerName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.transactionId.toLowerCase().includes(q);

      const matchesPlan =
        selectedPlan === "ALL" || item.selectedPlan === selectedPlan;
      const matchesApproval =
        selectedApprovalStatus === "ALL" ||
        item.approvalStatus === selectedApprovalStatus;
      const matchesPayment =
        selectedPaymentStatus === "ALL" ||
        item.paymentStatus === selectedPaymentStatus;
      const matchesAccount =
        selectedStatus === "ALL" || item.accountStatus === selectedStatus;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesApproval &&
        matchesPayment &&
        matchesAccount
      );
    });
  }, [
    registrations,
    searchQuery,
    selectedPlan,
    selectedApprovalStatus,
    selectedPaymentStatus,
    selectedStatus,
  ]);

  // ----------------------------------------------------------------------
  // Actions Handlers
  // ----------------------------------------------------------------------

  // Open Approval Modal & auto-suggest username
  const handleOpenApproveModal = (item: CustomerRegistration) => {
    const suggestedUser =
      item.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .slice(0, 16) + "_admin";

    setGeneratedUsernameInput(suggestedUser);
    setApprovalNotesInput("");
    setApprovingRegistration(item);
  };

  // Submit Approval Action
  const handleConfirmApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!approvingRegistration || !generatedUsernameInput.trim()) return;

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === approvingRegistration.id) {
          return {
            ...r,
            approvalStatus: "Approved",
            accountStatus: "Active",
            generatedUsername: generatedUsernameInput.trim(),
            approvalNotes: approvalNotesInput.trim(),
          };
        }
        return r;
      })
    );

    setApprovingRegistration(null);
  };

  // Open Rejection Modal
  const handleOpenRejectModal = (item: CustomerRegistration) => {
    setRejectionReasonInput("");
    setRejectingRegistration(item);
  };

  // Submit Rejection Action
  const handleConfirmRejection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRegistration || !rejectionReasonInput.trim()) return;

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === rejectingRegistration.id) {
          return {
            ...r,
            approvalStatus: "Rejected",
            accountStatus: "Inactive",
            rejectionReason: rejectionReasonInput.trim(),
          };
        }
        return r;
      })
    );

    setRejectingRegistration(null);
  };

  // Open Access Denial Modal
  const handleOpenDenyModal = (item: CustomerRegistration) => {
    setDenialReasonInput("");
    setDenyingRegistration(item);
  };

  // Confirm Access Denial
  const handleConfirmDenyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!denyingRegistration || !denialReasonInput.trim()) return;

    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === denyingRegistration.id) {
          return {
            ...r,
            accountStatus: "Access Denied",
            denialReason: denialReasonInput.trim(),
          };
        }
        return r;
      })
    );

    setDenyingRegistration(null);
  };

  // Restore User Access
  const handleRestoreAccess = (id: string) => {
    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            accountStatus: "Active",
            denialReason: undefined,
          };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full p-2 sm:p-4 font-sans text-[var(--ink)]">
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--cream)] p-4 sm:p-6 rounded-lg border border-[var(--slate)]/15 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            User Approvals & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-[var(--slate)] mt-0.5">
            Review new customer registrations awaiting approval or manage user access permissions.
          </p>
        </div>

        {/* Top Right Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-9 sm:h-10 text-xs sm:text-sm font-medium border-[var(--slate)]/25 text-[var(--ink)] hover:bg-[var(--cream-dark)] flex-1 sm:flex-initial"
          >
            <RefreshCw className="h-4 w-4 mr-2 text-[var(--cyan)]" />
            Refresh
          </Button>
          <Button
            variant="outline"
            className="h-9 sm:h-10 text-xs sm:text-sm font-medium border-[var(--slate)]/25 text-[var(--ink)] hover:bg-[var(--cream-dark)] flex-1 sm:flex-initial"
          >
            <Download className="h-4 w-4 mr-2 text-[var(--purple)]" />
            Export
          </Button>
        </div>
      </div>

      {/* ==========================================
          SUMMARY CARDS
          ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Pending Approvals */}
        <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--slate)]">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Pending Approvals
            </span>
            <div className="p-2 rounded-md bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
            {summaryMetrics.pending}
          </div>
        </div>

        {/* Approved Users */}
        <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--slate)]">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Approved Users
            </span>
            <div className="p-2 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
            {summaryMetrics.approved}
          </div>
        </div>

        {/* Rejected Users */}
        <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--slate)]">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Rejected Users
            </span>
            <div className="p-2 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
              <UserX className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
            {summaryMetrics.rejected}
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[var(--slate)]">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Active Customers
            </span>
            <div className="p-2 rounded-md bg-[var(--cream-dark)] text-[var(--gold)] border border-[var(--gold)]/20">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
            {summaryMetrics.active}
          </div>
        </div>
      </div>

      {/* ==========================================
          SEARCH & FILTERS PANEL
          ========================================== */}
      <div className="bg-[var(--cream)] p-4 rounded-lg border border-[var(--slate)]/15 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--slate)]" />
          <Input
            type="text"
            placeholder="Search by Business Name, Owner Name, Email, Phone, Transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs sm:text-sm bg-[var(--cream-dark)] border-[var(--slate)]/20 focus:border-[var(--gold)] text-[var(--ink)] placeholder:text-[var(--slate)]/60"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Plan Duration Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--slate)]">
              Plan Duration
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="ALL">All Plans</option>
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          {/* Approval Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--slate)]">
              Approval Status
            </label>
            <select
              value={selectedApprovalStatus}
              onChange={(e) => setSelectedApprovalStatus(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="ALL">All Approvals</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--slate)]">
              Payment Status
            </label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="ALL">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          {/* Account Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-[var(--slate)]">
              Account Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-md text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="ALL">All Account Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Access Denied">Access Denied</option>
            </select>
          </div>
        </div>
      </div>

      {/* ==========================================
          REGISTRATIONS TABLE
          ========================================== */}
      <div className="bg-[var(--cream)] border border-[var(--slate)]/15 rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto relative">
          <Table>
            <TableHeader className="bg-[var(--cream-dark)] sticky top-0 z-10 shadow-sm">
              <TableRow className="border-b border-[var(--slate)]/15">
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                  Business Name
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                  Owner Name
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                  Contact (Email / Phone)
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11">
                  Selected Plan
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-right">
                  Amount Paid
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-center">
                  Payment Status
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-center">
                  Approval Status
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-center">
                  Account Access
                </TableHead>
                <TableHead className="text-[11px] font-bold text-[var(--ink)] uppercase h-11 text-right pr-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[var(--slate)]/10">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-[var(--cream-dark)]/50 transition-colors"
                  >
                    {/* Business Name */}
                    <TableCell className="text-xs font-bold text-[var(--ink)]">
                      <div>
                        {item.businessName}
                        {item.generatedUsername && (
                          <span className="block text-[10px] font-mono font-medium text-[var(--gold)]">
                            User: {item.generatedUsername}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Owner Name */}
                    <TableCell className="text-xs font-medium text-[var(--ink)]">
                      {item.ownerName}
                    </TableCell>

                    {/* Email & Phone */}
                    <TableCell className="text-xs text-[var(--slate)]">
                      <div>{item.email}</div>
                      <div className="text-[10px]">{item.phone}</div>
                    </TableCell>

                    {/* Selected Plan */}
                    <TableCell className="text-xs font-semibold text-[var(--ink)]">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[var(--cream-dark)] border border-[var(--slate)]/20 text-[11px]">
                        {item.selectedPlan}
                      </span>
                    </TableCell>

                    {/* Amount Paid */}
                    <TableCell className="text-xs font-semibold text-right text-[var(--ink)]">
                      Rs {item.amountPaid.toLocaleString()}
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell className="text-center py-2.5">
                      {item.paymentStatus === "Paid" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                          Unpaid
                        </span>
                      )}
                    </TableCell>

                    {/* Approval Status */}
                    <TableCell className="text-center py-2.5">
                      {item.approvalStatus === "Approved" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Approved
                        </span>
                      )}
                      {item.approvalStatus === "Pending" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                          Pending
                        </span>
                      )}
                      {item.approvalStatus === "Rejected" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                          Rejected
                        </span>
                      )}
                    </TableCell>

                    {/* Account Status Badge */}
                    <TableCell className="text-center py-2.5">
                      {item.accountStatus === "Active" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      )}
                      {item.accountStatus === "Inactive" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                          Inactive
                        </span>
                      )}
                      {item.accountStatus === "Access Denied" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-400 animate-pulse">
                          Access Denied
                        </span>
                      )}
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell className="text-right pr-4 py-2.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingRegistration(item)}
                          className="h-7 px-2 text-xs font-medium text-[var(--cyan)] hover:bg-[var(--cream-dark)]"
                          title="View Registration Details"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>

                        {/* Initial Approval Controls */}
                        {item.approvalStatus === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleOpenApproveModal(item)}
                              className="h-7 px-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenRejectModal(item)}
                              className="h-7 px-2.5 text-xs font-semibold border-rose-300 text-rose-700 hover:bg-rose-50"
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}

                        {/* Admin Access Control for Approved Users */}
                        {item.approvalStatus === "Approved" && (
                          <>
                            {item.accountStatus === "Active" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenDenyModal(item)}
                                className="h-7 px-2.5 text-xs font-semibold border-rose-400 text-rose-700 hover:bg-rose-100/50"
                                title="Revoke/Deny user access due to violation or error"
                              >
                                <Ban className="h-3.5 w-3.5 mr-1 text-rose-600" />
                                Deny Access
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRestoreAccess(item.id)}
                                className="h-7 px-2.5 text-xs font-semibold border-emerald-400 text-emerald-700 hover:bg-emerald-50"
                                title="Restore user access to the system"
                              >
                                <RotateCcw className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                                Restore
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* Empty State */
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-[var(--slate)]">
                      <Users className="h-8 w-8 text-[var(--slate)]/40" />
                      <p className="font-semibold text-sm text-[var(--ink)]">
                        No User Registrations Found
                      </p>
                      <p className="text-xs">
                        No customer approval requests match your active search or filter criteria.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ==========================================
          VIEW DETAILS RIGHT-SIDE DRAWER (SHEET)
          ========================================== */}
      <Sheet
        open={Boolean(viewingRegistration)}
        onOpenChange={(open) => !open && setViewingRegistration(null)}
      >
        <SheetContent className="w-full sm:max-w-md bg-[var(--cream)] border-l border-[var(--slate)]/20 p-6 overflow-y-auto space-y-6">
          <SheetHeader className="border-b border-[var(--slate)]/10 pb-4">
            <SheetTitle className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[var(--gold)]" />
              Registration Details
            </SheetTitle>
            <SheetDescription className="text-xs text-[var(--slate)]">
              Full application profile submitted during online onboarding.
            </SheetDescription>
          </SheetHeader>

          {viewingRegistration && (
            <div className="space-y-5 text-xs text-[var(--ink)]">
              {/* Business Section */}
              <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)] tracking-wider">
                  Business Information
                </h4>
                <div className="space-y-1">
                  <p className="font-bold text-sm">
                    {viewingRegistration.businessName}
                  </p>
                  <p className="text-[var(--slate)]">
                    {viewingRegistration.address}
                  </p>
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)] tracking-wider">
                  Owner Contact
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-[var(--slate)]" />
                    <span className="font-semibold">
                      {viewingRegistration.ownerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[var(--slate)]" />
                    <span>{viewingRegistration.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[var(--slate)]" />
                    <span>{viewingRegistration.phone}</span>
                  </div>
                </div>
              </div>

              {/* Plan & Payment */}
              <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)] tracking-wider">
                  Subscription Plan & Financials
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[var(--slate)] uppercase font-semibold block">
                      Plan Duration
                    </span>
                    <span className="font-bold">
                      {viewingRegistration.selectedPlan}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--slate)] uppercase font-semibold block">
                      Amount Paid
                    </span>
                    <span className="font-bold">
                      Rs {viewingRegistration.amountPaid.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--slate)] uppercase font-semibold block">
                      Transaction ID
                    </span>
                    <span className="font-mono text-[11px]">
                      {viewingRegistration.transactionId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--slate)] uppercase font-semibold block">
                      Payment Date
                    </span>
                    <span>{viewingRegistration.paymentDate}</span>
                  </div>
                </div>
              </div>

              {/* Status & Assigned Username */}
              <div className="space-y-2 bg-[var(--cream-dark)] p-3.5 rounded-md border border-[var(--slate)]/15">
                <h4 className="text-[11px] font-bold uppercase text-[var(--gold)] tracking-wider">
                  System Status
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span>Approval Status:</span>
                  <span className="font-bold">
                    {viewingRegistration.approvalStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Account Status:</span>
                  <span className="font-bold">
                    {viewingRegistration.accountStatus}
                  </span>
                </div>
                {viewingRegistration.generatedUsername && (
                  <div className="flex items-center justify-between pt-1 border-t border-[var(--slate)]/10">
                    <span>Generated Username:</span>
                    <span className="font-mono font-bold text-[var(--gold)]">
                      {viewingRegistration.generatedUsername}
                    </span>
                  </div>
                )}
                {viewingRegistration.rejectionReason && (
                  <div className="pt-2 text-rose-700 text-[11px] border-t border-[var(--slate)]/10">
                    <strong>Rejection Reason:</strong>{" "}
                    {viewingRegistration.rejectionReason}
                  </div>
                )}
                {viewingRegistration.denialReason && (
                  <div className="pt-2 text-rose-800 font-semibold text-[11px] border-t border-[var(--slate)]/10">
                    <strong>Admin Denial Reason:</strong>{" "}
                    {viewingRegistration.denialReason}
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ==========================================
          APPROVE REGISTRATION MODAL
          ========================================== */}
      <Dialog
        open={Boolean(approvingRegistration)}
        onOpenChange={(open) => !open && setApprovingRegistration(null)}
      >
        <DialogContent className="max-w-md bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl backdrop-blur-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Approve Registration & Provision User
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--slate)] pt-1">
              Approving will set account status to <strong>Active</strong> and allow system login.
            </DialogDescription>
          </DialogHeader>

          {approvingRegistration && (
            <form onSubmit={handleConfirmApproval} className="space-y-4 pt-2">
              {/* Summary Brief */}
              <div className="bg-[var(--cream-dark)] p-3 rounded-md border border-[var(--slate)]/15 text-xs space-y-1">
                <p className="font-bold text-[var(--ink)]">
                  {approvingRegistration.businessName}
                </p>
                <p className="text-[var(--slate)]">
                  {approvingRegistration.ownerName} ({approvingRegistration.phone})
                </p>
                <p className="text-[var(--gold)] font-medium">
                  Duration: {approvingRegistration.selectedPlan} (Rs{" "}
                  {approvingRegistration.amountPaid.toLocaleString()})
                </p>
              </div>

              {/* Unique Username Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Assign Unique System Username *
                </label>
                <Input
                  type="text"
                  required
                  value={generatedUsernameInput}
                  onChange={(e) => setGeneratedUsernameInput(e.target.value)}
                  placeholder="e.g. almadina_admin"
                  className="h-9 text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 font-mono"
                />
              </div>

              {/* Optional Approval Notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Approval Notes (Optional)
                </label>
                <Textarea
                  value={approvalNotesInput}
                  onChange={(e) => setApprovalNotesInput(e.target.value)}
                  placeholder="Verification details, voucher numbers..."
                  className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[70px]"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setApprovingRegistration(null)}
                  className="h-9 text-xs font-semibold border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Confirm & Activate User
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ==========================================
          REJECT REGISTRATION MODAL
          ========================================== */}
      <Dialog
        open={Boolean(rejectingRegistration)}
        onOpenChange={(open) => !open && setRejectingRegistration(null)}
      >
        <DialogContent className="max-w-md bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl backdrop-blur-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              Reject Registration Request
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--slate)] pt-1">
              Please specify the reason for rejecting this onboarding application.
            </DialogDescription>
          </DialogHeader>

          {rejectingRegistration && (
            <form onSubmit={handleConfirmRejection} className="space-y-4 pt-2">
              <div className="bg-[var(--cream-dark)] p-3 rounded-md border border-[var(--slate)]/15 text-xs">
                <p className="font-bold text-[var(--ink)]">
                  {rejectingRegistration.businessName}
                </p>
                <p className="text-[var(--slate)]">
                  Applicant: {rejectingRegistration.ownerName}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Reason for Rejection *
                </label>
                <Textarea
                  required
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  placeholder="State the reason (e.g. Invalid bank receipt, NTN verification failed)..."
                  className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[90px]"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRejectingRegistration(null)}
                  className="h-9 text-xs font-semibold border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Confirm Reject
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ==========================================
          DENY ACCESS (REVOKE USER) MODAL
          ========================================== */}
      <Dialog
        open={Boolean(denyingRegistration)}
        onOpenChange={(open) => !open && setDenyingRegistration(null)}
      >
        <DialogContent className="max-w-md bg-[var(--cream)] border border-[var(--slate)]/20 shadow-xl backdrop-blur-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
              <Ban className="h-5 w-5 text-rose-600" />
              Deny User Access
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--slate)] pt-1">
              Revoke login access immediately for suspicious activity, terms violation, or policy mismatch.
            </DialogDescription>
          </DialogHeader>

          {denyingRegistration && (
            <form onSubmit={handleConfirmDenyAccess} className="space-y-4 pt-2">
              <div className="bg-[var(--cream-dark)] p-3 rounded-md border border-[var(--slate)]/15 text-xs space-y-1">
                <p className="font-bold text-[var(--ink)]">
                  {denyingRegistration.businessName}
                </p>
                <p className="text-[var(--slate)]">
                  User: {denyingRegistration.generatedUsername || denyingRegistration.ownerName}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--ink)] uppercase">
                  Reason for Denying Access *
                </label>
                <Textarea
                  required
                  value={denialReasonInput}
                  onChange={(e) => setDenialReasonInput(e.target.value)}
                  placeholder="State why access is being blocked (e.g. Payment chargeback, Terms violation, Unverified documentation)..."
                  className="text-xs bg-[var(--cream-dark)] border-[var(--slate)]/20 min-h-[90px]"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDenyingRegistration(null)}
                  className="h-9 text-xs font-semibold border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Deny Access Now
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}