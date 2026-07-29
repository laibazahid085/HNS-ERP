"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Building2,
  User,
  Mail,
  Phone,
  FileText,
  MapPin,
  Lock,
  Eye,     
  EyeOff,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
  Globe,
  Building,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_PLANS } from "@/data/plans";

export default function RegisterPage() {
  const router = useRouter();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Current Active Step (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Selected Plan State (Default to Professional Tier)
  const [selectedPlanId, setSelectedPlanId] = useState<string>("plan_pro");

  // Step 2: Business Registration Form State
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 3: Payment Form State
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [billingAddress, setBillingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived selected plan object
  const activePlan = MOCK_PLANS.find((p) => p.id === selectedPlanId) || MOCK_PLANS[1];

  // Card Number Auto Formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  // Step 1 Handler: Select Plan -> Move to Step 2
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setCurrentStep(2);
  };

  // Step 2 Handler: Validate & Move to Step 3
  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please recheck your inputs.");
      return;
    }
    // Auto populate billing address if empty
    if (!billingAddress) {
      setBillingAddress(address);
    }
    if (!cardHolder) {
      setCardHolder(ownerName);
    }
    setCurrentStep(3);
  };

  // Step 3 Handler: Finalize Payment & Navigate
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);
    // UI Mock Delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/pending-approval");
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full bg-[var(--cream-dark)] text-[var(--ink)] flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-[family-name:var(--font-body)]">
      <div className="max-w-5xl w-full mx-auto space-y-6 sm:space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--slate)]/10 pb-4 sm:pb-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--gold)] flex items-center justify-center text-[var(--cream)] shadow-md shrink-0">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-[var(--ink)] block leading-none">
                DMS ERP
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--gold)] font-medium tracking-wider uppercase">
                Distribution Suite
              </span>
            </div>
          </div>

          <div className="text-xs text-[var(--slate)] flex items-center gap-1.5">
            <span>Already have an account?</span>
            <Link
              href="/login"
              className="text-[var(--ink)] font-bold hover:underline focus:outline-none"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="max-w-xl mx-auto px-2">
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--slate)]/15 -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--gold)] transition-all duration-300 -z-0"
              style={{
                width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
              }}
            />

            {/* Step 1 Indicator */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`relative z-10 flex flex-col items-center gap-1 focus:outline-none ${
                currentStep >= 1 ? "text-[var(--ink)]" : "text-[var(--slate)]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 1
                    ? "bg-[var(--gold)] text-[var(--cream)] ring-4 ring-[var(--gold)]/20 shadow-md"
                    : currentStep > 1
                    ? "bg-[var(--ink)] text-[var(--cream)]"
                    : "bg-[var(--cream)] border-2 border-[var(--slate)]/30 text-[var(--slate)]"
                }`}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Plan
              </span>
            </button>

            {/* Step 2 Indicator */}
            <button
              type="button"
              onClick={() => {
                if (currentStep > 2) setCurrentStep(2);
              }}
              disabled={currentStep < 2}
              className={`relative z-10 flex flex-col items-center gap-1 focus:outline-none disabled:cursor-not-allowed ${
                currentStep >= 2 ? "text-[var(--ink)]" : "text-[var(--slate)]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 2
                    ? "bg-[var(--gold)] text-[var(--cream)] ring-4 ring-[var(--gold)]/20 shadow-md"
                    : currentStep > 2
                    ? "bg-[var(--ink)] text-[var(--cream)]"
                    : "bg-[var(--cream)] border-2 border-[var(--slate)]/30 text-[var(--slate)]"
                }`}
              >
                {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Business
              </span>
            </button>

            {/* Step 3 Indicator */}
            <div
              className={`relative z-10 flex flex-col items-center gap-1 ${
                currentStep >= 3 ? "text-[var(--ink)]" : "text-[var(--slate)]"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === 3
                    ? "bg-[var(--gold)] text-[var(--cream)] ring-4 ring-[var(--gold)]/20 shadow-md"
                    : "bg-[var(--cream)] border-2 border-[var(--slate)]/30 text-[var(--slate)]"
                }`}
              >
                3
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Checkout
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: CHOOSE PLAN */}
        {currentStep === 1 && (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                Select Your Subscription Plan
              </h1>
              <p className="text-xs sm:text-sm text-[var(--slate)]">
                Pick the right tier to scale your distribution and inventory operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {MOCK_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <Card
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`relative border transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                      isSelected
                        ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/30 bg-[var(--cream)] shadow-md"
                        : "border-[var(--slate)]/15 bg-[var(--cream)] hover:border-[var(--gold)]/50"
                    }`}
                  >
                    {/* {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--cream)] text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </div>
                    )} */}

                    <CardHeader className="pt-6 pb-4">
                      <div className="flex justify-between items-baseline">
                        <CardTitle className="text-lg font-bold text-[var(--ink)]">
                          {plan.name}
                        </CardTitle>
                        <span className="text-[10px] font-bold text-[var(--gold)] uppercase bg-[var(--cream-dark)] px-2 py-0.5 rounded border border-[var(--slate)]/10">
                          {plan.duration}
                        </span>
                      </div>
                      <CardDescription className="text-xs text-[var(--slate)] min-h-[32px] mt-1">
                        {plan.description}
                      </CardDescription>

                      <div className="pt-4 border-t border-[var(--slate)]/10 mt-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                            {plan.price === 0
                              ? "FREE"
                              : `${plan.currency} ${plan.price.toLocaleString()}`}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-xs text-[var(--slate)]">/{plan.duration.toLowerCase()}</span>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
                      <ul className="space-y-2.5 text-xs text-[var(--slate)]">
                        {plan.features.map((feat) => (
                          <li key={feat.id} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
                            <span>{feat.text}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        className={`w-full h-11 text-xs font-semibold rounded-[var(--radius)] transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-[var(--gold)] text-[var(--cream)] hover:bg-[var(--gold)]/90 shadow-md"
                            : "bg-[var(--cream-dark)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] border border-[var(--slate)]/20"
                        }`}
                      >
                        <span>Select Plan</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 2: BUSINESS REGISTRATION */}
        {currentStep === 2 && (
          <section className="max-w-2xl mx-auto w-full animate-in fade-in duration-300 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                Business Information
              </h1>
              <p className="text-xs sm:text-sm text-[var(--slate)]">
                Enter your company profile and owner credentials to setup your distribution tenant.
              </p>
            </div>

            <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-md">
              <CardContent className="p-6">
                <form onSubmit={handleBusinessSubmit} className="space-y-4">
                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--ink)] block">
                      Business Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Al-Hadi Traders & Distributors"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                      />
                      <Building2 className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Owner Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Owner Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Muhammad Hassan"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <User className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="hassan@distributor.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <Mail className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Phone & CNIC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <Phone className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        CNIC Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="42101-1234567-1"
                          value={cnic}
                          onChange={(e) => setCnic(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <FileText className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Address & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Business Address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Warehouse 4, Site Area"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <MapPin className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--slate)]/10">
  {/* Account Password */}
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-[var(--ink)] block">
      Account Password
    </label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        required
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-10 pl-9 pr-10 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
      />
      <Lock className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-[var(--slate)] hover:text-[var(--ink)] transition-colors focus:outline-none"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-[var(--ink)] block">
      Confirm Password
    </label>
    <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        required
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full h-10 pl-9 pr-10 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
      />
      <Lock className="h-4 w-4 text-[var(--slate)] absolute left-3 top-3 pointer-events-none" />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-3 text-[var(--slate)] hover:text-[var(--ink)] transition-colors focus:outline-none"
      >
        {showConfirmPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  </div>
</div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="h-11 px-4 bg-[var(--gold)] text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--slate)]/10 text-xs font-semibold rounded-[var(--radius)]"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 h-11 bg-[var(--ink)] hover:bg-[var(--ink-light)] text-[var(--cream)] text-xs font-semibold rounded-[var(--radius)] shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        )}

        {/* STEP 3: CARD PAYMENT */}
        {currentStep === 3 && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
            {/* Selected Plan Summary Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-md">
                <CardHeader className="border-b border-[var(--slate)]/10 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-bold text-[var(--ink)]">
                      Order Summary
                    </CardTitle>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[var(--gold)] hover:underline"
                    >
                      Change Plan
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="p-4 rounded-xl bg-[var(--cream-dark)] border border-[var(--slate)]/10 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-sm text-[var(--ink)]">
                        {activePlan.name}
                      </span>
                      <span className="text-[10px] font-bold text-[var(--gold)] uppercase bg-[var(--cream)] px-2 py-0.5 rounded border border-[var(--slate)]/10">
                        {activePlan.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--slate)]">{activePlan.description}</p>
                  </div>

                  <div className="border-t border-[var(--slate)]/10 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-[var(--slate)]">
                      <span>Business Name</span>
                      <span className="font-semibold text-[var(--ink)]">{businessName || "Not Provided"}</span>
                    </div>
                    <div className="flex justify-between text-[var(--slate)]">
                      <span>Owner</span>
                      <span className="font-semibold text-[var(--ink)]">{ownerName || "Not Provided"}</span>
                    </div>
                    <div className="flex justify-between text-[var(--slate)] pt-2 border-t border-[var(--slate)]/10">
                      <span>Subscription Total</span>
                      <span className="text-base font-extrabold text-[var(--gold)]">
                        {activePlan.price === 0
                          ? "FREE"
                          : `${activePlan.currency} ${activePlan.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-7">
              <Card className="border border-[var(--slate)]/15 bg-[var(--cream)] shadow-md">
                <CardHeader className="border-b border-[var(--slate)]/10 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[var(--gold)]" />
                      <span>Card Payment</span>
                    </CardTitle>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider border border-[var(--slate)]/20 px-2 py-0.5 rounded bg-[var(--cream-dark)]">
                        Visa
                      </span>
                      <span className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider border border-[var(--slate)]/20 px-2 py-0.5 rounded bg-[var(--cream-dark)]">
                        Mastercard
                      </span>
                    </div>
                  </div>
                  <CardDescription className="text-xs text-[var(--slate)]">
                    Secure credit or debit card processing.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {/* Card Holder */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Card Holder
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Hassan"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                      />
                    </div>

                    {/* Card Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--ink)] block">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full h-10 pl-3 pr-10 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                        <CreditCard className="h-4 w-4 text-[var(--slate)] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--ink)] block">
                          Expiry Month
                        </label>
                        <select
                          required
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                          className="w-full h-10 px-2 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const m = (i + 1).toString().padStart(2, "0");
                            return (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--ink)] block">
                          Expiry Year
                        </label>
                        <select
                          required
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                          className="w-full h-10 px-2 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        >
                          <option value="">Year</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--ink)] block">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="pt-2 border-t border-[var(--slate)]/10 space-y-3">
                      <span className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider block">
                        Billing Address
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[var(--ink)] block">
                            Country
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="w-full h-10 pl-3 pr-8 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                            />
                            <Globe className="h-4 w-4 text-[var(--slate)] absolute right-3 top-3 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[var(--ink)] block">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="75500"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--ink)] block">
                          Street Billing Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Warehouse 4, Site Area"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          className="w-full h-10 px-3 text-xs bg-[var(--cream-dark)] border border-[var(--slate)]/20 rounded-[var(--radius)] text-[var(--ink)] focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Security Badges */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 bg-[var(--cream-dark)] rounded-xl border border-[var(--slate)]/10 text-center text-[10px] font-semibold text-[var(--slate)]">
                      <div className="flex flex-col items-center justify-center gap-1 p-1">
                        <Lock className="h-3.5 w-3.5 text-[var(--gold)]" />
                        <span>SSL Secure</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-1 border-x border-[var(--slate)]/10">
                        <ShieldCheck className="h-3.5 w-3.5 text-[var(--cyan)]" />
                        <span>PCI DSS</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--ink)]" />
                        <span>Encrypted</span>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[var(--slate)]/30 text-[var(--gold)] focus:ring-[var(--gold)]"
                      />
                      <label htmlFor="terms" className="text-xs text-[var(--slate)] leading-relaxed">
                        I agree to the{" "}
                        <span className="text-[var(--ink)] font-semibold underline cursor-pointer">
                          Terms & Conditions
                        </span>{" "}
                        and authorize subscription charges.
                      </label>
                    </div>

                    {/* Submit & Back Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="h-12 px-4 bg-[var(--gold)] text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--slate)]/10 text-xs font-semibold rounded-[var(--radius)]"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>

                      <Button
                        type="submit"
                        disabled={!agreeTerms || isSubmitting}
                        className="flex-1 h-12 bg-[var(--ink)] hover:bg-[var(--ink-light)] text-[var(--cream)] font-semibold text-xs sm:text-sm rounded-[var(--radius)] shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Processing Payment...</span>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 text-[var(--cyan)]" />
                            <span>
                              Complete Payment (
                              {activePlan.price === 0
                                ? "FREE"
                                : `${activePlan.currency} ${activePlan.price.toLocaleString()}`}
                              )
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}