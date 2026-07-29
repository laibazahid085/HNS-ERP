"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Download,
  Upload,
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Company } from "@/types/company";

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.shortName && company.shortName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.city && company.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All" || company.status === statusFilter;
    const matchesCity = cityFilter === "All" || company.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company record?")) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--slate)]/10 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight flex items-center gap-2">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--gold)] shrink-0" />
            Companies
          </h1>
          <p className="text-xs text-[var(--slate)] mt-0.5">
            Manage all registered enterprise tenant and distribution companies.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-10 sm:h-9 border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)] text-xs font-semibold w-full sm:w-auto active:scale-95 transition-transform"
          >
            <Download className="h-3.5 w-3.5 mr-1.5 text-[var(--slate)]" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 sm:h-9 border-[var(--slate)]/20 text-[var(--ink)] hover:bg-[var(--cream-dark)] text-xs font-semibold w-full sm:w-auto active:scale-95 transition-transform"
          >
            <Upload className="h-3.5 w-3.5 mr-1.5 text-[var(--slate)]" />
            Import
          </Button>
          <Link href="/admin/companies/new" className="col-span-2 sm:col-span-1 w-full sm:w-auto">
            <Button
              size="sm"
              className="h-10 sm:h-9 w-full bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--cream)] text-xs font-semibold shadow-sm active:scale-95 transition-transform"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Company
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by code, company name, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] pl-9 pr-3 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="sm:col-span-3">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
              >
                <option value="All">All Cities</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Islamabad">Islamabad</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive View: Cards for Mobile, Data Table for Tablet & Desktop */}
      <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm overflow-hidden">
        {/* Mobile View (< lg screen) */}
        <div className="block lg:hidden divide-y divide-[var(--slate)]/10">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-10 px-4 text-[var(--slate)] text-xs">
              No company records found.
            </div>
          ) : (
            filteredCompanies.map((comp) => (
              <div key={comp.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-[var(--ink)] text-[var(--cream)] font-bold text-xs flex items-center justify-center shrink-0">
                      {comp.shortName ? comp.shortName.slice(0, 2).toUpperCase() : comp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-[var(--ink)] truncate">{comp.name}</h3>
                      <span className="text-[10px] font-semibold text-[var(--gold)] block">{comp.code}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                      comp.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {comp.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1 text-[11px] text-[var(--slate)] pt-1">
                  {comp.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 shrink-0 text-[var(--gold)]" />
                      <span className="truncate">{comp.phone}</span>
                    </div>
                  )}
                  {comp.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3 shrink-0 text-[var(--gold)]" />
                      <span className="truncate">{comp.email}</span>
                    </div>
                  )}
                  {comp.city && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0 text-[var(--gold)]" />
                      <span className="truncate">{comp.city}, {comp.country}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--slate)]/5">
                  <Link href={`/admin/companies/${comp.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-[11px] border-[var(--slate)]/20 text-[var(--ink)]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/companies/${comp.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-[11px] border-[var(--slate)]/20 text-[var(--gold)]"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(comp.id)}
                    className="h-8 px-3 text-[11px] border-[var(--slate)]/20 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View (>= lg screen) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--cream-dark)] text-[var(--slate)] uppercase font-bold text-[10px] tracking-wider border-b border-[var(--slate)]/10">
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Logo</th>
                <th className="py-3.5 px-4">Company Name</th>
                <th className="py-3.5 px-4">Short Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Country</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--slate)]/10 text-[var(--ink)]">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-[var(--slate)]">
                    No company records found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-[var(--cream-dark)]/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-[var(--gold)]">
                      {comp.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-7 w-7 rounded-lg bg-[var(--ink)] text-[var(--cream)] font-bold text-[10px] flex items-center justify-center">
                        {comp.shortName ? comp.shortName.slice(0, 2).toUpperCase() : comp.name.slice(0, 2).toUpperCase()}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[var(--ink)]">
                      {comp.name}
                    </td>
                    <td className="py-3 px-4 text-[var(--slate)]">
                      {comp.shortName || "-"}
                    </td>
                    <td className="py-3 px-4">{comp.phone}</td>
                    <td className="py-3 px-4 text-[var(--slate)]">{comp.email || "-"}</td>
                    <td className="py-3 px-4">{comp.city || "-"}</td>
                    <td className="py-3 px-4">{comp.country || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          comp.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {comp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/companies/${comp.id}`}>
                          <button
                            title="View Details"
                            className="p-1.5 text-[var(--slate)] hover:text-[var(--ink)] rounded transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        <Link href={`/admin/companies/${comp.id}/edit`}>
                          <button
                            title="Edit Record"
                            className="p-1.5 text-[var(--slate)] hover:text-[var(--gold)] rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          title="Delete Record"
                          onClick={() => handleDelete(comp.id)}
                          className="p-1.5 text-[var(--slate)] hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-3 sm:p-4 border-t border-[var(--slate)]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--slate)]">
          <span className="text-center sm:text-left">
            Showing <strong className="text-[var(--ink)]">{filteredCompanies.length}</strong> of{" "}
            <strong className="text-[var(--ink)]">{companies.length}</strong> entries
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="h-8 px-2 border-[var(--slate)]/20 text-[var(--slate)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-[var(--gold)] text-[var(--gold)] font-bold bg-[var(--gold)]/5"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="h-8 px-2 border-[var(--slate)]/20 text-[var(--slate)]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}