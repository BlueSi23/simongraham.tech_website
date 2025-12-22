"use client";

import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Container } from "../layout/Container";

// Function to get the next quarter
function getNextQuarter(): string {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const year = now.getFullYear();

  // Determine current quarter (Q1=0-2, Q2=3-5, Q3=6-8, Q4=9-11)
  const currentQuarter = Math.floor(month / 3) + 1;

  // Calculate next quarter
  const nextQuarter = currentQuarter === 4 ? 1 : currentQuarter + 1;
  const nextYear = currentQuarter === 4 ? year + 1 : year;

  return `Q${nextQuarter} ${nextYear}`;
}

type BudgetOption = "<£25k" | "£25-50k" | "£50-100k" | "£100k+" | "TBD";
type DurationOption = "Days" | "Weeks" | "Months" | "Year+" | "TBD";

interface FormState {
  name: string;
  email: string;
  organisation: string;
  brief: string;
  timing: string;
  budget: BudgetOption | "";
  duration: DurationOption | "";
}

const initialState: FormState = {
  name: "",
  email: "",
  organisation: "",
  brief: "",
  timing: "",
  budget: "",
  duration: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  function validate(state: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) next.name = "Please add your name.";
    if (!state.email.trim()) next.email = "An email address is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email)) {
      next.email = "That doesn’t look like a valid email.";
    }
    if (!state.organisation.trim())
      next.organisation = "Share who you’re reaching out from.";
    if (!state.brief.trim())
      next.brief = "A short project or context description is helpful.";
    if (!state.timing) next.timing = "Select an approximate timing.";
    if (!state.budget) next.budget = "Select an approximate budget range.";
    if (!state.duration) next.duration = "Select an approximate duration.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setValues(initialState);
      setSuccess("Thanks for reaching out. I’ll be in touch shortly.");
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Contact
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Tell me a little about what you&apos;re exploring.
          </h1>
          <p className="text-sm text-zinc-400">
            The best projects start with a clear sense of constraints, unknowns,
            and what &quot;good&quot; looks like for your team. A few sentences are
            plenty, I&apos;ll follow up with questions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Name"
              id="name"
              value={values.name}
              onChange={(e) =>
                setValues((v) => ({ ...v, name: e.target.value }))
              }
              error={errors.name}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              error={errors.email}
            />
          </div>

          <Field
            label="Organisation"
            id="organisation"
            value={values.organisation}
            onChange={(e) =>
              setValues((v) => ({ ...v, organisation: e.target.value }))
            }
            error={errors.organisation}
          />

          <Field
            label="Brief"
            id="brief"
            as="textarea"
            rows={5}
            value={values.brief}
            onChange={(e) =>
              setValues((v) => ({ ...v, brief: e.target.value }))
            }
            error={errors.brief}
            hint="A few sentences on the opportunity, context, or challenge."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Timing"
              id="timing"
              value={values.timing}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  timing: e.target.value,
                }))
              }
              error={errors.timing}
              options={[
                { value: "", label: "Select timing" },
                { value: "ASAP", label: "ASAP" },
                { value: getNextQuarter(), label: getNextQuarter() },
                { value: "TBD", label: "TBD" },
              ]}
            />
            <SelectField
              label="Budget for Contract"
              id="budget"
              value={values.budget}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  budget: e.target.value as BudgetOption | "",
                }))
              }
              error={errors.budget}
              options={[
                { value: "", label: "Select budget" },
                { value: "<£25k", label: "<£25k" },
                { value: "£25-50k", label: "£25-50k" },
                { value: "£50-100k", label: "£50-100k" },
                { value: "£100k+", label: "£100k+" },
                { value: "TBD", label: "TBD" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Duration"
              id="duration"
              value={values.duration}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  duration: e.target.value as DurationOption | "",
                }))
              }
              error={errors.duration}
              options={[
                { value: "", label: "Select duration" },
                { value: "Days", label: "Days" },
                { value: "Weeks", label: "Weeks" },
                { value: "Months", label: "Months" },
                { value: "Year+", label: "Year+" },
                { value: "TBD", label: "TBD" },
              ]}
            />
          </div>

          {formError && (
            <p className="text-xs text-red-400">{formError}</p>
          )}
          {success && (
            <p className="text-xs text-emerald-400">{success}</p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </Container>
    </section>
  );
}

interface CommonFieldProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

type FieldProps = CommonFieldProps & (
  | (React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" })
);

function Field({
  label,
  id,
  error,
  hint,
  as = "input",
  ...props
}: FieldProps) {
  const FieldTag = as === "textarea" ? "textarea" : "input";
  return (
    <div className="space-y-1.5 text-xs">
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400"
      >
        {label}
      </label>
      <FieldTag
        id={id}
        className="w-full border border-zinc-800 bg-black px-3 py-2 text-xs text-zinc-100 outline-none ring-0 transition focus:border-zinc-500"
        {...(props as any)}
      />
      {hint && !error && (
        <p className="text-[11px] text-zinc-500">{hint}</p>
      )}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  options: { value: string; label: string }[];
}

function SelectField({
  label,
  id,
  error,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5 text-xs">
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400"
      >
        {label}
      </label>
      <select
        id={id}
        className="w-full border border-zinc-800 bg-black px-3 py-2 text-xs text-zinc-100 outline-none ring-0 transition focus:border-zinc-500"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}





