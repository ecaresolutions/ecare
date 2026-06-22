"use client";

import { useState, useEffect, useRef } from "react";
import { contactSchema, ContactInput } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

interface ContactFormProps {
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitBtn: string;
  submittingText: string;
  successMsg: string;
  errorMsg: string;
  className?: string;
  productLabel?: string;
  productSelectLabel?: string;
  supportTypeLabel?: string;
  supportTypeSelectLabel?: string;
  supportTypeGeneral?: string;
  supportTypeSales?: string;
  supportTypeTech?: string;
  supportTypePartner?: string;
  orderIdLabel?: string;
}

export default function ContactForm({
  nameLabel,
  emailLabel,
  subjectLabel,
  messageLabel,
  submitBtn,
  submittingText,
  successMsg,
  errorMsg,
  className,
  productLabel,
  productSelectLabel,
  supportTypeLabel,
  supportTypeSelectLabel,
  supportTypeGeneral,
  supportTypeSales,
  supportTypeTech,
  supportTypePartner,
  orderIdLabel,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    subject: "",
    message: "",
    product: "",
    supportType: "",
    orderId: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  // Custom Select states
  const [supportOpen, setSupportOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const supportRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setSupportOpen(false);
      }
      if (productRef.current && !productRef.current.contains(event.target as Node)) {
        setProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: "supportType" | "product", value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setServerError("");
    setErrors({});

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || errorMsg);
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        product: "",
        supportType: "",
        orderId: "",
      });
    } catch (err: any) {
      setStatus("error");
      setServerError(err.message || errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportTypeOptions = [
    { value: "general", label: supportTypeGeneral || "General Inquiry" },
    { value: "sales", label: supportTypeSales || "Sales & Billing" },
    { value: "technical", label: supportTypeTech || "Technical Support" },
    { value: "partnership", label: supportTypePartner || "Partnerships" },
  ];

  const productOptions = [
    { value: "dokan", label: "Dokan Multivendor" },
    { value: "project-manager", label: "WP Project Manager" },
    { value: "user-frontend", label: "WP User Frontend" },
    { value: "erp", label: "WP ERP" },
    { value: "happy-addons", label: "Happy Addons" },
    { value: "wemail", label: "weMail" },
    { value: "wedocs", label: "weDocs" },
    { value: "ecare-host", label: "Ecare Host (FlyWP)" },
    { value: "none", label: "None / Others" },
  ];

  const selectedSupportLabel = supportTypeOptions.find(opt => opt.value === formData.supportType)?.label || supportTypeSelectLabel || "Select Type";
  const selectedProductLabel = productOptions.find(opt => opt.value === formData.product)?.label || productSelectLabel || "Select Product (Optional)";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6 bg-card/50 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-border/40 shadow-xs", className)}>
      {status === "success" && (
        <div className="p-4 rounded-2xl bg-success-background border border-success text-success-foreground text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-2xl bg-error-background border border-error text-error-foreground text-sm font-semibold">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          {nameLabel}
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(errors.name && "border-error focus-visible:border-error")}
        />
        {errors.name && <p className="text-xs text-error font-medium">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          {emailLabel}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={cn(errors.email && "border-error focus-visible:border-error")}
        />
        {errors.email && <p className="text-xs text-error font-medium">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Custom Dropdown: Support Type */}
        <div className="space-y-2 relative" ref={supportRef}>
          {supportTypeLabel && (
            <label className="text-sm font-semibold text-foreground">
              {supportTypeLabel}
            </label>
          )}
          <button
            type="button"
            onClick={() => setSupportOpen(!supportOpen)}
            className={cn(
              "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-left justify-between items-center text-foreground hover:bg-muted/30 focus-visible:outline-none focus-visible:border-primary transition-colors cursor-pointer",
              errors.supportType && "border-error focus-visible:border-error"
            )}
          >
            <span className={cn(!formData.supportType && "text-muted-foreground")}>
              {selectedSupportLabel}
            </span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", supportOpen && "rotate-180")} />
          </button>
          
          {supportOpen && (
            <div className="absolute z-50 w-full mt-1.5 rounded-2xl border border-border bg-card shadow-lg p-1.5 space-y-0.5 max-h-60 overflow-y-auto animate-in fade-in-50 slide-in-from-top-1 duration-150">
              {supportTypeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSelectChange("supportType", opt.value);
                    setSupportOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-muted text-foreground transition-colors flex justify-between items-center cursor-pointer",
                    formData.supportType === opt.value && "bg-primary/5 text-primary font-semibold"
                  )}
                >
                  <span>{opt.label}</span>
                  {formData.supportType === opt.value && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>
          )}
          {errors.supportType && <p className="text-xs text-error font-medium">{errors.supportType}</p>}
        </div>

        {/* Custom Dropdown: Product */}
        <div className="space-y-2 relative" ref={productRef}>
          {productLabel && (
            <label className="text-sm font-semibold text-foreground">
              {productLabel}
            </label>
          )}
          <button
            type="button"
            onClick={() => setProductOpen(!productOpen)}
            className={cn(
              "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-left justify-between items-center text-foreground hover:bg-muted/30 focus-visible:outline-none focus-visible:border-primary transition-colors cursor-pointer",
              errors.product && "border-error focus-visible:border-error"
            )}
          >
            <span className={cn(!formData.product && "text-muted-foreground")}>
              {selectedProductLabel}
            </span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", productOpen && "rotate-180")} />
          </button>

          {productOpen && (
            <div className="absolute z-50 w-full mt-1.5 rounded-2xl border border-border bg-card shadow-lg p-1.5 space-y-0.5 max-h-60 overflow-y-auto animate-in fade-in-50 slide-in-from-top-1 duration-150">
              {productOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSelectChange("product", opt.value);
                    setProductOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-muted text-foreground transition-colors flex justify-between items-center cursor-pointer",
                    formData.product === opt.value && "bg-primary/5 text-primary font-semibold"
                  )}
                >
                  <span>{opt.label}</span>
                  {formData.product === opt.value && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>
          )}
          {errors.product && <p className="text-xs text-error font-medium">{errors.product}</p>}
        </div>
      </div>

      {/* Order ID */}
      <div className="space-y-2">
        {orderIdLabel && (
          <label htmlFor="orderId" className="text-sm font-semibold text-foreground">
            {orderIdLabel}
          </label>
        )}
        <Input
          id="orderId"
          name="orderId"
          type="text"
          value={formData.orderId}
          onChange={handleChange}
          className={cn(errors.orderId && "border-error focus-visible:border-error")}
        />
        {errors.orderId && <p className="text-xs text-error font-medium">{errors.orderId}</p>}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold text-foreground">
          {subjectLabel}
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          className={cn(errors.subject && "border-error focus-visible:border-error")}
        />
        {errors.subject && <p className="text-xs text-error font-medium">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          {messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className={cn(
            "flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-colors resize-y min-h-[100px]",
            errors.message && "border-error focus-visible:border-error"
          )}
        />
        {errors.message && <p className="text-xs text-error font-medium">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-bold shadow-sm bg-[#e8000e] hover:bg-[#e8000e]/90 text-white border-transparent transition-all duration-300"
      >
        {isSubmitting ? submittingText : submitBtn}
      </Button>
    </form>
  );
}
