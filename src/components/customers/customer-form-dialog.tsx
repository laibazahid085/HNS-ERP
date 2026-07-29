'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';

export interface CustomerFormData {
  customerCode: string;
  businessName: string;
  ownerName: string;
  cnic: string;
  ntn: string;
  strn: string;
  region: string;
  area: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  creditLimit: string;
  creditDays: string;
  isActive: boolean;
  isBlacklisted: boolean;
}

interface CustomerFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => void;
  initialData?: CustomerFormData | null;
  mode: 'create' | 'edit';
}

const defaultFormData: CustomerFormData = {
  customerCode: '',
  businessName: '',
  ownerName: '',
  cnic: '',
  ntn: '',
  strn: '',
  region: '',
  area: '',
  address: '',
  city: '',
  phone: '',
  whatsapp: '',
  email: '',
  creditLimit: '0',
  creditDays: '0',
  isActive: true,
  isBlacklisted: false,
};

export function CustomerFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: CustomerFormDialogProps) {
  const [formData, setFormData] = useState<CustomerFormData>(defaultFormData);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof CustomerFormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New Customer' : 'Edit Customer Record'}
      description="Enter complete details for commercial account registration."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Identifiers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Customer Code <span className="text-rose-500">*</span>
            </label>
            <Input
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              placeholder="e.g. CUST-0102"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <Input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Legal entity name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Owner Name <span className="text-rose-500">*</span>
            </label>
            <Input
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Proprietor / Managing Name"
              required
            />
          </div>
        </div>

        {/* Legal & Tax Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              CNIC
            </label>
            <Input
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="42101-XXXXXXX-X"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              NTN
            </label>
            <Input
              name="ntn"
              value={formData.ntn}
              onChange={handleChange}
              placeholder="7-Digit NTN"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              STRN
            </label>
            <Input
              name="strn"
              value={formData.strn}
              onChange={handleChange}
              placeholder="Sales Tax Reg Number"
            />
          </div>
        </div>

        {/* Territory & Region */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Region
            </label>
            <Input
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="e.g. Southern Territory"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Area
            </label>
            <Input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g. Central Zone"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              City <span className="text-rose-500">*</span>
            </label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Karachi"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
            Full Address
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="Street address, shop/suite number"
            className="w-full rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#00143c] p-2.5 text-sm text-[#001F5B] dark:text-white placeholder-[#5a6478] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 0000000"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              WhatsApp
            </label>
            <Input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+92 300 0000000"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="commercial@domain.com"
            />
          </div>
        </div>

        {/* Financial Policy */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Credit Limit (PKR)
            </label>
            <Input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#001F5B] dark:text-white">
              Credit Days
            </label>
            <Input
              type="number"
              name="creditDays"
              value={formData.creditDays}
              onChange={handleChange}
              placeholder="30"
            />
          </div>
        </div>

        {/* Status Switches */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-[#f0f2f7]/30 dark:bg-[#0a2d6b]/30 p-4">
          <Switch
            label="Active Status"
            description="Allow this customer to place new commercial orders."
            checked={formData.isActive}
            onChange={(e) => handleSwitchChange('isActive', e.target.checked)}
          />
          <Switch
            label="Blacklist Customer"
            description="Prevent all transactions and flag account across hubs."
            checked={formData.isBlacklisted}
            onChange={(e) => handleSwitchChange('isBlacklisted', e.target.checked)}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 border-t border-[#f0f2f7] dark:border-[#0a2d6b] pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit" variant="primary">
            <Save className="mr-2 h-4 w-4" /> Save Customer
          </Button>
        </div>
      </form>
    </Modal>
  );
}