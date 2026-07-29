"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Save,
  AlertCircle,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyFormData } from "@/types/company";

export default function EditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState<CompanyFormData>({
    code: "",
    name: "",
    shortName: "",
    email: "",
    phone: "",
    whatsapp: "",
    ntn: "",
    strn: "",
    website: "",
    address: "",
    city: "Karachi",
    province: "Sindh",
    country: "Pakistan",
    postalCode: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.code.trim()) newErrors.code = "Company Code is required.";
    if (!formData.name.trim()) newErrors.name = "Company Name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Direct routing on save ready for API integration
    router.push("/admin/companies");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--slate)]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link href={`/admin/companies/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 border-[var(--slate)]/20 text-[var(--slate)] hover:text-[var(--ink)] active:scale-95 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[var(--ink)]">
              Edit Company
            </h1>
            <p className="text-xs text-[var(--slate)]">
              Update company specifications and tax attributes for ID: {id}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
        {/* Company Info Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[var(--gold)] shrink-0" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Company Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] ${
                    errors.code ? "border-red-500" : "border-[var(--slate)]/20"
                  }`}
                />
                {errors.code && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.code}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] ${
                    errors.name ? "border-red-500" : "border-[var(--slate)]/20"
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.name}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Short Name
                </label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Official Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Tax Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
            <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
              <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--gold)] shrink-0" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] ${
                    errors.phone ? "border-red-500" : "border-[var(--slate)]/20"
                  }`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  WhatsApp Business
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
            <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
              <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--gold)] shrink-0" />
                Tax Identifiers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  NTN (National Tax Number)
                </label>
                <input
                  type="text"
                  name="ntn"
                  value={formData.ntn}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  STRN (Sales Tax Reg Number)
                </label>
                <input
                  type="text"
                  name="strn"
                  value={formData.strn}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Address & Status Card */}
        <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-sm">
          <CardHeader className="border-b border-[var(--slate)]/10 pb-3 p-4 sm:p-5">
            <CardTitle className="text-xs sm:text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0" />
              Address & Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--ink)] block">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Province
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)] block">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-[var(--ink)] block">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full sm:w-48 h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
          <Link href={`/admin/companies/${id}`} className="w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto h-11 sm:h-10 px-5 border-[var(--slate)]/20 text-[var(--slate)] text-xs font-semibold active:scale-95 transition-transform"
            >
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            className="w-full sm:w-auto h-11 sm:h-10 px-6 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--cream)] text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Save className="h-4 w-4" />
            <span>Update Company</span>
          </Button>
        </div>
      </form>
    </div>
  );
}