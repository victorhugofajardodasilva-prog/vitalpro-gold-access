import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, CheckCircle, X, MapPin, User, Mail, Phone, Globe } from "lucide-react";

/* ── Region data ─────────────────────────────────────────── */

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const CA_PROVINCES = [
  "Alberta","British Columbia","Manitoba","New Brunswick",
  "Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut",
  "Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon",
];

const AU_STATES = [
  "Australian Capital Territory","New South Wales","Northern Territory",
  "Queensland","South Australia","Tasmania","Victoria","Western Australia",
];

const COUNTRIES = [
  // Americas
  "United States","Canada","Mexico","Brazil","Argentina","Colombia","Chile",
  // Oceania
  "Australia","New Zealand",
  // Europe
  "United Kingdom","Ireland","Germany","France","Spain","Italy","Portugal",
  "Netherlands","Belgium","Switzerland","Austria","Sweden","Norway","Denmark",
  "Finland","Poland","Czech Republic","Hungary","Romania","Greece","Croatia",
  "Slovakia","Slovenia","Bulgaria","Serbia","Ukraine","Russia",
  // Africa
  "South Africa","Nigeria","Kenya","Ghana","Egypt",
  // Asia / Middle East
  "India","Japan","South Korea","Singapore","Malaysia","Philippines",
  "Indonesia","Thailand","Vietnam","Israel","United Arab Emirates","Saudi Arabia","Turkey",
  // Other
  "Other",
];

type StateMode = "us" | "ca" | "au" | "text" | "none";

function getStateMode(country: string): StateMode {
  if (country === "United States") return "us";
  if (country === "Canada") return "ca";
  if (country === "Australia") return "au";
  if (country === "") return "none";
  return "text";
}

function getStatePlaceholder(country: string): string {
  if (country === "United Kingdom") return "County / Region";
  if (country === "Germany" || country === "Austria" || country === "Switzerland") return "State / Bundesland";
  if (country === "France") return "Region / Department";
  if (country === "Brazil") return "State (e.g. São Paulo)";
  return "State / Province / Region";
}

/* ── Types ───────────────────────────────────────────────── */

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  zipCode: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  city: "",
  zipCode: "",
};

/* ── Success Modal ───────────────────────────────────────── */

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
              <span className="text-foreground font-bold">Within 7 business days</span>, you will receive your
              tracking code by email. Use it to monitor your delivery in real time.
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

/* ── Main Form ───────────────────────────────────────────── */

const ShippingForm = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const stateMode = getStateMode(form.country);
  const addressVisible = form.country !== "";

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim())  e.fullName    = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim())     e.phone       = "Phone number is required";
    if (!form.country)          e.country     = "Please select your country";
    if (!form.addressLine1.trim()) e.addressLine1 = "Address is required";
    if (!form.city.trim())      e.city        = "City is required";
    if (!form.zipCode.trim())   e.zipCode     = "ZIP / Postal code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Reset state when country changes
    if (name === "country") {
      setForm((prev) => ({ ...prev, country: value, state: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowSuccess(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 w-full max-w-2xl"
      >
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-xl">

          {/* Header */}
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

            {/* Full Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" icon={<User size={14} />} error={errors.fullName}>
                <input type="text" name="fullName" placeholder="John Anderson"
                  value={form.fullName} onChange={handleChange}
                  className={inputClass(!!errors.fullName)} />
              </Field>
              <Field label="Email Address" icon={<Mail size={14} />} error={errors.email}>
                <input type="email" name="email" placeholder="john@email.com"
                  value={form.email} onChange={handleChange}
                  className={inputClass(!!errors.email)} />
              </Field>
            </div>

            {/* Phone */}
            <Field label="Phone Number" icon={<Phone size={14} />} error={errors.phone}>
              <input type="tel" name="phone" placeholder="+1 (555) 000-0000"
                value={form.phone} onChange={handleChange}
                className={inputClass(!!errors.phone)} />
            </Field>

            {/* ── COUNTRY FIRST ── */}
            <Field label="Country" icon={<Globe size={14} />} error={errors.country}>
              <select name="country" value={form.country} onChange={handleChange}
                className={inputClass(!!errors.country) + " cursor-pointer"}>
                <option value="">Select your country…</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            {/* ── Fields that appear after country is chosen ── */}
            <AnimatePresence>
              {addressVisible && (
                <motion.div
                  key="address-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Address Line 1 */}
                  <Field label="Address Line 1" icon={<MapPin size={14} />} error={errors.addressLine1}>
                    <input type="text" name="addressLine1" placeholder="123 Main Street"
                      value={form.addressLine1} onChange={handleChange}
                      className={inputClass(!!errors.addressLine1)} />
                  </Field>

                  {/* Address Line 2 */}
                  <Field label="Address Line 2" optional>
                    <input type="text" name="addressLine2" placeholder="Apt, Suite, Unit (optional)"
                      value={form.addressLine2} onChange={handleChange}
                      className={inputClass(false)} />
                  </Field>

                  {/* State / Province — adaptive */}
                  {stateMode !== "none" && (
                    <Field label="State / Province / Region">
                      {stateMode === "us" && (
                        <select name="state" value={form.state} onChange={handleChange}
                          className={inputClass(false) + " cursor-pointer"}>
                          <option value="">Select state…</option>
                          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                      {stateMode === "ca" && (
                        <select name="state" value={form.state} onChange={handleChange}
                          className={inputClass(false) + " cursor-pointer"}>
                          <option value="">Select province…</option>
                          {CA_PROVINCES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                      {stateMode === "au" && (
                        <select name="state" value={form.state} onChange={handleChange}
                          className={inputClass(false) + " cursor-pointer"}>
                          <option value="">Select state…</option>
                          {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                      {stateMode === "text" && (
                        <input type="text" name="state"
                          placeholder={getStatePlaceholder(form.country)}
                          value={form.state} onChange={handleChange}
                          className={inputClass(false)} />
                      )}
                    </Field>
                  )}

                  {/* City + ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City" error={errors.city}>
                      <input type="text" name="city" placeholder="Your city"
                        value={form.city} onChange={handleChange}
                        className={inputClass(!!errors.city)} />
                    </Field>
                    <Field label="ZIP / Postal Code" error={errors.zipCode}>
                      <input type="text" name="zipCode" placeholder="e.g. 10001"
                        value={form.zipCode} onChange={handleChange}
                        className={inputClass(!!errors.zipCode)} />
                    </Field>
                  </div>

                  {/* Notice */}
                  <div className="flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-lg p-4">
                    <Package size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      After submitting, your order will be processed. You will receive your{" "}
                      <span className="text-foreground font-semibold">tracking code within 7 business days</span>{" "}
                      at the email provided above.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-sm hover:brightness-90 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Package size={16} />
                    Confirm My Delivery Address
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </div>
      </motion.div>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
};

/* ── Helpers ─────────────────────────────────────────────── */

const inputClass = (hasError: boolean) =>
  `w-full bg-secondary/60 border ${hasError ? "border-destructive" : "border-border"} rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors`;

const Field = ({
  label, icon, error, optional, children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {icon}{label}
      {optional && (
        <span className="font-normal normal-case tracking-normal text-muted-foreground/60">(optional)</span>
      )}
    </label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default ShippingForm;
