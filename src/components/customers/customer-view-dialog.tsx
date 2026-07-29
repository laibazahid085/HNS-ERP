'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomerFormData } from './customer-form-dialog';
import { Building2, Phone, Mail, MapPin, ShieldAlert, CreditCard } from 'lucide-react';

interface CustomerViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerFormData | null;
}

export function CustomerViewDialog({
  isOpen,
  onClose,
  customer,
}: CustomerViewDialogProps) {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Profile Summary"
      description={`System Code: ${customer.customerCode}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Status Badges Header */}
        <div className="flex items-center gap-3">
          <Badge variant={customer.isActive ? 'Approved' : 'Cancelled'}>
            {customer.isActive ? 'Active Account' : 'Inactive'}
          </Badge>
          {customer.isBlacklisted && (
            <Badge variant="Critical">Blacklisted</Badge>
          )}
        </div>

        {/* Primary Profile Details */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] p-4">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-5 w-5 text-[#00BFFF]" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Business Title</p>
              <p className="text-sm font-semibold text-[#001F5B] dark:text-white">{customer.businessName}</p>
              <p className="text-xs text-[#5a6478] dark:text-[#a0aec0]">Proprietor: {customer.ownerName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-[#C02080]" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Location & Region</p>
              <p className="text-sm font-semibold text-[#001F5B] dark:text-white">{customer.city || 'N/A'}</p>
              <p className="text-xs text-[#5a6478] dark:text-[#a0aec0]">{customer.area} | {customer.region}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#5a6478]" />
            <div>
              <p className="text-[10px] text-[#5a6478]">Phone</p>
              <p className="text-xs font-medium text-[#001F5B] dark:text-white">{customer.phone || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-500" />
            <div>
              <p className="text-[10px] text-[#5a6478]">WhatsApp</p>
              <p className="text-xs font-medium text-[#001F5B] dark:text-white">{customer.whatsapp || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#5a6478]" />
            <div>
              <p className="text-[10px] text-[#5a6478]">Email</p>
              <p className="text-xs font-medium text-[#001F5B] dark:text-white">{customer.email || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Legal Identifiers */}
        <div className="rounded-[12px] bg-[#f0f2f7]/50 dark:bg-[#0a2d6b]/40 p-4 space-y-2">
          <p className="text-xs font-semibold text-[#001F5B] dark:text-white">Tax & Legal Registrations</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[#5a6478]">CNIC: </span>
              <span className="font-medium text-[#001F5B] dark:text-white">{customer.cnic || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#5a6478]">NTN: </span>
              <span className="font-medium text-[#001F5B] dark:text-white">{customer.ntn || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#5a6478]">STRN: </span>
              <span className="font-medium text-[#001F5B] dark:text-white">{customer.strn || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Credit Rules */}
        <div className="flex items-center justify-between rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] p-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[#4B0082]" />
            <div>
              <p className="text-xs font-semibold text-[#001F5B] dark:text-white">Commercial Terms</p>
              <p className="text-xs text-[#5a6478]">Credit Limit: PKR {customer.creditLimit || '0'}</p>
            </div>
          </div>
          <Badge variant="cyan">{customer.creditDays || '0'} Days Term</Badge>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Close Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
}