'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import {
  CustomerFormDialog,
  CustomerFormData,
} from '@/components/customers/customer-form-dialog';
import { CustomerViewDialog } from '@/components/customers/customer-view-dialog';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Users,
  Building2,
  RefreshCw,
  Ban,
} from 'lucide-react';

export default function CustomersPage() {
  // State setup
  const [customers, setCustomers] = useState<CustomerFormData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dialog Controls
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(
    null
  );

  // Filter Actions
  const handleOpenCreate = () => {
    setSelectedCustomer(null);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (customer: CustomerFormData) => {
    setSelectedCustomer(customer);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleOpenView = (customer: CustomerFormData) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const handleDelete = (code: string) => {
    setCustomers((prev) => prev.filter((c) => c.customerCode !== code));
  };

  const handleFormSubmit = (data: CustomerFormData) => {
    if (formMode === 'create') {
      setCustomers((prev) => [data, ...prev]);
    } else {
      setCustomers((prev) =>
        prev.map((c) => (c.customerCode === data.customerCode ? data : c))
      );
    }
  };

  // Filter Pipeline
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchesRegion =
      regionFilter === 'ALL' || c.region === regionFilter;

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && c.isActive && !c.isBlacklisted) ||
      (statusFilter === 'INACTIVE' && !c.isActive) ||
      (statusFilter === 'BLACKLISTED' && c.isBlacklisted);

    return matchesSearch && matchesRegion && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Customer Directory"
        description="Manage commercial clients, credit policies, and regional distribution accounts."
        actions={
          <Button variant="primary" onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        }
      />

      {/* Filter and Control Toolbar */}
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search code, business name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>

            {/* Region Select */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#5a6478]" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="h-10 rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#00143c] px-3 text-xs text-[#001F5B] dark:text-white focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="ALL">All Regions</option>
                <option value="Southern Territory">Southern Territory</option>
                <option value="Northern Territory">Northern Territory</option>
                <option value="Central Zone">Central Zone</option>
              </select>
            </div>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-[12px] border border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#00143c] px-3 text-xs text-[#001F5B] dark:text-white focus:border-[#00BFFF] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLACKLISTED">Blacklisted</option>
            </select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setRegionFilter('ALL');
              setStatusFilter('ALL');
            }}
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Reset Filters
          </Button>
        </div>
      </Card>

      {/* Customer Data Table */}
      {filteredCustomers.length === 0 ? (
        /* Empty State */
        <Card className="flex min-h-[380px] flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f2f7] dark:bg-[#0a2d6b] text-[#5a6478]">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[#001F5B] dark:text-white">
            No customers found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-[#5a6478] dark:text-[#a0aec0]">
            {customers.length === 0
              ? 'No commercial accounts have been added yet. Register your first customer to get started.'
              : 'No customer records match your current search parameters or filter criteria.'}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {customers.length === 0 ? (
              <Button variant="primary" onClick={handleOpenCreate}>
                <Plus className="mr-2 h-4 w-4" /> Add First Customer
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setRegionFilter('ALL');
                  setStatusFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Data Render */
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Business & Owner</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Credit Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((customer) => (
                  <TableRow key={customer.customerCode}>
                    <TableCell className="font-semibold text-[#001F5B] dark:text-white">
                      {customer.customerCode}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#001F5B] dark:text-white">
                          {customer.businessName}
                        </span>
                        <span className="text-xs text-[#5a6478] dark:text-[#a0aec0]">
                          Proprietor: {customer.ownerName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{customer.city}</span>
                        <span className="text-xs text-[#5a6478] dark:text-[#a0aec0]">
                          {customer.area}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>{customer.phone}</div>
                      <div className="text-[#5a6478]">{customer.email}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      PKR {customer.creditLimit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={customer.isActive ? 'Approved' : 'Cancelled'}
                        >
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {customer.isBlacklisted && (
                          <Badge variant="Critical">
                            <Ban className="mr-1 h-3 w-3 inline" /> Blacklisted
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenView(customer)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-[#00BFFF]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(customer)}
                          title="Edit Customer"
                        >
                          <Pencil className="h-4 w-4 text-[#5a6478]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(customer.customerCode)}
                          title="Delete Customer"
                        >
                          <Trash2 className="h-4 w-4 text-rose-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredCustomers.length}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* Form Dialog Modal */}
      <CustomerFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedCustomer}
        mode={formMode}
      />

      {/* View Dialog Modal */}
      <CustomerViewDialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
}