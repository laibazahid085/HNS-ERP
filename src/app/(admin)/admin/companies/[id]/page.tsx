"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Building2,
  Phone,
  MapPin,
  FileText,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types/company";

export default function CompanyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Ready state hook structure for API binding
  const company: Company | null = null;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--slate)]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/companies">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-[var(--slate)]/20 text-[var(--slate)] hover:text-[var(--ink)] active:scale-95 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[var(--ink)]">
                {company ? (company as Company).name : "Company Details"}
              </h1>
              {company && (
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    (company as Company).status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {(company as Company).status}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--slate)]">ID: {id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/admin/companies" className="w-1/2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto h-9 border-[var(--slate)]/20 text-[var(--slate)] hover:text-[var(--ink)] text-xs font-semibold active:scale-95 transition-transform"
            >
              Back
            </Button>
          </Link>
          <Link href={`/admin/companies/${id}/edit`} className="w-1/2 sm:w-auto">
            <Button
              size="sm"
              className="w-full sm:w-auto h-9 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--cream)] text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              <Edit className="h-3.5 w-3.5" />
              <span>Edit Company</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* General Information Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[var(--gold)] shrink-0" />
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">Company Code</span>
              <span className="font-bold text-[var(--gold)]">
                {company ? (company as Company).code : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">Full Legal Name</span>
              <span className="font-semibold text-[var(--ink)] text-right">
                {company ? (company as Company).name : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">Short Name</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).shortName || "-" : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--slate)]">Official Website</span>
              {company && (company as Company).website ? (
                <a
                  href={(company as Company).website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--cyan)] hover:underline font-semibold"
                >
                  {(company as Company).website}
                </a>
              ) : (
                <span className="font-semibold text-[var(--ink)]">-</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <Phone className="h-4 w-4 text-[var(--gold)] shrink-0" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">Official Phone</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).phone : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">WhatsApp Business</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).whatsapp || "-" : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--slate)]">Email Address</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).email || "-" : "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tax Information Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[var(--gold)] shrink-0" />
              Tax Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">National Tax Number (NTN)</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).ntn || "-" : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--slate)]">Sales Tax Reg (STRN)</span>
              <span className="font-semibold text-[var(--ink)]">
                {company ? (company as Company).strn || "-" : "-"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">Street Address</span>
              <span className="font-semibold text-[var(--ink)] text-right">
                {company ? (company as Company).address || "-" : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[var(--slate)]/5">
              <span className="text-[var(--slate)]">City / Province</span>
              <span className="font-semibold text-[var(--ink)]">
                {company && ((company as Company).city || (company as Company).province)
                  ? `${(company as Company).city || ""}, ${(company as Company).province || ""}`
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[var(--slate)]">Country / Postal Code</span>
              <span className="font-semibold text-[var(--ink)]">
                {company && ((company as Company).country || (company as Company).postalCode)
                  ? `${(company as Company).country || ""} (${(company as Company).postalCode || ""})`
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Meta Footer */}
      <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--slate)] gap-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[var(--gold)] shrink-0" />
            <span>
              Created on:{" "}
              <strong className="text-[var(--ink)]">
                {company ? (company as Company).createdAt || "-" : "-"}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[var(--cyan)] shrink-0" />
            <span>
              Last updated:{" "}
              <strong className="text-[var(--ink)]">
                {company ? (company as Company).updatedAt || "-" : "-"}
              </strong>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}