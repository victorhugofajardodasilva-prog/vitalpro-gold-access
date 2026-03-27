import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, CheckCircle, X, MapPin, User, Mail, Phone, Globe } from "lucide-react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming"
];

const COUNTRIES = [
  "United States","Australia","Canada","United Kingdom","New Zealand",
  "Ireland","Germany","France","Spain","Italy","Netherlands","Sweden",
  "Norway","Denmark","Finland","Switzerland","Austria","Belgium","Portugal",
  "Brazil","Mexico","Argentina","Colombia","Chile","South Africa","India",
  "Japan","South Korea","Singapore","Malaysia","Philippines","Indonesia",
  "Thailand","Vietnam","Israel","United Arab Emirates","Saudi Arabia",
  "Other"
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
};

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-card border border-primary/40 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-primary/10 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-primary" />
        </motion.div>

        <h3 className="text-2xl font-black uppercase font-display tracking-tight mb-2">
          Order Confirmed!
        </h3>
        <p className="text-primary font-bold uppercase tracking-wider text-sm mb-6">
          VitalPro · Shipping Address Received
        </p>

        <div className="bg-secondary/60 border border-border rounded-xl p-5 mb-6 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Package size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your delivery address has been successfully registered. Your VitalPro order is now being processed.
            </p>
          </div>
          <div className="w-full h-px bg-border" />
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-bold">Within 7 business days</span>, you will receive your tracking code by email. Use it to monitor your delivery in real time.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
          If you have any questions about your order, please contact our support team. We're here to help.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-sm hover:brightness-90 transition-all"
        >
          Got it, Thanks!
        </button>
      </motion.div>
    </div>
  </AnimatePresence>
);

const ShippingForm = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zipCode.trim()) newErrors.zipCode = "ZIP / Postal code is required";
    if (!form.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setShowSuccess(true);
  };

  if (submitted && !showSuccess) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 w-full max-w-2xl"
      >
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-xl">
          {/* Form Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-primary/15 text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase font-display tracking-tight leading-none">
                Delivery Address
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Enter your shipping details to receive your VitalPro order
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" icon={<User size={14} />} error={errors.fullName}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Anderson"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass(!!errors.fullName)}
                />
              </Field>
              <Field label="Email Address" icon={<Mail size={14} />} error={errors.email}>
                <input
                  type="email"
                  name="email"
                  placeholder="john@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass(!!errors.email)}
                />
              </Field>
            </div>

            {/* Row 2: Phone */}
            <Field label="Phone Number" icon={<Phone size={14} />} error={errors.phone}>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className={inputClass(!!errors.phone)}
              />
            </Field>

            {/* Row 3: Address Line 1 */}
            <Field label="Address Line 1" icon={<MapPin size={14} />} error={errors.addressLine1}>
              <input
                type="text"
                name="addressLine1"
                placeholder="123 Main Street"
                value={form.addressLine1}
                onChange={handleChange}
                className={inputClass(!!errors.addressLine1)}
              />
            </Field>

            {/* Row 4: Address Line 2 */}
            <Field label="Address Line 2" optional>
              <input
                type="text"
                name="addressLine2"
                placeholder="Apt, Suite, Unit (optional)"
                value={form.addressLine2}
                onChange={handleChange}
                className={inputClass(false)}
              />
            </Field>

            {/* Row 5: City + State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="City" error={errors.city}>
                <input
                  type="text"
                  name="city"
                  placeholder="New York"
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass(!!errors.city)}
                />
              </Field>
              <Field label="State / Province">
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={inputClass(false) + " cursor-pointer"}
                >
                  <option value="">Select state…</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Other">Other / International</option>
                </select>
              </Field>
            </div>

            {/* Row 6: ZIP + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="ZIP / Postal Code" error={errors.zipCode}>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="10001"
                  value={form.zipCode}
                  onChange={handleChange}
                  className={inputClass(!!errors.zipCode)}
                />
              </Field>
              <Field label="Country" icon={<Globe size={14} />} error={errors.country}>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={inputClass(!!errors.country) + " cursor-pointer"}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Notice */}
            <div className="flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-lg p-4">
              <Package size={16} className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                After submitting, your order will be processed. You will receive your <span className="text-foreground font-semibold">tracking code within 7 business days</span> at the email provided above.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-sm hover:brightness-90 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 mt-2"
            >
              <Package size={16} />
              Confirm My Delivery Address
            </button>
          </form>
        </div>
      </motion.div>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
};

/* ── helpers ── */

const inputClass = (hasError: boolean) =>
  `w-full bg-secondary/60 border ${hasError ? "border-destructive" : "border-border"} rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors`;

const Field = ({
  label,
  icon,
  error,
  optional,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {icon}
      {label}
      {optional && <span className="font-normal normal-case tracking-normal text-muted-foreground/60">(optional)</span>}
    </label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default ShippingForm;
